(() => {
  'use strict';
  const core = window.UTCConverter;
  const byId = id => document.getElementById(id);
  const zone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Device local time';
  const displayDate = (date, utc) => new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', ...(utc ? { timeZone: 'UTC' } : {})
  }).format(date);
  function updateClocks() {
    const now = new Date();
    for (const direction of ['local', 'utc']) {
      const utc = direction === 'utc';
      byId(`${direction}-clock`).textContent = core.timeValue(now, utc, true);
      byId(`${direction}-clock`).dateTime = now.toISOString();
      byId(`${direction}-today`).textContent = displayDate(now, utc);
    }
    byId('local-zone').textContent = `${zone().replaceAll('_', ' ')} · ${core.offsetLabel(now)}`;
    byId('epoch-clock').textContent = core.epochValues(now).seconds;
    byId('epoch-clock-ms').textContent = `${now.getTime()} ms`;
  }
  function clearResult(direction) {
    const result = byId(`${direction}-result`);
    result.querySelector('.result-time').textContent = '—';
    result.querySelector('.result-detail').textContent = 'Enter a date and time to convert.';
    result.querySelectorAll('[data-epoch]').forEach(output => { output.textContent = '—'; });
    byId(`${direction}-error`).hidden = true;
    for (const id of [`${direction}-date`, `${direction}-input`]) byId(id).removeAttribute('aria-invalid');
  }
  function showResult(direction, date) {
    const utc = direction === 'local';
    const result = byId(`${direction}-result`);
    result.querySelector('.result-time').textContent = core.timeValue(date, utc, true);
    result.querySelector('.result-detail').textContent = `${displayDate(date, utc)} · ${utc ? 'UTC+00:00' : core.offsetLabel(date) + ' · ' + zone().replaceAll('_', ' ')}`;
    const epoch = core.epochValues(date);
    result.querySelectorAll('[data-epoch]').forEach(output => { output.textContent = epoch[output.dataset.epoch]; });
  }
  let localCandidates = [];
  function convert(direction) {
    clearResult(direction);
    try {
      const date = byId(`${direction}-date`).value;
      const time = byId(`${direction}-input`).value;
      if (direction === 'utc') showResult(direction, core.fromUTC(date, time));
      else {
        const previous = byId('occurrence').value;
        localCandidates = core.fromLocal(date, time);
        byId('repeat-choice').hidden = localCandidates.length < 2;
        byId('occurrence').replaceChildren(...localCandidates.map((candidate, index) => {
          const option = document.createElement('option');
          option.value = String(candidate.getTime());
          option.textContent = `${index === 0 ? 'First' : 'Second'} occurrence · ${core.offsetLabel(candidate)}`;
          return option;
        }));
        if (localCandidates.some(candidate => String(candidate.getTime()) === previous)) byId('occurrence').value = previous;
        showResult(direction, new Date(Number(byId('occurrence').value)));
      }
    } catch (error) {
      if (direction === 'local') { byId('repeat-choice').hidden = true; localCandidates = []; }
      byId(`${direction}-error`).textContent = error.message;
      byId(`${direction}-error`).hidden = false;
      byId(`${direction}-result`).querySelector('.result-detail').textContent = 'Check the date and time above.';
      for (const id of [`${direction}-date`, `${direction}-input`]) byId(id).setAttribute('aria-invalid', 'true');
    }
  }
  function useNow(direction) {
    const now = new Date();
    byId(`${direction}-date`).value = core.dateValue(now, direction === 'utc');
    byId(`${direction}-input`).value = core.timeValue(now, direction === 'utc', true);
    convert(direction);
    // During a repeated hour, "now" must select the actual current occurrence.
    if (direction === 'local' && localCandidates.length > 1) {
      const nearest = localCandidates.reduce((a, b) => Math.abs(a - now) < Math.abs(b - now) ? a : b);
      byId('occurrence').value = String(nearest.getTime());
      showResult(direction, nearest);
    }
  }
  for (const direction of ['utc', 'local']) {
    byId(`${direction}-date`).value = core.dateValue(new Date(), direction === 'utc');
    byId(`${direction}-form`).addEventListener('submit', event => { event.preventDefault(); convert(direction); });
    for (const id of [`${direction}-date`, `${direction}-input`]) byId(id).addEventListener('input', () => {
      clearResult(direction);
      if (direction === 'local') { byId('repeat-choice').hidden = true; byId('occurrence').replaceChildren(); }
    });
    document.querySelector(`[data-now="${direction}"]`).addEventListener('click', () => useNow(direction));
  }
  byId('occurrence').addEventListener('change', () => showResult('local', new Date(Number(byId('occurrence').value))));
  function clearEpoch() {
    byId('epoch-error').hidden = true;
    byId('epoch-input').removeAttribute('aria-invalid');
    byId('epoch-local-time').textContent = '—';
    byId('epoch-utc-time').textContent = '—';
    byId('epoch-local-detail').textContent = 'Enter a timestamp to convert.';
    byId('epoch-utc-detail').textContent = 'The same instant in UTC.';
  }
  function convertEpoch() {
    clearEpoch();
    try {
      const date = core.fromEpoch(byId('epoch-input').value, byId('epoch-unit').value);
      for (const direction of ['local', 'utc']) {
        const utc = direction === 'utc';
        const fractional = byId('epoch-unit').value === 'milliseconds' ? '.' + String(date.getUTCMilliseconds()).padStart(3, '0') : '';
        byId(`epoch-${direction}-time`).textContent = core.timeValue(date, utc, true) + fractional;
        byId(`epoch-${direction}-detail`).textContent = `${displayDate(date, utc)} · ${utc ? 'UTC+00:00' : core.offsetLabel(date) + ' · ' + zone().replaceAll('_', ' ')}`;
      }
    } catch (error) {
      byId('epoch-error').textContent = error.message;
      byId('epoch-error').hidden = false;
      byId('epoch-input').setAttribute('aria-invalid', 'true');
    }
  }
  byId('epoch-form').addEventListener('submit', event => { event.preventDefault(); convertEpoch(); });
  byId('epoch-input').addEventListener('input', clearEpoch);
  byId('epoch-unit').addEventListener('change', () => {
    if (byId('epoch-input').value.trim()) convertEpoch();
    else clearEpoch();
  });
  byId('epoch-now').addEventListener('click', () => {
    byId('epoch-input').value = core.epochValues(new Date())[byId('epoch-unit').value];
    convertEpoch();
  });
  let toEpochCandidates = [];
  function resetToEpoch() {
    toEpochCandidates = [];
    byId('to-epoch-repeat').hidden = true;
    byId('to-epoch-occurrence').replaceChildren();
    byId('to-epoch-error').hidden = true;
    byId('to-epoch-seconds').textContent = '—';
    byId('to-epoch-milliseconds').textContent = '—';
    byId('to-epoch-detail').textContent = 'Enter a date and time to convert.';
    for (const id of ['to-epoch-date', 'to-epoch-time']) byId(id).removeAttribute('aria-invalid');
  }
  function showToEpoch(date) {
    const values = core.epochValues(date);
    byId('to-epoch-seconds').textContent = values.seconds;
    byId('to-epoch-milliseconds').textContent = values.milliseconds;
    byId('to-epoch-detail').textContent = `${displayDate(date, true)} · ${core.timeValue(date, true, true)} UTC`;
  }
  function convertToEpoch() {
    const previous = byId('to-epoch-occurrence').value;
    resetToEpoch();
    try {
      const date = byId('to-epoch-date').value;
      const time = byId('to-epoch-time').value;
      if (byId('to-epoch-zone').value === 'utc') showToEpoch(core.fromUTC(date, time));
      else {
        toEpochCandidates = core.fromLocal(date, time);
        if (toEpochCandidates.length > 1) {
          byId('to-epoch-repeat').hidden = false;
          byId('to-epoch-occurrence').replaceChildren(...toEpochCandidates.map((candidate, index) => {
            const option = document.createElement('option');
            option.value = String(candidate.getTime());
            option.textContent = `${index === 0 ? 'First' : 'Second'} occurrence · ${core.offsetLabel(candidate)}`;
            return option;
          }));
          if (toEpochCandidates.some(candidate => String(candidate.getTime()) === previous)) byId('to-epoch-occurrence').value = previous;
          showToEpoch(new Date(Number(byId('to-epoch-occurrence').value)));
        } else showToEpoch(toEpochCandidates[0]);
      }
    } catch (error) {
      byId('to-epoch-error').textContent = error.message;
      byId('to-epoch-error').hidden = false;
      for (const id of ['to-epoch-date', 'to-epoch-time']) byId(id).setAttribute('aria-invalid', 'true');
    }
  }
  byId('to-epoch-date').value = core.dateValue(new Date());
  byId('to-epoch-form').addEventListener('submit', event => { event.preventDefault(); convertToEpoch(); });
  for (const id of ['to-epoch-date', 'to-epoch-time']) byId(id).addEventListener('input', resetToEpoch);
  byId('to-epoch-zone').addEventListener('change', resetToEpoch);
  byId('to-epoch-occurrence').addEventListener('change', () => showToEpoch(new Date(Number(byId('to-epoch-occurrence').value))));
  byId('to-epoch-now').addEventListener('click', () => {
    const now = new Date();
    const utc = byId('to-epoch-zone').value === 'utc';
    byId('to-epoch-date').value = core.dateValue(now, utc);
    byId('to-epoch-time').value = core.timeValue(now, utc, true);
    convertToEpoch();
    if (!utc && toEpochCandidates.length > 1) {
      const nearest = toEpochCandidates.reduce((a, b) => Math.abs(a - now) < Math.abs(b - now) ? a : b);
      byId('to-epoch-occurrence').value = String(nearest.getTime());
      showToEpoch(nearest);
    }
  });
  updateClocks();
  setInterval(updateClocks, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateClocks(); });
})();
