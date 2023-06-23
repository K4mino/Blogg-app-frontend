import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const { data } = await axios.get('/posts');

    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async() => {
    const { data } = await axios.get('/posts/tags');

    return data
})

export const fetchDeletePost = createAsyncThunk('posts/fetchDepletePost', async(id) => {
    axios.delete(`/posts/${id}`)
})

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async() => {
    const { data } = await axios.get('/posts/popular');

    return data
})

export const fetchPostsByTag = createAsyncThunk('auth/fetchPostByTag', async(tag) => {
    const { data } = await axios.get(`/posts/bytag/${tag}`)
    console.log(data)
    return data
})

const initialState = {
    posts:{
        items:[],
        status: 'loading'
    },
    popularPosts: {
        items:[],
        status: 'loading'
    },
    postsByTag: {
        items:[],
        status:'loading'
    },
    tags: {
        items:[],
        status: 'loading'
    }
}

 const postSlice = createSlice({
    name:'posts',
    initialState,
    extraReducers:{
        //Получение постов
        [fetchPosts.pending]:(state, action) => {
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]:(state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'fulfilled'
        },
        [fetchPosts.rejected]:(state, action) => {
            state.posts.items = []
            state.posts.status = 'error'
        },
        //Получение тегов
        [fetchTags.pending]:(state, action) => {
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]:(state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'fulfilled'
        },
        [fetchTags.rejected]:(state, action) => {
           state.tags.items = []
           state.tags.status = 'error'
        },
        //Удаление поста
        [fetchDeletePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg)
        },
        //Получение популярных постов
        [fetchPopularPosts.pending]:(state, action) => {
            state.popularPosts.status = 'loading'
        },
        [fetchPopularPosts.fulfilled]:(state, action) => {
            state.popularPosts.items = action.payload
            state.popularPosts.status = 'fulfilled'
        },
        [fetchPopularPosts.rejected]:(state, action) => {
            state.popularPosts.items = []
            state.popularPosts.status = 'error'
        },
        //Получение постов по тегу
        [fetchPostsByTag.pending]:(state, action) => {
            state.postsByTag.status = 'loading'
        },
        [fetchPostsByTag.fulfilled]:(state, action) => {
            state.postsByTag.items = action.payload
            state.postsByTag.status = 'fulfilled'
        },
        [fetchPostsByTag.rejected]:(state, action) => {
            state.postsByTag.items = []
            state.postsByTag.status = 'error'
        },
    }
 })


export const postReducer = postSlice.reducer;