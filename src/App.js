import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Routes, Route} from 'react-router-dom'
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, ActiveTag } from "./pages";
import { fetchMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    dispatch(fetchMe())
  },[])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<FullPost/>} path='/posts/:id'/>
          <Route element={<Login/>} path='/login'/>
          <Route element={<Registration/>} path='/register'/>
          <Route element={<ActiveTag/>} path='/posts/bytag/:tag'/>
          <Route element={<AddPost/>} path='/posts/create'/>
          <Route element={<AddPost/>} path='/posts/edit/:id'/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
