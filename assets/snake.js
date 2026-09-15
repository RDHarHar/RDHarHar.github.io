(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const board = $('board'), ctx = board.getContext('2d');
  const key = 'ryan-harwick-snake-scores-v1';
  let state = SnakeCore.create(), mode = 'ready', timer, saved = false;
  let scores = [], storageAvailable = true;
  function readScores() {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      return (Array.isArray(data) ? data : []).filter(s => s && typeof s.name === 'string' && s.name.length <= 20 && Number.isInteger(s.score) && s.score >= 0 && s.score <= 3970 && s.score % 10 === 0 && typeof s.date === 'string' && Number.isFinite(Date.parse(s.date))).sort((a,b) => b.score-a.score || Date.parse(a.date)-Date.parse(b.date)).slice(0,10);
    } catch { storageAvailable = false; return []; }
  }
  scores = readScores();
  function rankings() {
    $('scores').replaceChildren();
    scores.forEach(s => {
      const li = document.createElement('li'), row = document.createElement('div'), name = document.createElement('span'), points = document.createElement('strong'), date = document.createElement('time');
      row.className = 'score-entry'; name.textContent = s.name; points.textContent = s.score;
      date.dateTime = s.date; date.textContent = new Date(s.date).toLocaleDateString();
      row.append(name,points); li.append(row,date); $('scores').append(li);
    });
    $('empty-scores').hidden = scores.length > 0;
    $('best').textContent = Math.max(state.score, scores[0]?.score || 0);
    if (!storageAvailable) $('save-status').textContent = 'Browser storage is unavailable. Scores will last for this visit only.';
  }
  function draw() {
    const css = getComputedStyle(document.documentElement), cell = board.width / state.size;
    ctx.fillStyle = css.getPropertyValue('--bg'); ctx.fillRect(0,0,600,600);
    ctx.strokeStyle = css.getPropertyValue('--line'); ctx.lineWidth = .5;
    for(let i=0;i<=state.size;i++) { ctx.beginPath(); ctx.moveTo(i*cell,0); ctx.lineTo(i*cell,600); ctx.moveTo(0,i*cell); ctx.lineTo(600,i*cell); ctx.stroke(); }
    state.body.forEach((p,i) => { ctx.fillStyle = css.getPropertyValue(i===0?'--text':'--accent'); ctx.fillRect(p.x*cell+2,p.y*cell+2,cell-4,cell-4); });
    if(state.food) { ctx.fillStyle = css.getPropertyValue('--accent'); ctx.beginPath(); ctx.arc((state.food.x+.5)*cell,(state.food.y+.5)*cell,cell*.28,0,Math.PI*2); ctx.fill(); }
    $('score').textContent = state.score; $('best').textContent = Math.max(state.score,scores[0]?.score || 0);
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(tick,Math.max(75,160-Math.floor(state.score/50)*10)); }
  function tick() {
    if(mode!=='running') return;
    SnakeCore.step(state); draw();
    if(state.over) {
      mode='over'; $('pause').disabled=true; $('start').disabled=false; $('start').textContent='Play again';
      $('game-status').textContent = `${state.won?'Board cleared!':'Game over.'} Score: ${state.score}.`;
      $('score-form').hidden=false;
    } else schedule();
  }
  function pause() {
    if(mode!=='running' && mode!=='paused') return;
    if(mode==='running') { mode='paused'; clearTimeout(timer); $('pause').textContent='Resume'; $('game-status').textContent='Paused. Take your time.'; }
    else { mode='running'; $('pause').textContent='Pause'; $('game-status').textContent='Keep moving. Snacks ahead.'; schedule(); }
  }
  $('start').addEventListener('click',() => {
    clearTimeout(timer); state=SnakeCore.create(); mode='running'; saved=false;
    $('score-form').hidden=true; $('save-status').textContent=storageAvailable?'':'Browser storage is unavailable. Scores will last for this visit only.';
    $('start').disabled=true; $('pause').disabled=false; $('pause').textContent='Pause';
    $('game-status').textContent='Keep moving. Snacks ahead.'; draw(); board.focus({preventScroll:true}); schedule();
  });
  $('pause').addEventListener('click',pause);
  const directions = { ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right', w:'up', s:'down', a:'left', d:'right' };
  document.addEventListener('keydown',e => {
    if(e.target.closest('input,textarea,select') || e.ctrlKey || e.altKey || e.metaKey) return;
    const direction = directions[e.key] || directions[e.key.toLowerCase()];
    if(direction && mode==='running') { e.preventDefault(); if(!e.repeat) SnakeCore.turn(state,direction); }
    if(e.code==='Space' && e.target===board) { e.preventDefault(); if(!e.repeat) pause(); }
  });
  document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click',() => { if(mode==='running') SnakeCore.turn(state,button.dataset.direction); }));
  let swipe;
  board.addEventListener('pointerdown',e => { swipe={x:e.clientX,y:e.clientY}; board.setPointerCapture(e.pointerId); });
  board.addEventListener('pointerup',e => {
    if(!swipe) return;
    const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y; swipe=null;
    if(mode==='running' && Math.max(Math.abs(dx),Math.abs(dy))>15) SnakeCore.turn(state,Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));
  });
  board.addEventListener('pointercancel',() => { swipe=null; });
  document.addEventListener('visibilitychange',() => { if(document.hidden && mode==='running') pause(); });
  window.addEventListener('blur',() => { if(mode==='running') pause(); });
  $('score-form').addEventListener('submit',e => {
    e.preventDefault(); if(mode!=='over' || saved) return;
    // Merge another tab's scores before writing; unavailable storage falls back to this visit.
    const latest = readScores(); if(storageAvailable) scores=latest;
    scores.push({name:$('player').value.trim().slice(0,20)||'Player',score:state.score,date:new Date().toISOString()});
    scores.sort((a,b)=>b.score-a.score || Date.parse(a.date)-Date.parse(b.date)); scores=scores.slice(0,10);
    try { localStorage.setItem(key,JSON.stringify(scores)); } catch { storageAvailable=false; }
    saved=true; $('score-form').hidden=true; $('save-status').textContent='Score saved. Your top 10 runs are listed below.'; rankings();
  });
  new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  rankings(); draw();
})();
