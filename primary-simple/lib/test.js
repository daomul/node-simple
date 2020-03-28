const express = require('./like-express')

const app = new express()

app.use((req,res, next) => {
    console.log('1')
    next()
})

app.use('/api', (req,res, next) => {
    console.log('api')
    next()
})

middlewaretest = (req,res, next) => {
    console.log('middlewaretest')
    next()
}

app.get('/api/gettest', middlewaretest, (req,res, next) => {
    console.log('gettest')
})

app.post('/api/posttest', (req,res, next) => {
    console.log('posttest')
})

app.listen(8000, ()=> {
    console.log('8000')
})