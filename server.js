const express = require('express')
const app = express()
const user = require('./routers/api/user')

app.use(express.json())

app.use('/api', user)

// User.db.dropCollection('users')

// 监听端口
app.listen(3001,() => {
    console.log('3001 is Listening...')
})
