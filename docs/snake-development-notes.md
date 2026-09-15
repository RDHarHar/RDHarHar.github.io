# Snake: coding journey and article material

## 2026-09-15 — First playable version (0.10.0)

Ryan requested a small Snake game under Gaming, with a leaderboard, and chose local
scores per browser. This is working material for a future article, not a published article.

## Article added — 2026-09-15 (0.10.1)

These notes now inform `gaming/snake-behind-the-scenes.html`, linked at the top of Snake.
The article and game are still local, not deployed. Keep recording new observations here
and update the reader-facing article as relevant lessons develop.

### Starting small

The board is a 20-by-20 grid. Canvas draws it; ordinary HTML handles the buttons,
score display, and leaderboard. The rules live separately in `assets/snake-core.js`.
That separation made it possible to test collisions without opening a browser.
The design follows the existing orange theme and respects saved alternative palettes.

### Quick fingers, slower snake

Keyboard events arrive between game ticks. Applying every turn immediately can turn
a valid right → up → left sequence into an accidental reversal before the snake moves.
A two-turn queue consumes one turn per tick and checks each new turn against the last
queued direction. Repeated keydown events are ignored. Buttons and swipes use the same rules.

Article angle: “Apparently, my fingers can outrun a snake made of squares.”

### The tail is leaving

Collision checks need to consider where the body will be after the move. On a normal
tick, the tail's current square becomes empty. Checking against the entire old body
would reject a legal move into that square. The rule excludes the tail unless the snake
is eating, in which case it grows and the tail stays. A dedicated test covers this case.

### The last snack

Randomly guessing empty squares becomes inefficient as the board fills and could loop
forever on a full board. This game collects the remaining empty squares and chooses one.
On a small 400-cell board the straightforward approach is sufficient. No free squares
means a win, explicitly covered by a nearly-full two-by-two test board.

### Pausing is part of the game

Movement uses one scheduled tick at a time, independent of screen refresh rate.
Pausing cancels the pending tick; resuming schedules a fresh one. Hiding the tab or
leaving the window pauses play so returning doesn't deliver a pile of missed moves.
Speed starts at 160 milliseconds per move and bottoms out at 75, reducing by 10 every 50 points.

### A scoreboard with an honest scope

Scores stay in localStorage under `ryan-harwick-snake-scores-v1`. It is a personal top
10, not a shared or tamper-proof competition. Score saving is offered once per finished
run, with a 20-character name limit. Names render as text, never HTML. Stored records
are validated before display; storage errors fall back to scores for the current visit.
Records are re-read before a save to reduce overwriting scores from another tab, though
localStorage is not a transactional database and simultaneous writes can still race.

### Validation and an actual snag

Six automated rule tests cover queued turns, growth, wall/body collisions, a departing
tail, and a full board. Browser checks cover four widths (320–1440px), pause/resume,
game over, score submission, persistence, malformed storage, navigation, and names
containing HTML-like text. Screenshots exposed arrow glyphs becoming question marks
when HTML was created through a Windows shell pipeline. HTML entities fix the encoding
problem without depending on the shell's output encoding.

For the eventual article, use Ryan's casual, direct first-person developer voice and
ground any story in these recorded decisions and checks. Do not invent anecdotes.
