(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const films = [...document.querySelectorAll('#film-rows tr')];
  const years = [...document.querySelectorAll('#year-chart .chart-row')];
  function filterFilms() {
    const query = $('film-search').value.trim().toLocaleLowerCase();
    const year = $('film-year').value;
    const winners = $('film-scope').value === 'winners';
    let count = 0;
    films.forEach(row => {
      row.hidden = !(row.dataset.title.toLocaleLowerCase().includes(query) && (!year || row.dataset.year === year) && (!winners || row.dataset.winner === 'true'));
      if (!row.hidden) count++;
    });
    const metric = $('film-sort').value;
    [...films].sort((a,b) => metric === 'year' ? Number(a.dataset.year)-Number(b.dataset.year) || a.dataset.title.localeCompare(b.dataset.title) : Number(b.dataset[metric])-Number(a.dataset[metric]) || a.dataset.title.localeCompare(b.dataset.title)).forEach(row => $('film-rows').append(row));
    $('film-count').textContent = `${count} ${count === 1 ? 'film' : 'films'} shown.`;
    $('no-films').hidden = count !== 0;
  }
  ['film-search','film-year','film-scope','film-sort'].forEach(id => $(id).addEventListener(id === 'film-search' ? 'input' : 'change',filterFilms));
  const settings = {
    combined: { max:100, label:'Combined average · 0–100 points. Higher means a higher-rated field.' },
    imdb: { max:10, label:'IMDb average · 0–10 scale. Higher means a higher-rated field.' },
    rt: { max:100, label:'Tomatometer average · 0–100%. Higher means broader critic approval.' },
    spread: { max:15, label:'Population standard deviation · 0–15 points. Lower means a closer-rated field.' },
  };
  function chart() {
    const metric = $('chart-metric').value, config = settings[metric];
    $('chart-scale').textContent = config.label;
    years.forEach(row => {
      const value = Number(row.dataset[metric]);
      row.querySelector('.chart-bar').style.width = `${100 * value / config.max}%`;
      row.querySelector('.chart-value').textContent = value.toFixed(2);
    });
    const order = $('chart-order').value;
    [...years].sort((a,b) => order === 'year' ? Number(a.dataset.year)-Number(b.dataset.year) : (order === 'high' ? -1 : 1)*(Number(a.dataset[metric])-Number(b.dataset[metric])) || Number(a.dataset.year)-Number(b.dataset.year)).forEach(row => $('year-chart').append(row));
  }
  $('chart-metric').addEventListener('change',chart);
  $('chart-order').addEventListener('change',chart);
  years.forEach(row => row.querySelector('a').addEventListener('click',() => {
    $('film-year').value = row.dataset.year; $('film-search').value=''; $('film-scope').value='all';
    $('film-data').open = true; filterFilms();
  }));
  filterFilms(); chart();
})();
