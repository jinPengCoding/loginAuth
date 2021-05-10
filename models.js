const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    }
})
const User = mongoose.model('User', schema)
module.exports = { User }