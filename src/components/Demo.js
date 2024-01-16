import React, { Component } from 'react';

class Demo extends Component {
  state = {
    newsList: [],
    selectedNews: null
  };

  componentDidMount() {
    fetch('http://localhost:8080/news')
      .then(response => response.json())
      .then(data => this.setState({ newsList: data }));
  }

  selectNews = news => {
    this.setState({ selectedNews: news });
  };

  clearSelectedNews = () => {
    this.setState({ selectedNews: null });
  };

  render() {
    const { newsList, selectedNews } = this.state;

    return (
        <div>
          {selectedNews ? (
            <div className="news-details">
              <button onClick={this.clearSelectedNews}>← Powrót</button>
              <h2>{selectedNews.title}</h2>
              <p>{selectedNews.contents}</p>
              <p className="news-author">Autor: {selectedNews.author}</p>
            </div>
          ) : (
            <div className="news-list">
              {newsList.map(news => (
                <div key={news.id} className="news-item" onClick={() => this.selectNews(news)}>
                  <h3>{news.title}</h3>
                  <p className="news-author">Autor: {news.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  }

export default Demo;
