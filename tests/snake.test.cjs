const {test} = require('node:test');
const assert = require('node:assert/strict');
const game = require('../assets/snake-core.js');
test('quick turns are queued across ticks and reversals are rejected', () => {
  const s=game.create(); game.turn(s,'left'); assert.deepEqual(s.queue,[]);
  game.turn(s,'up'); game.turn(s,'left'); game.turn(s,'down');
  game.step(s); assert.deepEqual(s.body[0],{x:9,y:9});
  game.step(s); assert.deepEqual(s.body[0],{x:8,y:9});
});
test('food grows the snake, awards points, and respawns outside the body', () => {
  const s=game.create(); s.food={x:10,y:10}; game.step(s,()=>0);
  assert.equal(s.score,10); assert.equal(s.body.length,4);
  assert.ok(!s.body.some(p=>p.x===s.food.x && p.y===s.food.y));
});
test('wall collision ends a run and subsequent ticks do nothing', () => {
  const s=game.create(); s.body=[{x:19,y:10}]; game.step(s);
  assert.equal(s.over,true); const snapshot=JSON.stringify(s); game.step(s); assert.equal(JSON.stringify(s),snapshot);
});
test('the departing tail is a valid destination', () => {
  const s=game.create(); s.body=[{x:1,y:1},{x:1,y:2},{x:0,y:2},{x:0,y:1}]; s.direction='left'; s.food={x:5,y:5};
  game.step(s); assert.equal(s.over,false); assert.deepEqual(s.body[0],{x:0,y:1});
});
test('moving into a body segment ends the run', () => {
  const s=game.create(); s.body=[{x:1,y:1},{x:1,y:2},{x:0,y:2},{x:0,y:1},{x:0,y:0}]; s.direction='left'; s.food={x:5,y:5};
  game.step(s); assert.equal(s.over,true);
});
test('filling the board wins without an endless food search', () => {
  const s={size:2,body:[{x:0,y:0},{x:0,y:1},{x:1,y:1}],direction:'right',queue:[],food:{x:1,y:0},score:0,over:false,won:false};
  game.step(s); assert.equal(s.won,true); assert.equal(s.food,null); assert.equal(s.body.length,4);
});
