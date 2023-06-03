require('dotenv').config()

const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes')


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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))



app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>');
    res.redirect('/blogs')
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});


// blog Routes
app.use(blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})