import 'dotenv/config'

const httpPort: number = Number(process.env.HTTP_PORT) || 3000
const wsPort: number = Number(process.env.WS_PORT) || 8080

export default {
    httpPort,
    wsPort
}