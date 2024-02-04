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
import MUser from './components/user/MUser';
import Logout from './components/Logout';
import './App.css';
import Groups from "./components/groups/./Groups";
import {Box, Container} from "@mantine/core";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUserByAdmin";
import EditUserByUser from "./components/user/EditUserByUser";

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
          <Box mx={'md'} mt={100}>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Demo />} />
          <Route path='/addnews' element={<AddNews/>} />
          <Route path='/games' element={<Games/>} />
          <Route path='/users' element={<MUser/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/group' element={<Groups/>} />
          <Route path='/adduser' element={<AddUser/>} />
          <Route path='/edituser/:id' element={<EditUser/>} />
          <Route path='/account' element={<EditUserByUser/>} />


        </Routes>
          </Box>
        </div>
      </QueryClientProvider>
    );
}

export default App;
