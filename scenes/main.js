const MOVE_SPEED = 200

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
  '^' : [sprite('space-invader'), scale(2)],
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