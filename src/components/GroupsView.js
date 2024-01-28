import React, { Component } from 'react';
import axios from 'axios';
import './GroupsView.css';

class GroupsView extends Component {
  state = {
    groups: [],
    posts: [],
    newPostContent: '',
    selectedGroupId: '' // zmieniono na string, aby obsłużyć wartość początkową selecta
  };

  componentDidMount() {
    this.fetchGroups();
    this.fetchPosts();
  }

  fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8080/associations'); // Dostosuj URL do twojego API
      this.setState({ groups: response.data });
    } catch (error) {
      console.error("Błąd podczas pobierania grup:", error);
    }
  };

  fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/posts'); // Dostosuj URL do twojego API
      this.setState({ posts: response.data });
    } catch (error) {
      console.error("Błąd podczas pobierania postów:", error);
    }
  };

  handleGroupSelect = (groupId) => {
    this.setState({ selectedGroupId: groupId });
  };

  handlePostContentChange = (event) => {
    this.setState({ newPostContent: event.target.value });
  };

  handleGroupChange = (event) => {
    this.setState({ selectedGroupId: event.target.value });
  };

  addPost = async () => {
    const { newPostContent, selectedGroupId } = this.state;
    if (!newPostContent.trim() || !selectedGroupId) {
      alert('Proszę wybrać grupę i wpisać treść posta.');
      return;
    }
  
    try {
      const postBody = {
        associationId: selectedGroupId,
        content: newPostContent
      };
  
      const response = await axios.post('http://localhost:8080/addpost', postBody);
  
      // Jeśli API zwraca status sukcesu, odśwież listę postów
      if (response.status === 200 || response.status === 201) {
        this.fetchPosts(); // Ponownie pobieranie postów
        this.setState({ newPostContent: '' }); // Resetowanie treści posta
      }
    } catch (error) {
      console.error("Błąd podczas dodawania posta:", error.response || error);
    }
  };
  

  render() {
    const { groups, posts, newPostContent, selectedGroupId } = this.state;
  
    // Filtrowanie postów na podstawie wybranej grupy
    const filteredPosts = posts.filter(post => post.association.associationId === selectedGroupId);
  
    return (
      <div className="groups-view">
        <div className="main-content">
          <div className="groups-section">
            {groups.map(group => (
              <div 
                key={group.id} 
                className={`group ${selectedGroupId === group.id ? 'selected' : ''}`}
                onClick={() => this.handleGroupSelect(group.id)}
              >
                <p>{group.name}</p>
              </div>
            ))}
          </div>
  
          <div className="posts-display-section">
            {filteredPosts.map(post => (
              <div key={post.id} className="post">
                <p>Autor: {post.user.nickname}</p>
                <h3>{post.content}</h3>
                <p>Data: {new Date(post.data).toLocaleString()}</p>
              </div>
            ))}
          </div>
  
          <div className="create-post-section">
            <textarea
              value={newPostContent}
              onChange={this.handlePostContentChange}
              placeholder="Miejsce do pisania"
            />
            <button onClick={this.addPost}>Dodaj post</button>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupsView;
