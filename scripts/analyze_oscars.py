"""Rebuild the report's calculations from its checked-in rating snapshot (no network)."""
import csv
import json
import statistics
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'reports/data'


def composite(imdb, rt):
    return (10 * imdb + rt) / 2


def summarize(films):
    groups = defaultdict(list)
    for film in films:
        groups[film['ceremony_year']].append(film)
    years = []
    for year, nominees in sorted(groups.items()):
        scores = sorted((composite(f['imdb'], f['rt']) for f in nominees), reverse=True)
        years.append({
            'year': year, 'count': len(nominees),
            'imdb_mean': statistics.mean(f['imdb'] for f in nominees),
            'rt_mean': statistics.mean(f['rt'] for f in nominees),
            'combined_mean': statistics.mean(scores),
            'spread': statistics.pstdev(scores),
        })
    return years


def extremes(rows, field):
    # Preserve ties; round only for equality to suppress floating-point noise.
    values = [round(row[field], 10) for row in rows]
    return {kind: [r for r, value in zip(rows, values) if value == fn(values)]
            for kind, fn in [('highest', max), ('lowest', min)]}


def load():
    films = []
    with (DATA / 'oscar-nominees.csv').open(encoding='utf-8', newline='') as handle:
        for row in csv.DictReader(handle):
            for key in ['ceremony_year', 'rt', 'rt_reviews', 'imdb_votes']:
                row[key] = int(row[key])
            row['imdb'] = float(row['imdb'])
            row['winner'] = row['winner'] == 'true'
            row['combined'] = composite(row['imdb'], row['rt'])
            assert 1 <= row['imdb'] <= 10 and 0 <= row['rt'] <= 100
            assert row['imdb_votes'] > 0 and row['rt_reviews'] > 0
            films.append(row)
    assert len(films) == len({r['imdb_id'] for r in films}) == 356
    assert {r['ceremony_year'] for r in films} == set(range(1970, 2027))
    for year in range(1970, 2027):
        group = [r for r in films if r['ceremony_year'] == year]
        assert sum(r['winner'] for r in group) == 1
        expected = 5 if year <= 2009 else 10 if year in [2010, 2011] or year >= 2022 else 8 if year in [2015, 2016, 2019, 2021] else 9
        assert len(group) == expected, (year, len(group), expected)
    return films


def main():
    films = load()
    years = summarize(films)
    report = {
        'films': films, 'years': years,
        'film_extremes': {metric: extremes(films, metric) for metric in ['imdb', 'rt', 'combined']},
        'winner_extremes': {metric: extremes([f for f in films if f['winner']], metric) for metric in ['imdb', 'rt', 'combined']},
        'year_extremes': {metric: extremes(years, metric) for metric in ['imdb_mean', 'rt_mean', 'combined_mean', 'spread']},
    }
    (DATA / 'oscar-analysis.json').write_text(json.dumps(report, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    with (DATA / 'oscar-years.csv').open('w', encoding='utf-8', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=list(years[0]))
        writer.writeheader()
        writer.writerows(years)
    print(f'Validated {len(films)} nominees, {len(years)} complete ceremonies, and 57 winners.')
    for section in ['film_extremes', 'winner_extremes', 'year_extremes']:
        print(section)
        for metric, result in report[section].items():
            print(metric, {side: [(r.get('title', r.get('year')), round(r[metric], 4)) for r in rows] for side, rows in result.items()})


if __name__ == '__main__':
    main()
