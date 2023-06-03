const Blog = require('../models/blog')
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result , title: 'Blog Details' })
        })
        .catch((err) => {
            res.render('404', { title: 'Blog not found'})
        })
} 

const blog_create_get = (req, res) => {
    res.status(404).render('create', { title: 'Create a New Blog' })
} 

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
} 

const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/blogs")
        })
        .catch((err) => console.log(err))
} 

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}