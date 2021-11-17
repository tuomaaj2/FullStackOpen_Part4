const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

describe('when testing api', () => {
    const initialBlogs = [
    {
        title: "Blogi teksti 1",
        author: "Joku",
        url: "NAN",
        likes: 5,
    },
    {
        title: "Blogi teksti 2",
        author: "Toinen",
        url: "URL",
        likes: 100,
    },
    ]

    beforeEach(async () => {
        await Blog.deleteMany({})
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()
    })

    test('there are two blogs returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('returned blogs have id field', async () => {
        const response = await api.get('/api/blogs')
        for (let blog in response.body) {
            expect(blog).toBeDefined()
        }
    })

    test('post add blog count by one', async () => {
        const newBlog = {
            title: "Uusi",
            author: "Muu",
            url: "Urli",
            likes: 1,
        }
        await api
                .post('/api/blogs')
                .send(newBlog)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length+1)
    })

    test('posted blog has likes value 0 if not defined', async () => {
        const newBlog = {
            title: "Uusi",
            author: "Muu",
            url: "Urli",
        }
        await api
                .post('/api/blogs')
                .send(newBlog)
        const response = await api.get('/api/blogs')
        const addedBlog = response.body[response.body.length - 1].likes
        expect(addedBlog).toBeDefined()
        expect(addedBlog).toBe(0)
    })

    test('posted blog must contain title and url', async () => {
        const noTitleBlog = {
            author: "Muu",
            url: "Urli",
            likes: 1,
        }
        const noUrlBlog = {
            title: "Uusi",
            author: "Muu",
            likes: 1,
        }
        await api
                .post('/api/blogs')
                .send(noTitleBlog)
                .expect(400)
        await api
                .post('/api/blogs')
                .send(noUrlBlog)
                .expect(400)
    })

    afterAll(() => {
        mongoose.connection.close()
    })

})