import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../App.css"; // Załóżmy, że ten import jest już w miejscu

function AddNews() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/addnews", {
        title,
        contents,
        author,
      });
      alert("News został dodany pomyślnie.");
      navigate('/'); // Przekierowanie do strony głównej lub listy newsów
    } catch (error) {
      alert("Wystąpił błąd podczas dodawania newsa.");
      console.error(error);
    }
  }

  return (
    <div className="add-news-container">
      <div className="news-card">
        <h1>Dodaj News</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control news-input"
            id="title"
            placeholder="Tytuł"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control news-textarea"
            id="contents"
            placeholder="Treść newsa"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
          <input
            type="text"
            className="form-control news-input"
            id="author"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit" className="btn btn-primary news-submit">
            Dodaj
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNews;
