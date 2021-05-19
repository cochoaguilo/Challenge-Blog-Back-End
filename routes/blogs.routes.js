const express = require("express");
const router = express.Router()
const blogsController = require('../controllers/blogs.controllers');

router.get('/', blogsController.getBlogslist);

router.get('/:id', blogsController.getBlogbyID);

router.post('/',  blogsController.newBlog)

router.patch('/:id', blogsController.updateBlog)

router.delete('/:id', blogsController.deleteBlog)

module.exports = router;