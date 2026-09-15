const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const core = require('../assets/utc-core.js');

test('epoch zero, negative seconds and modern seconds convert exactly', () => {
  assert.equal(core.fromEpoch('0', 'seconds').toISOString(), '1970-01-01T00:00:00.000Z');
  assert.equal(core.fromEpoch('-1', 'seconds').toISOString(), '1969-12-31T23:59:59.000Z');
  assert.equal(core.fromEpoch('1704067200', 'seconds').toISOString(), '2024-01-01T00:00:00.000Z');
});
test('milliseconds preserve subsecond precision, including before the epoch', () => {
  const date = core.fromEpoch('1704067200123', 'milliseconds');
  assert.equal(date.toISOString(), '2024-01-01T00:00:00.123Z');
  assert.deepEqual(core.epochValues(date), { seconds: 1704067200, milliseconds: 1704067200123 });
  assert.equal(core.fromEpoch('-1', 'milliseconds').toISOString(), '1969-12-31T23:59:59.999Z');
  assert.deepEqual(core.epochValues(new Date(-1)), { seconds: -1, milliseconds: -1 });
});
test('epoch validation rejects missing, fractional, exponent, unsafe and out-of-range values', () => {
  for (const value of ['', ' ', '1.5', '1e9', 'abc', '9007199254740993', '253402300800', '-2208988801']) {
    assert.throws(() => core.fromEpoch(value, 'seconds'));
  }
  assert.throws(() => core.fromEpoch('0', 'minutes'));
  assert.equal(core.fromEpoch(' 0 ', 'seconds').getTime(), 0);
});
test('date inputs preserve seconds and return exact epoch values', () => {
  const date = core.fromUTC('2024-01-01', '00:00:45');
  assert.deepEqual(core.epochValues(date), { seconds: 1704067245, milliseconds: 1704067245000 });
  assert.throws(() => core.fromUTC('2024-01-01', '00:00:60'));
  assert.deepEqual(inZone('America/New_York', `core.fromLocal('2024-11-03','01:30:45').map(d=>d.toISOString())`), ['2024-11-03T05:30:45.000Z', '2024-11-03T06:30:45.000Z']);
});

function inZone(zone, expression) {
  const script = `const core = require(${JSON.stringify(path.resolve(__dirname, '../assets/utc-core.js'))}); console.log(JSON.stringify(${expression}));`;
  const result = spawnSync(process.execPath, ['-e', script], { env: { ...process.env, TZ: zone }, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}
test('UTC parsing is explicit and rejects empty, invalid, or overflowed fields', () => {
  assert.equal(core.fromUTC('2024-02-29', '23:59').toISOString(), '2024-02-29T23:59:00.000Z');
  for (const [date, time] of [['', ''], ['2023-02-29', '12:00'], ['2024-04-31', '12:00'], ['2024-13-01', '12:00'], ['2024-01-01', '24:00'], ['2024-01-01', '12:60'], ['1899-12-31', '12:00']]) {
    assert.throws(() => core.fromUTC(date, time));
  }
});
test('New York winter UTC-to-local crosses into the previous date', () => {
  assert.deepEqual(inZone('America/New_York', `(() => { const d=core.fromUTC('2024-01-01','02:30');return [core.dateValue(d),core.timeValue(d),core.offsetLabel(d)]; })()`), ['2023-12-31', '21:30', 'UTC−05:00']);
});
test('New York summer local-to-UTC crosses midnight and uses daylight saving', () => {
  assert.deepEqual(inZone('America/New_York', `core.fromLocal('2024-07-01','23:30').map(d=>d.toISOString())`), ['2024-07-02T03:30:00.000Z']);
});
test('spring-forward gap is rejected, rather than silently moved an hour forward', () => {
  assert.match(inZone('America/New_York', `(() => {try { core.fromLocal('2024-03-10','02:30'); return 'unexpected success'; } catch(error) {return error.message;} })()`), /does not exist/);
});
test('fall-back exposes both possible UTC instants', () => {
  assert.deepEqual(inZone('America/New_York', `core.fromLocal('2024-11-03','01:30').map(d=>d.toISOString())`), ['2024-11-03T05:30:00.000Z','2024-11-03T06:30:00.000Z']);
});
test('half-hour daylight-saving repeat is handled on Lord Howe Island', () => {
  assert.deepEqual(inZone('Australia/Lord_Howe', `core.fromLocal('2024-04-07','01:45').map(d=>d.toISOString())`), ['2024-04-06T14:45:00.000Z','2024-04-06T15:15:00.000Z']);
});
test('quarter-hour offset works in Kathmandu', () => {
  assert.deepEqual(inZone('Asia/Kathmandu', `core.fromLocal('2024-01-01','00:15').map(d=>d.toISOString())`), ['2023-12-31T18:30:00.000Z']);
});
test('UTC local zone has one occurrence and round-trips unchanged', () => {
  assert.deepEqual(inZone('UTC', `core.fromLocal('2024-06-01','12:34').map(d=>[core.dateValue(d,true),core.timeValue(d,true),core.offsetLabel(d)])`), [['2024-06-01','12:34','UTC+00:00']]);
});
test('date-line move rejects the skipped calendar day in Apia', () => {
  assert.match(inZone('Pacific/Apia', `(() => {try {core.fromLocal('2011-12-30','12:00');return 'unexpected success';}catch(error){return error.message;}})()`), /does not exist/);
});
