//File to test connectivity to our mongoDB instance 
const mongoose = require('mongoose')
const url = 'mongodb+srv://fullstack:<passwordHere>@cluster0.fbs6utd.mongodb.net/blogNotesApp?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  content: String,
  votes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  content: 'Learning HTML',
  votes: 5,
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})