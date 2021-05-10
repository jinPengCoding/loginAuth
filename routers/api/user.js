const express = require('express')
const router = express.Router()
const { User } = require('../../models.js')
const scert = 'iuayheraiushefniaefeiunfasdjfee3'
const jwt = require('jsonwebtoken')

// 登录
router.post('/login', async(req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password, user.password
    )
    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码不正确'
        })
    }
    // 后台验证账号密码是否正确，正确则生成token发送给前端
    // 进行签名
    const token = jwt.sign({ 
        id: String(user._id)
    }, scert)
    res.send({
        user,
        token
    })
})

const auth = async(req, res, next) => {
    const auth = String(req.headers.authorization)
    const raw = jwt.verify(auth, scert)
    const { id } = raw
    const user = await User.findById(id)
    req.user = user
    next()
}

// 个人信息
router.get('/profile', auth, async (req, res) => {
    res.send(req.user)
})


// 注册
router.post('/register', async(req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
})

router.get('/user', async(req, res) => {
    const users = await User.find()
    res.send(users)
})


module.exports = router