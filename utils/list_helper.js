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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}