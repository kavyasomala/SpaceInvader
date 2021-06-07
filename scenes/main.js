const MOVE_SPEED = 200
const TIME_LEFT = 200 //change later

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
  '!                &'
], {
  width: 30,
  height: 22,
  '^' : [sprite('space-invader'), scale(2), 'space-invader'],
  '!' : [ sprite('wall'), 'left-wall'],
  '&' : [sprite('wall'), 'right-wall']
})

const player = add ([
  sprite('space-ship'),
  scale(2),
  pos(width()/2, height()/2),
  origin('center')
])

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})

const score = add([
  text('0'),
  pos(50, 50),
  layer('ui'),
  scale(3),
  {
    value: 0,
  }
])

const timer = add([
  text('0'),
  pos(90, 50),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])

timer.action(() => {
  timer.time -= dt()
  timer.text = timer.time.toFixed(2)
  if (timer.time <=0 ) {
    go('lose', score.value)
  }
})

const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 50

action('space-invader', (s) => {
  s.move(INVADER_SPEED, 0)
})

collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})