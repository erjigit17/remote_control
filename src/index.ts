import {httpServer} from './http_server'
import robot from 'robotjs';
import { WebSocketServer } from 'ws';

import {
  drawSquare,
  drawRectangle,
  drawCircle,
  printScreen,
  setMousePosition
} from './helpers'

import {directions, figures} from './constants'

const HTTP_PORT = 3000;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

robot.setMouseDelay(5)

const wws = new WebSocketServer({port: WS_PORT});


wws.on('connection', (ws) => {
  console.log('[Server] Client was connected.')

  ws.on('close', () => console.log('[Server] Client disconnected.'))

  ws.on('message', (msg) => {
    console.log(`[Server] Message received: ${msg}`)

    const [cmd, _px, _height] = msg.toString().split(' ')

    if (Object.values(directions).includes(cmd)) {
      const px = Number(_px)
      setMousePosition(cmd, px, ws, robot)

    } else if (Object.values(figures).includes(cmd)) {
      const widthOrRadius = Number(_px)
      const height = Number(_height) || null
      drawFigure(cmd, widthOrRadius, height, robot)

    } else if (cmd === 'prnt_scrn') {
      printScreen(ws, robot)
    }
  })

})


function drawFigure(figure, widthOrRadius, length, robot){
  switch (figure) {
    case figures.square:
      drawSquare(widthOrRadius, robot)
          break

    case figures.rectangle:
      drawRectangle(widthOrRadius, length, robot)
          break

    case figures.circle:
      drawCircle(widthOrRadius, robot)
          break
  }
}
