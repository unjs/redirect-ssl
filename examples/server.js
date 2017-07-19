const connect = require('connect')
const https = require('https')
const pem = require('pem')
const forceHttps = require('..')

const app = connect()
app.use(forceHttps.create({statusCode: 302}))

app.use('/' , (req,res) => {
    res.end('Hi!')
})

pem.createCertificate({days:1, selfSigned:true}, (err, keys) => {
    https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(8081)
    console.log('Listining on https://localhost:8081')
});

app.listen(8080)
console.log('Listining on http://localhost:8080')