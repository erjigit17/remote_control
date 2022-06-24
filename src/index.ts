import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
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
import {IRobot} from './interfaceses'

console.log(`Start static http server on the ${settings.httpPort} port!`);
httpServer.listen(settings.httpPort);

robot.setMouseDelay(5)

const wws = new WebSocketServer({port: settings.wsPort});

wws.on('connection', ws => {
  ws.on('close', () => console.log('[Server] Client disconnected.'))

  const duplex = createWebSocketStream(ws, {decodeStrings: false})

  console.log('[Server] Client was connected.')

  duplex.on('data', async (chunk) => {

    const [cmd, _px, _height] = chunk.toString().split(' ')

    console.log(`[Server] received command: ${cmd}`)

    if (Object.values(directions).includes(cmd)) {
      const px = Number(_px)
      setMousePosition(cmd, px, robot)
      duplex.write(cmd)

    } else if (Object.values(figures).includes(cmd)) {
      const widthOrRadius = Number(_px)
      const height = Number(_height) || null
      drawFigure(cmd, widthOrRadius, height, robot)
      duplex.write(cmd)

    } else if (cmd === 'prnt_scrn') {
      const base64 = await printScreen(robot)
      duplex.write(`prnt_scrn ${base64}`)

    } else if (cmd === 'mouse_position') {
      const {x, y} = mouse_position
      duplex.write(`mouse_position ${x},${y}`)
    }
  })

})


process.on('SIGINT',  () => {
  wws.close()
  console.log('\nWeb Socket Server closed.')
  process.exit(0)
})

function drawFigure(figure: string, widthOrRadius: number, length: number | null, robot: IRobot){
  switch (figure) {
    case figures.square:
      drawSquare(widthOrRadius, robot)
          break

    case figures.rectangle:
      if (typeof length === 'number') {
        drawRectangle(widthOrRadius, length, robot)
      }
          break

    case figures.circle:
      drawCircle(widthOrRadius, robot)
          break
  }
}
