const User = require('../models/user')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach(blog => total += blog.likes)
  return total
}

const favoriteBlog = (blogs) => {
  let obj = null
  let likes = 0
  blogs.forEach(blog => {
    if (blog.likes >= likes) {
      obj = blog
      likes = blog.likes
    }
  })
  return obj
}

const mostBlogs = (blogs) => {
  let obj = {}
  let ret_obj = {}
  for (let i in blogs) {
    if (!obj[blogs[i].author]) obj[blogs[i].author] = 1
    else obj[blogs[i].author] += 1
  }
  if (Object.keys(obj).length === 0) return {}
  max_name = 0
  max_value = 0
  for (let j in obj) {
    if (obj[j] > max_value) {
      max_name = j
      max_value = obj[j]
    }
  }
  ret_obj.author = max_name
  ret_obj.blogs = max_value
  return ret_obj
}

const mostLikes = (blogs) => {
  let obj = {}
  let ret_obj = {}
  for (let i in blogs) {
    if (!obj[blogs[i].author]) obj[blogs[i].author] = blogs[i].likes
    else obj[blogs[i].author] += blogs[i].likes
  }
  if (Object.keys(obj).length === 0) return {}
  max_name = 0
  max_value = 0
  for (let j in obj) {
    if (obj[j] > max_value) {
      max_name = j
      max_value = obj[j]
    }
  }
  ret_obj.author = max_name
  ret_obj.likes = max_value
  return ret_obj
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    usersInDb,
}