import React, { useEffect } from 'react'
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from "../../components/Post";
import { fetchPostsByTag } from '../../redux/slices/posts';
import { PostSkeleton } from "../../components/Post/Skeleton";

export const ActiveTag = () => {
    const { postsByTag } = useSelector((state) => state.posts)
    const { data } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { tag } = useParams()

    useEffect(() => {
        dispatch(fetchPostsByTag(tag))
    }, [])

  return (
    <div>
        <h1>#{tag}</h1>
        <Grid item>
          {postsByTag.status === "loading"
            ? [...new Array(4)].map((_) => <PostSkeleton />)
            : postsByTag.items.map((post) => (
                <Post
                  id={post._id}
                  key={post._id}
                  title={post.title}
                  imageUrl={post.imageUrl ? `http://localhost:8081${post.imageUrl}` : ''}
                  user={post.user}
                  createdAt={post.createdAt}
                  viewsCount={post.viewsCount}
                  commentsCount={3}
                  tags={post.tags}
                  isEditable={post.user._id === data?._id}
                />
              ))}
        </Grid>
    </div>
  )
}
