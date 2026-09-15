/* Grid rules kept independent of the browser so tricky moves can be tested. */
(function (root) {
  'use strict';
  const vectors = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };
  const same = (a, b) => a.x === b.x && a.y === b.y;
  function foodFor(body, size, random = Math.random) {
    const empty = [];
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      if (!body.some(part => same(part, { x, y }))) empty.push({ x, y });
    }
    return empty.length ? empty[Math.floor(random() * empty.length)] : null;
  }
  function create(random = Math.random) {
    const body = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }];
    return { size: 20, body, direction: 'right', queue: [], food: foodFor(body, 20, random), score: 0, over: false, won: false };
  }
  function turn(state, direction) {
    if (state.over || !vectors[direction] || state.queue.length >= 2) return;
    const previous = state.queue.at(-1) || state.direction;
    const a = vectors[previous], b = vectors[direction];
    if (previous !== direction && !(a[0] + b[0] === 0 && a[1] + b[1] === 0)) state.queue.push(direction);
  }
  function step(state, random = Math.random) {
    if (state.over) return state;
    state.direction = state.queue.shift() || state.direction;
    const [dx, dy] = vectors[state.direction];
    const head = { x: state.body[0].x + dx, y: state.body[0].y + dy };
    const eats = same(head, state.food);
    // The tail leaves this tick unless we eat: moving into its old square is legal.
    const occupied = eats ? state.body : state.body.slice(0, -1);
    if (head.x < 0 || head.y < 0 || head.x >= state.size || head.y >= state.size || occupied.some(p => same(p, head))) {
      state.over = true;
      return state;
    }
    state.body.unshift(head);
    if (eats) {
      state.score += 10;
      state.food = foodFor(state.body, state.size, random);
      if (!state.food) { state.over = true; state.won = true; }
    } else state.body.pop();
    return state;
  }
  const api = { create, turn, step, foodFor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SnakeCore = api;
})(globalThis);
