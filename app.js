require('dotenv').config()

const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')



// express app
const app = express();

// connect to mongo
const dbURI = process.env.ATLAS
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

// register view engine (ejs)
app.set('view engine', 'ejs')


// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))



app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>');
    res.redirect('/blogs')
});



app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});


// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})