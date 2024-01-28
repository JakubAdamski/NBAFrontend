import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import '../App.css';
import { GameSlider } from './home/GameSlider';
import {Card, SimpleGrid, Stack} from "@mantine/core";
const fetchNews = async () => {
  try {
    const result = await axios.get('http://localhost:8080/news');
    return result.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const Demo = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await fetchNews();
      setNewsList(newsData);
    };
    fetchData();
  }, []);

  const selectNews = (news) => {
    setSelectedNews(news);
    setIsOpen(true);
  };

  const clearSelectedNews = () => {
    setSelectedNews(null);
    setIsOpen(false);
  };

  return (
    <div className="app-container">
     <Stack>
       <GameSlider/>
       <AnimatePresence>
         {isOpen && (
             <motion.div
                 className="overlay"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 style={{
                   position: 'fixed',
                   top: 0,
                   left: 0,
                   right: 0,
                   bottom: 0,
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   background: 'rgba(0, 0, 0, 0.3)',
                   zIndex: 10
                 }}
                 onClick={clearSelectedNews}
             >
               <motion.div
                   className="news-details"
                   initial={{ y: '-100vh' }}
                   animate={{ y: 0 }}
                   exit={{ y: '-100vh' }}
                   transition={{ type: 'spring', stiffness: 100 }}
                   style={{
                     width: '50%', // Ustaw szerokość na połowę ekranu
                     maxWidth: '640px', // Maksymalna szerokość okna treści
                     maxHeight: '80vh', // Maksymalna wysokość okna szczegółów
                     overflowY: 'auto', // Dodajemy przewijanie
                     padding: '2rem',
                     borderRadius: '1rem',
                     backgroundColor: 'white',
                     boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
                     position: 'relative'
                   }}
                   onClick={(e) => e.stopPropagation()}
               >
                 <motion.button
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     style={{
                       border: 'none',
                       outline: 'none',
                       borderRadius: '20px',
                       padding: '10px 15px',
                       margin: '0 0 20px 0',
                       background: '#17408B',
                       color: 'white',
                       cursor: 'pointer',
                       boxShadow: '0px 2px 10px rgba(0,0,0,0.1)'
                     }}
                     onClick={clearSelectedNews}
                 >
                   Zamknij
                 </motion.button>
                 <h2>{selectedNews.title}</h2>
                 <p>{selectedNews.contents}</p>
                 <p className="news-author">Autor: {selectedNews.author}</p>
               </motion.div>
             </motion.div>
         )}
       </AnimatePresence>
       <SimpleGrid cols={3} spacing={'xs'}>
         {newsList.map(news => (
             <motion.div
                 key={news.id}
                 layout
                 initial={{ opacity: 0.5 }}
                 animate={{ opacity: 1 }}
                 // whileHover={{ scale: 1.03, backgroundColor: "#17408B" }}
                 onClick={() => selectNews(news)}
                 style={{height:'100%', cursor:'pointer'}}
             >
               <Card shadow={'md'} h={'100%'} radius={'lg'} >
                 <Stack justify={'space-between'}h={'100%'}>
                   <h3>{news.title}</h3>

                    <p>Autor: {news.author}</p>
                 </Stack>
               </Card>
             </motion.div>
         ))}
       </SimpleGrid>
     </Stack>
    </div>
  );
};

export default Demo;
