import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Demo from './components/Demo';
import Login from './components/Login';
import Registration from './components/Registration';
import AddNews from './components/Addnews';
import Navbar from './components/Navbar';
import Games from './components/Games'


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
        {/*<Navbar />*/}
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/rejestracja" element={<Registration />} />
          <Route path="/stronaglowna" element={<Demo />} />
          <Route path='/dodajnews' element={<AddNews/>} />
          <Route path='/mecze' element={<Games/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
