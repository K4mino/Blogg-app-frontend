import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import axios from '../../axios'
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

export const AddPost = () => {
  const { id } = useParams()
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const inputFileRef = useRef(null);

  const isEditing = Boolean(id)

  const handleChangeFile = async(event) => {
    try {
        const formData = new FormData()
        const file = event.target.files[0]
        formData.append('image',file)
        const { data } = await axios.post('/upload',formData)
        setImageUrl(data.url)
    } catch (error) {
        console.log(error)
        alert('Ошибка при загрузке')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(null)
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const handleCreatePost = async() => {
    try {
      const post = {
        title,
        text,
        tags: tags.split(','),
        imageUrl
      }
  
     const { data } = isEditing ? await axios.patch(`/posts/${ id }`,post) : await axios.post('/posts',post)

     const _id = isEditing ? id : data._id
     navigate(`/posts/${_id}`)
    } catch (error) {
      console.log(error)
      alert('Ошибка при создании поста')
    }
  }

  useEffect(() => {
    if(id){
      axios.get(`http://localhost:8081/posts/${id}`)
      .then(({data}) => {
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data?.imageUrl)
        setTags(data.tags.join(','))
      })
      .catch((err) => console.log(err))
    }
  }, [])


  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:8081${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        value={title}
        variant="standard"
        placeholder="Заголовок статьи..."
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        value={tags}
        variant="standard"
        placeholder="Тэги"
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={handleCreatePost}>
          { isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
