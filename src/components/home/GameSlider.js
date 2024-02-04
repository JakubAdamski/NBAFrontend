import React, { useState, useEffect } from 'react';
import '../../App.css';

import axios from 'axios';
import {setupAxios} from "../setupAxios";
import {useAuth} from "../AuthContext";
import {Carousel} from "@mantine/carousel";
import {ActionIcon, Card, Group, SimpleGrid} from "@mantine/core";
import {TbArrowBigLeftFilled, TbArrowBigRightFilled} from "react-icons/tb";

export const GameSlider = () => {
    const [games, setGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { token } = useAuth(); // Pobieranie tokenu autoryzacyjnego z kontekstu autoryzacji

    // Wywołanie funkcji setupAxios z tokenem autoryzacyjnym
    useEffect(() => {
        setupAxios(token);

        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/games');
                setGames(response.data.content); // Użyj setGames() do aktualizacji stanu gier
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, [token]); // Dodaj token do zależności useEffect

    const visibleGames = games.slice(currentIndex, currentIndex + 3);

    const showNextGames = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 2, games.length - 5));
    };

    const showPreviousGames = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 2, 0));
    };

    // return (
    //     <div className="games-display-container">
    //         <button className="scroll-button left" onClick={showPreviousGames} disabled={currentIndex === 0}>{"<"}</button>
    //         <div className="games-scroll-container">
    //             {visibleGames.map((game) => (
    //                 <div key={game.id} className="game-card">
    //                     <div className="game-time">{game.gameDate}</div>
    //                     <div className="team">
    //                         <img src={game.visitorTeamLogoUrl} alt={game.visitorTeamName} />
    //                         <span>{game.visitorTeamPoints}</span>
    //                         <span>{game.homeTeamPoints}</span>
    //                         <img src={game.homeTeamLogoUrl} alt={game.homeTeamName} />
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //         <button className="scroll-button right" onClick={showNextGames} disabled={currentIndex + 5 >= games.length}>{">"}</button>
    //     </div>
    // );
    return <Group position={'center'} align={'center'} >
        <ActionIcon variant={'outline'} onClick={showPreviousGames}>
            <TbArrowBigLeftFilled />
        </ActionIcon>
        <SimpleGrid cols={3}>
            {visibleGames.map((game) => (
                <Card key={game.id} shadow={'md'} radius={'lg'}>
                    <div className="game-time">{game.gameDate}</div>
                    <div className="team">
                        <img src={game.visitorTeamLogoUrl} alt={game.visitorTeamName} />
                        <span>{game.visitorTeamPoints}</span>
                        <span>-</span>
                        <span>{game.homeTeamPoints}</span>
                        <img src={game.homeTeamLogoUrl} alt={game.homeTeamName} />
                    </div>
                </Card>
            ))}
        </SimpleGrid>
        <ActionIcon variant={'outline'} onClick={showNextGames}>
            <TbArrowBigRightFilled />
        </ActionIcon>
    </Group>

}