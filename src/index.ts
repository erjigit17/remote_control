import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import {httpServer} from './http_server';
import settings from "./settings";
import {
  drawSquare,
  drawRectangle,
  drawCircle,
  printScreen,
  setMousePosition,
  mouse_position
} from './helpers'
import {directions, figures} from './constants'


console.log(`Start static http server on the ${settings.httpPort} port!`);
httpServer.listen(settings.httpPort);

robot.setMouseDelay(5)

const wws = new WebSocketServer({port: settings.wsPort});


wws.on('connection', (ws) => {
  console.log('[Server] Client was connected.')

  ws.on('close', () => console.log('[Server] Client disconnected.'))

  ws.on('message', (msg) => {
    console.log(`[Server] Message received: ${msg}`)

    const [cmd, _px, _height] = msg.toString().split(' ')

    if (Object.values(directions).includes(cmd)) {
      const px = Number(_px)
      setMousePosition(cmd, px, robot)
      ws.send(cmd)

    } else if (Object.values(figures).includes(cmd)) {
      const widthOrRadius = Number(_px)
      const height = Number(_height) || null
      drawFigure(cmd, widthOrRadius, height, robot)
      ws.send(cmd)

    } else if (cmd === 'prnt_scrn') {
      printScreen(ws, robot)

    } else if (cmd === 'mouse_position') {
      const {x, y} = mouse_position
      ws.send(`mouse_position ${x},${y}`)
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


