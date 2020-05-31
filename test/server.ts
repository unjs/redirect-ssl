import https from 'https'
import connect from 'connect'
import pem from 'pem'
import redirectSSL from '../src'

const HOST = 'localhost'
const HTTP_PORT = 8080
const HTTPS_PORT = 8443

const app = connect()

app.use(redirectSSL.create({
  statusCode: 302,
  redirectPort: HTTPS_PORT,
  exclude: [
    '^/health$'
  ]
}))

app.use('/', (_, res) => {
  res.end('Hi!')
})

pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(HTTPS_PORT)
  if (err) {
    console.error(err)
  }
  console.log(`Listining on https://${HOST}:${HTTPS_PORT}`)
})

app.listen(HTTP_PORT, () => {
  console.log(`Listining on http://${HOST}:${HTTP_PORT}`)
  console.log(`No SSL redirect on excluded URL: http://${HOST}:${HTTP_PORT}/health`)
})
