const http = require('http')
const express = require('express');
const app = express()

const server = http.createServer(app)

const cors = require('cors')

const userRouter = require('./router/user.route');
const accountRouter = require('./router/account.route');
const { userAuthentication } = require('./auth');

const port = 3010;

app.use(express.json())

const corsOptions = {
    exposedHeaders: 'Token',
};

app.use(cors(corsOptions))

const router = express.Router()


app.get('/',(req,res,next) => {
    res.status(200).json({
        succss:true
    })
})

app.use('/api/v1/users',router)
userRouter(router);

app.use(userAuthentication)

app.use('/api/v1/account',router)
accountRouter(router)

app.use((err,req,res,next) => {
    console.log(err);
    return res.status(500).send({
        succss:false,
        error:err
    })
})
server.listen(port)

server.on('listening',()=>{
    console.log("The app is listening on port - ",port)
})

module.exports = server;