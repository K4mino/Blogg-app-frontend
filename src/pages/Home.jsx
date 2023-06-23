import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { PostSkeleton } from "../components/Post/Skeleton";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPosts, fetchPosts, fetchTags, setPostItems } from "../redux/slices/posts";
import TabPanel from "../components/TabPanel";

export const Home = () => {
  const { posts, tags, popularPosts } = useSelector((state) => state.posts);
  const [activeTab, setActiveTab] = useState(0)
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth)
  const isTagsLoading = tags.status === 'loading' ? true : false

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchPopularPosts())
    dispatch(fetchTags())
  }, []);

  const handleTabChange = (e,value) => {
    setActiveTab(value)
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={activeTab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" {...a11yProps(0)}/>
        <Tab label="Популярные" {...a11yProps(1)}/>
      </Tabs>
      <Grid justifyContent="space-between" container spacing={0}>
        <TabPanel className='tab' value={activeTab} index={0}>
        <Grid item>
          {posts.status === "loading"
            ? [...new Array(4)].map((_) => <PostSkeleton />)
            : posts.items.map((post) => (
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
        </TabPanel>
        <TabPanel className='tab' value={activeTab} index={1}>
        <Grid item>
          {posts.status === "loading"
            ? [...new Array(4)].map((_) => <PostSkeleton />)
            : popularPosts.items.map((post) => (
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
        </TabPanel>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
