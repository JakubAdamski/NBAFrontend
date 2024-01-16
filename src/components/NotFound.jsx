import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (

<div className="white-container">
    <div className="card">
        <h2>404 - Nie znaleziono strony</h2>
        <p>Przepraszamy, strona, której szukasz, nie istnieje.</p>
        <p className="mt-3">
            Wróc do strony logowania <Link to="/">Logowanie</Link>
        </p>
    </div>
</div>
);

export default NotFound;
