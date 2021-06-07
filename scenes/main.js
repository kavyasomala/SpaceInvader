const MOVE_SPEED = 200
const TIME_LEFT = 30
const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 100
const BULLET_SPEED = 400


layer(['obj', 'ui'], 'obj')

addLevel([
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
], {
    width: 35,
    height: 20,
    '^': [sprite('space-invader'), scale(2), 'space-invader'],
    '!': [sprite('wall'), 'left-wall'],
    '&': [sprite('wall'), 'right-wall']
  })

const player = add([
  sprite('space-ship'),
  scale(2),
  pos(width() / 2, height() - height() / 4),
  origin('center')
])

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})

function spawnBullet(p) {
  add([rect(6, 18), pos(p), origin('center'), color(0.5, 0.5, 1), 'bullet'])
}

keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
})


action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if (b.pos.y < 0) {
    destroy(b)
  }
})

collides('bullet', 'space-invader', (b, s) => {
  camShake(4)
  destroy(b)
  destroy(s)
  score.value++
  score.text = score.value
})

const score = add([
  text('0'),
  pos(58, 55),
  layer('ui'),
  scale(2),
  {
    value: 0,
  }
])

const timer = add([
  text('0'),
  pos(58, 22),
  scale(2.5),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])

timer.action(() => {
  timer.time -= dt()
  timer.text = timer.time.toFixed(2)
  if (timer.time <= 0) {
    go('lose', { score: score.value })
  }
})

action('space-invader', (s) => {
  s.move(CURRENT_SPEED, 0)
})

collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

collides('space-invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

player.overlaps('space-invader', () =>
  go('lose', { score: score.value })
)

action('space-invader', (s) => {
  if (s.pos.y >= (height() - height() / 4)) {
    go('lose', { score: score.value })
  }
})

///////////////////////////////
/*
More things to add:
 - Add win scene
 - Add new levels
 - Be able to choose easy medium or hard
 - Make game responsive
  - position space ship so it will work on any browser size
  - account for browser size vs game size for space invaders lose condition
 - prevent the "space ship" from being able to go offscreen
*/