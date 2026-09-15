import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('analysis', Path(__file__).resolve().parents[1] / 'scripts/analyze_oscars.py')
analysis = importlib.util.module_from_spec(spec)
spec.loader.exec_module(analysis)


class AnalysisTests(unittest.TestCase):
    def test_scales_and_equal_weights(self):
        self.assertEqual(analysis.composite(8, 90), 85)

    def test_repeating_distribution_preserves_normalized_metrics(self):
        scores = [(6, 80), (7, 85), (8, 90), (9, 95), (8, 70)]
        rows = [{'ceremony_year': 2000, 'imdb': imdb, 'rt': rt} for imdb, rt in scores]
        rows += [{'ceremony_year': 2001, 'imdb': imdb, 'rt': rt} for imdb, rt in scores * 2]
        a, b = analysis.summarize(rows)
        self.assertEqual((a['count'], b['count']), (5, 10))
        for metric in ['imdb_mean', 'rt_mean', 'combined_mean', 'spread']:
            self.assertAlmostEqual(a[metric], b[metric])
        self.assertEqual(a['combined_mean'], 80)
        self.assertFalse({'imdb_total', 'rt_total', 'combined_total', 'top_gap', 'range'} & a.keys())

    def test_population_spread_uses_every_nominee(self):
        rows = [{'ceremony_year': 2000, 'imdb': x / 10, 'rt': x} for x in [60, 80, 80]]
        result = analysis.summarize(rows)[0]
        self.assertAlmostEqual(result['spread'], 9.4280904158)

    def test_all_ties_are_retained(self):
        result = analysis.extremes([{'score': 9}, {'score': 9}, {'score': 2}], 'score')
        self.assertEqual(len(result['highest']), 2)
        self.assertEqual(len(result['lowest']), 1)

    def test_snapshot_is_complete(self):
        self.assertEqual(len(analysis.load()), 356)

    def test_requested_boundary_ceremonies(self):
        films = analysis.load()
        first = [f for f in films if f['ceremony_year'] == 1970]
        last = [f for f in films if f['ceremony_year'] == 2026]
        self.assertEqual({f['title'] for f in first}, {'Anne of the Thousand Days', 'Butch Cassidy and the Sundance Kid', 'Hello, Dolly!', 'Midnight Cowboy', 'Z'})
        self.assertEqual({f['title'] for f in last}, {'Bugonia', 'F1', 'Frankenstein', 'Hamnet', 'Marty Supreme', 'One Battle after Another', 'The Secret Agent', 'Sentimental Value', 'Sinners', 'Train Dreams'})
        self.assertEqual([f['title'] for f in last if f['winner']], ['One Battle after Another'])


if __name__ == '__main__':
    unittest.main()
