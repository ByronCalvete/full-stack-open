import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [ ...state, action.payload ]
    },
    votedBlog(state, action) {
      const newBlog = action.payload
      return state.map(blog => blog.id === newBlog.id ? newBlog : blog)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, votedBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const liked = (id, blog) => {
  return async dispatch => {
    const newBlog = await blogService.update(id, blog)
    dispatch(votedBlog(newBlog))
  }
}

export const blogToDelete = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
