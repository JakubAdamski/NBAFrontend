import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { login } = useAuth(); 
   const navigate = useNavigate();

   async function loginHandler(event) {
      event.preventDefault();
      try {
         const response = await axios.post('http://localhost:8080/api/v1/aut/logowanie', {
            email: email,
            password: password,
         });

         console.log(response.data);

         if (response.data.token) {
            login(response.data.token); 
            navigate('/stronaglowna'); 
         } else {
            alert('Nieprawidłowy token lub brak tokenu w odpowiedzi');
         }
      } catch (err) {
         alert('Wystąpił błąd podczas logowania');
         console.error(err);
      }
   }

   return (
      <div className="white-container">
         <div className="login-form">
            <h2 className="text-center">Logowanie</h2>
            <form onSubmit={loginHandler}>
               <div className="form-group mb-3">
                  <input
                     type="email"
                     className="form-control"
                     id="email"
                     placeholder="Email"
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                  />
               </div>

               <div className="form-group mb-3">
                  <input
                     type="password"
                     className="form-control"
                     id="password"
                     placeholder="Hasło"
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                  />
               </div>

               <button type="submit" className="btn btn-primary mt-3">
                  Zaloguj
               </button>

               <p className="mt-3">
                  Nie masz konta? <Link to="/rejestracja">Zarejestruj się</Link>
               </p>
            </form>
         </div>
      </div>
   );
}

export default Login;
