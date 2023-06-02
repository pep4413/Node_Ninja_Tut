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

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result , title: 'Blog Details' })
        })
        .catch((err) => console.log(err))
})

app.post('/delete/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/blogs")
        })
        .catch((err) => console.log(err))
})

// app.delete('blogs/:id', (req, res) => {
//     const id = req.params.id
//     console.log("In app.delete")
//     Blog.findByIdAndDelete(id)
//     .then((result) => {
//         res.json({ redirect: '/blogs' })
//     })
//     .catch((err) => console.log(err))
// })

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})