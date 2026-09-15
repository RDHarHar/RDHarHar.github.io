# Best Picture ratings snapshot

Scope: all 356 Best Picture nominees in the **1970–2026 ceremony years**, including 57 winners.
Ryan selected this scope after reviewing the first draft. It is not all Oscar history.

## Files

- `oscar-nominees.csv`: one row per nominee; observed IMDb rating/vote count and RT Tomatometer/review count,
  award-season label, winner flag, direct IMDb/RT/Academy links, and collection timestamp.
- `oscar-years.csv`: full-precision aggregates for each of the 57 complete ceremonies.
- `oscar-analysis.json`: validated film data, annual aggregates, and extrema including ties.
- `oscar-provenance.json`: source URLs, nomination revision, IMDb download checksum, collection notes.
- `nomination-source-license.txt`: attribution/license for DLu's nomination records.
- `oscar-nomination-crosscheck.json`: comparison against Ryan's supplied Wikipedia list on 2026-09-15.
  All 356 nominees and 57 winners match after aligning ceremony numbers and the Il Postino title variant.

Scores were collected on 2026-09-15. They are **not** scores from the historical ceremony dates.
IMDb ratings are joined by IMDb ID from the official `title.ratings.tsv.gz` download. The original
download is retained only in ignored research files; it is not republished in bulk.
Rotten Tomatoes scores are from the linked public movie pages, checked to be the **Tomatometer**
field rather than an audience rating. No review prose or posters are included.

Nomination records are from [DLu/oscar_data](https://github.com/DLu/oscar_data), whose source is the
Academy's database. Ceremony numbers 42–98 map to 1970–2026. Preserve the supplied award-season
label in `film_year`; don't infer nominations from RT's theatrical release date. Some films had
wide releases in the following year or rereleases much later. Title/year matching and specific
release-page selection resolved namesakes such as Whiplash, Fences, Little Women, The Father,
Don't Look Up, and Oppenheimer. RT currently labels the Slumdog Millionaire page “The Millionaire”;
its 2008 search result, film page/cast, and stable slug identify the intended film.

Exploratory Kaggle and OscarPrediction datasets were examined but their ratings were **not used**.
All 356 included nominees have both scores. No missing rating was filled with zero, estimated,
or silently excluded. Validation requires complete year counts and exactly one winner per year.

## Reproduce

From the repository root, with Python 3:

```powershell
python scripts/analyze_oscars.py
python -m unittest discover -s tests -p test_oscar_analysis.py
python scripts/render_oscar_report.py
```

The calculation and rendering scripts run offline against this snapshot. To refresh the data,
collect and verify new source values first; don't label old observations as a new snapshot.
After any refresh, review the editorial prose in `scripts/templates/oscar-best-picture.html`:
tables and rankings regenerate, but written interpretations must be checked against the new results.

Combined score = `(IMDb * 10 + RT) / 2`. This is an editorial index blending two different
constructs, not a statistically calibrated measure of film quality. Each film counts equally.
Year quality uses per-nominee means for IMDb, RT, and combined scores; no raw annual totals are ranked
or exported. Competition means population standard deviation of the full field's combined scores:
sqrt(sum((score - mean)^2) / nominee_count). Repeating a distribution leaves means and spread unchanged.
Top-two gaps and ranges are excluded from cross-year comparisons because field size affects extremes.
This normalization removes the automatic arithmetic advantage of extra nominees; it cannot remove
changes in selection standards or field composition. Rating closeness is not an Academy voting margin.
Full-precision results determine rankings; ties remain tied.
