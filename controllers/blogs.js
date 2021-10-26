const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
blogsRouter.post('/', (request, response) => {
    const blog = Blog(request.body)
    console.log(blog)
    console.log(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

module.exports = blogsRouter