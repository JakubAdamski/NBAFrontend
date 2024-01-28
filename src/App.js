import { Routes, Route } from 'react-router-dom';
import"../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Demo from './components/Demo';
import Login from './components/Login';
import Registration from './components/Registration';
import AddNews from './components/Addnews';
import GroupsView from './components/GroupsView';
import Navbar from './components/Navbar';
import Games from './components/Games'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './components/AuthContext';
import { useEffect } from 'react';
import { setupAxios } from './components/setupAxios';
import MUser from './components/MUser';
import Logout from './components/Logout';
import './App.css';

const queryClient = new QueryClient();

function App() {

  const {me,user} = useAuth();
    console.log(user)

  useEffect(() => {
      const token = localStorage.getItem("token");
      setupAxios(token);
      if (token) {
          me(token);
     }
  }, []);

  return (
       <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/rejestracja" element={<Registration />} />
          <Route path="/stronaglowna" element={<Demo />} />
          <Route path='/dodajnews' element={<AddNews/>} />
          <Route path='/mecze' element={<Games/>} />
          <Route path='/users' element={<MUser/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/grupy' element={<GroupsView/>} />
        </Routes>
        </div>
      </QueryClientProvider>
    );
}

export default App;
