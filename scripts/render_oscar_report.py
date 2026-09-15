"""Render the static article and interactive tables from the calculated snapshot.

After changing data, re-check the editorial prose in the template against the results.
"""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'reports/data/oscar-analysis.json').read_text(encoding='utf-8'))
esc = lambda value: html.escape(str(value), quote=True)


def table(caption, headings, rows, body_id=''):
    return '<div class="table-wrap" tabindex="0" role="region" aria-label="' + esc(caption) + '"><table><caption>' + esc(caption) + '</caption><thead><tr>' + ''.join('<th scope="col">' + esc(h) + '</th>' for h in headings) + '</tr></thead><tbody' + (f' id="{body_id}"' if body_id else '') + '>' + ''.join('<tr>' + ''.join('<td>' + cell + '</td>' for cell in row) + '</tr>' for row in rows) + '</tbody></table></div>'


def film_links(films, metric):
    def label(f):
        suffix = '/10' if metric == 'imdb' else '%' if metric == 'rt' else '/100'
        value = f'{f[metric]:.1f}' if metric != 'rt' else str(f[metric])
        return f'<a href="{esc(f["rt_url"])}">{esc(f["title"])}</a> <strong>{value}{suffix}</strong><small>{f["ceremony_year"]} ceremony</small>'
    return '<br>'.join(label(f) for f in films)


def film_extremes(key, caption):
    rows=[]
    for metric, label in [('imdb','IMDb'),('rt','Tomatometer'),('combined','Combined')]:
        pair=data[key][metric]
        rows.append([label,film_links(pair['highest'],metric),film_links(pair['lowest'],metric)])
    return table(caption,['Measure','Highest','Lowest'],rows)


def year_labels(records,metric,suffix=''):
    return '<br>'.join(f'<a href="#year-{r["year"]}">{r["year"]}</a> <strong>{r[metric]:.2f}{suffix}</strong><small>{r["count"]} nominees</small>' for r in records)


year_rows=[]
for metric,label,suffix in [('imdb_mean','IMDb average','/10'),('rt_mean','Tomatometer average','%'),('combined_mean','Combined average','/100')]:
    e=data['year_extremes'][metric];year_rows.append([label,year_labels(e['highest'],metric,suffix),year_labels(e['lowest'],metric,suffix)])
competition=[]
for metric,label in [('spread','Whole-field spread')]:
    e=data['year_extremes'][metric];competition.append([label,year_labels(e['lowest'],metric,' points'),year_labels(e['highest'],metric,' points')])
chart=[]
for y in data['years']:
    attrs=' '.join(f'data-{k}="{y[v]}"' for k,v in [('year','year'),('combined','combined_mean'),('imdb','imdb_mean'),('rt','rt_mean'),('spread','spread')])
    chart.append(f'<div class="chart-row" id="year-{y["year"]}" {attrs}><a href="#film-data" aria-label="See nominees from the {y["year"]} ceremony">{y["year"]}</a><div class="chart-track" aria-hidden="true"><div class="chart-bar" style="width:{y["combined_mean"]}%"></div></div><span class="chart-value">{y["combined_mean"]:.2f}</span></div>')
year_table=table('Complete yearly results; all averages are unweighted across nominees',['Ceremony','Nominees','IMDb avg /10','RT avg %','Combined avg /100','Spread'],[[str(y['year']),str(y['count'])]+[f'<span class="number">{y[k]:.2f}</span>' for k in ['imdb_mean','rt_mean','combined_mean','spread']] for y in data['years']])
film_rows=[]
for f in data['films']:
    cells=[f'<a href="{esc(f["academy_url"])}">{f["ceremony_year"]}</a>',esc(f['title'])+('<small>Best Picture winner</small>' if f['winner'] else ''),f'<a href="{esc(f["imdb_url"])}">{f["imdb"]:.1f}</a>',f'<a href="{esc(f["rt_url"])}">{f["rt"]}%</a>',f'<strong>{f["combined"]:.1f}</strong>']
    attrs=f'data-title="{esc(f["title"])}" data-year="{f["ceremony_year"]}" data-winner="{str(f["winner"]).lower()}" data-imdb="{f["imdb"]}" data-rt="{f["rt"]}" data-combined="{f["combined"]}"'
    film_rows.append(f'<tr {attrs}>'+''.join('<td>'+cell+'</td>' for cell in cells)+'</tr>')
films=table('Film ratings snapshot: September 15, 2026',['Ceremony','Film','IMDb /10','Tomatometer','Combined /100'],[], 'film-rows').replace('<tbody id="film-rows"></tbody>','<tbody id="film-rows">'+''.join(film_rows)+'</tbody>')
finding_specs=[('Highest average','combined_mean','highest'),('Lowest average','combined_mean','lowest'),('Closest field','spread','lowest')]
findings=''
for title,metric,side in finding_specs:
    y=data['year_extremes'][metric][side][0]
    unit='combined points' if metric=='combined_mean' else 'points of spread'
    findings+=f'<div class="finding"><p>{title}</p><strong>{y["year"]}</strong><p>{y[metric]:.2f} {unit} &middot; {y["count"]} nominees</p></div>'
values={'FINDINGS':findings,'FILM_RANKINGS':film_extremes('film_extremes','Highest and lowest ratings across all 356 nominees'),'WINNER_RANKINGS':film_extremes('winner_extremes','Highest and lowest ratings across the 57 winners'),'YEAR_RANKINGS':table('Highest and lowest years, by average per nominee',['Measure','Highest year(s)','Lowest year(s)'],year_rows),'COMPETITION':table('Rating closeness: lower means closer',['Measure','Closest','Furthest apart'],competition),'CHART':'\n'.join(chart),'YEAR_TABLE':year_table,'FILMS':films,'YEAR_OPTIONS':''.join(f'<option value="{y}">{y}</option>' for y in range(1970,2027))}
template=(ROOT/'scripts/templates/oscar-best-picture.html').read_text(encoding='utf-8')
for key,value in values.items():template=template.replace('{{'+key+'}}',value)
assert '{{' not in template
(ROOT/'reports/oscar-best-picture.html').write_text(template,encoding='utf-8')
print('Rendered report with 356 film rows, 57 chart rows, and all tied extrema.')
