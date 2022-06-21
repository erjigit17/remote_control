import Jimp from 'jimp';
import {httpServer} from './src/http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

robot.setMouseDelay(5)
const screenSize = robot.getScreenSize()

const wws = new WebSocketServer({port: WS_PORT});
const mouse_position = {
  _x: 0,
  _y: 0,

  get x() {
    return this._x
  },
  get y() {
    return this._y
  },

  set x(newValue) {
    if (newValue >= 0 && newValue <= screenSize.width) this._x = newValue;
  },
  set y(newValue) {
    if (newValue >= 0 && newValue <= screenSize.height) this._y = newValue;
  }

}
const directions = [
  'mouse_up',
  'mouse_down',
  'mouse_right',
  'mouse_left'
]

const figures = [
  'draw_circle',
  'draw_rectangle',
  'draw_square'
]

wws.on('connection', (ws) => {
  console.log('[Server] Client was connected.')

  ws.on('close', () => console.log('[Server] Client disconnected.'))

  ws.on('message', (msg) => {
    console.log(`[Server] Message received: ${msg}`)

    const [cmd, _px, _length] = msg.toString().split(' ')
    if (directions.includes(cmd)) {
      const px = Number(_px)
      setMousePosition(cmd, px, ws)
    }
    if (figures.includes(cmd)) {
      const px = Number(_px)
      const length = Number(_length) || null
      drawFigure(cmd, px, length)
    }

    if (cmd === 'prnt_scrn') printScreen(ws)
  })

})


function drawFigure(figure, widthOrRadius, length){

  if(figure === 'draw_square') {
    mouseRight(widthOrRadius)
    mouseDown(widthOrRadius)
    mouseLeft(widthOrRadius)
    mouseUp(widthOrRadius)
  }

  if(figure === 'draw_rectangle') {
    mouseRight(widthOrRadius)
    mouseDown(length)
    mouseLeft(widthOrRadius)
    mouseUp(length)
  }

  if(figure === 'draw_circle') drawCircle(widthOrRadius)

}

function setMousePosition(direction, px, ws){
  const position = new Map()
  position.set('mouse_right', px => mouse_position.x += px)
  position.set('mouse_left',  px => mouse_position.x -= px)
  position.set('mouse_up',    px => mouse_position.y -= px)
  position.set('mouse_down',  px => mouse_position.y += px)

  position.get(direction)(px)
  ws.send(`mouse_position ${mouse_position.x},${mouse_position.y}`)
  robot.moveMouse(mouse_position.x, mouse_position.y)
}


function drawCircle(radius) {
  const centerX = mouse_position.x + radius
  const centerY = mouse_position.y + radius
  const steps = 300

  for (let i = 0; i <= steps; i++) {
    const radians = (2 * Math.PI * i / steps) - Math.PI / 2
    const x = centerX + radius * Math.cos(radians)
    const y = centerY + radius * Math.sin(radians)
    robot.moveMouse(x, y)
  }
}

function mouseRight(px) {
  for (let i = 0; i < px; i++) {
    const x = mouse_position.x + i
    const y = mouse_position.y

    robot.moveMouse(x, y)
  }
  mouse_position.x += px
}

function mouseLeft(px) {
  for (let i = 0; i < px; i++) {
    const x = mouse_position.x - i
    const y = mouse_position.y

    robot.moveMouse(x, y)
  }
  mouse_position.x -= px
}

function mouseUp(px) {
  for (let i = 0; i < px; i++) {
    const x = mouse_position.x
    const y = mouse_position.y -i

    robot.moveMouse(x, y)
  }
  mouse_position.y -= px
}

function mouseDown(px) {
  for (let i = 0; i < px; i++) {
    const x = mouse_position.x
    const y = mouse_position.y +i

    robot.moveMouse(x, y)
  }
  mouse_position.y += px
}


function printScreen(ws){
  const size = 100

  const mousePosition = robot.getMousePos()
  const {x, y} = mousePosition

  const buffer = robot.screen.capture(x, y, size, size).image

  new Jimp({ data: buffer, width: 200, height: 200 }, async (err, jimp) => {
    const _Base64 = await jimp.getBase64Async(Jimp.MIME_PNG)
    const Base64 = _Base64.split(',').at(-1) //slice "data:image/png;base64"
    ws.send(`prnt_scrn ${Base64}`)
  })
}