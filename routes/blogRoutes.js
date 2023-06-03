const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router();

// blog routes
router.get('/blogs', blogController.blog_index)

router.post('/blogs', blogController.blog_create_post)

router.get('/blogs/create', blogController.blog_create_get)

router.get('/blogs/:id', blogController.blog_details)

router.post('/delete/:id', blogController.blog_delete)

// app.delete('blogs/:id', (req, res) => {
//     const id = req.params.id
//     console.log("In app.delete")
//     Blog.findByIdAndDelete(id)
//     .then((result) => {
//         res.json({ redirect: '/blogs' })
//     })
//     .catch((err) => console.log(err))
// })

module.exports = router