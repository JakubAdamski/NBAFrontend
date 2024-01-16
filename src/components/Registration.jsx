import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate, Link } from 'react-router-dom';

function Registration() {
   const [firstname, setFirstname] = useState("");
   const [lastname, setLastname] = useState("");
   const [nickname, setNickname] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [age, setAge] = useState("");
   const navigate = useNavigate();

   async function save(event) {
      event.preventDefault();
      try {
         await axios.post("http://localhost:8080/api/v1/aut/rejestracja", {
            firstname: firstname,
            lastname: lastname,
            nickname: nickname,
            email: email,
            password: password,
            age: age,
         });
         alert("Użytkownik zarejestrowany pomyślnie");
         navigate('/')
      } catch (error) {
         alert("Wystąpił błąd podczas rejestracji");
         console.error(error);
      }
   }

   return (
      <div className="white-container">
         <div className="card">
            <h1>Rejestracja</h1>

            <form>
               <div className="form-group">
                  <input
                     type="text"
                     className="form-control"
                     id="firstname"
                     placeholder="Imię"
                     value={firstname}
                     onChange={(event) => {
                        setFirstname(event.target.value);
                     }}
                  />
               </div>
               <div className="form-group">
                  <input
                     type="text"
                     className="form-control"
                     id="lastname"
                     placeholder="Nazwisko"
                     value={lastname}
                     onChange={(event) => {
                        setLastname(event.target.value);
                     }}
                  />
               </div>

               <div className="form-group">
                  <input
                     type="text"
                     className="form-control"
                     id="nickname"
                     placeholder="Nickname"
                     value={nickname}
                     onChange={(event) => {
                        setNickname(event.target.value);
                     }}
                  />
               </div>

               <div className="form-group">
                  <input
                     type="email"
                     className="form-control"
                     id="email"
                     placeholder="Email"
                     value={email}
                     onChange={(event) => {
                        setEmail(event.target.value);
                     }}
                  />
               </div>

               <div className="form-group">
                  <input
                     type="password"
                     className="form-control"
                     id="password"
                     placeholder="Hasło"
                     value={password}
                     onChange={(event) => {
                        setPassword(event.target.value);
                     }}
                  />
               </div>

               <div className="form-group">
                  <input
                     type="number"
                     className="form-control"
                     id="age"
                     placeholder="Wiek"
                     value={age}
                     onChange={(event) => {
                        setAge(event.target.value);
                     }}
                  />
               </div>

               <button
                  type="submit"
                  className="btn btn-primary mt-4"
                  onClick={save}
               >
                  Zarejestruj
               </button>
               <p className="mt-3">
                  Wróć do <Link to="/">Logowania</Link>
               </p>
            </form>
         </div>
      </div>
   );
}

export default Registration;
