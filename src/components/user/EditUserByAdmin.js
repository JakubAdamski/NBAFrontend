import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextInput, NumberInput, ColorInput, Button, Paper, Title, Box, PasswordInput } from '@mantine/core';
import axios from 'axios';

const EditUserByAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        nickname: '',
        email: '',
        age: '',
        color: '',
        password: '', // Dodaj to pole, ale nie ustawiaj wartości na podstawie danych z API
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}`, {
                    headers: { Authorization: token },
                });
                const userData = response.data;
                if (userData.color === null) {
                    userData.color = '#ffffff'; // Przykładowa wartość domyślna
                }
                // Usuń hasło z danych użytkownika przed ustawieniem stanu
                delete userData.password;
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        fetchData();
    }, [id, token]);

    const onInputChange = (name, value) => {
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...user };
            if (!dataToSend.password) { // Jeśli hasło nie zostało zmienione, nie wysyłaj go
                delete dataToSend.password;
            }
            await axios.put(`http://localhost:8080/user/edit-by-admin?id=${id}`, dataToSend, {
                headers: { Authorization: token },
            });
            navigate('/users');
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    return (
        <Box sx={{ maxWidth: 500 }} mx="auto" mt="lg">
            <Paper padding="md" shadow="xs" withBorder>
                <Title order={2} align="center" m="md">
                    Edit User by Admin
                </Title>
                <form onSubmit={onSubmit}>
                    {/* Pola formularza */}
                    <TextInput label="Imię" value={user.firstname} onChange={(event) => onInputChange('firstname', event.target.value)} mt="md" />
                    <TextInput label="Nazwisko" value={user.lastname} onChange={(event) => onInputChange('lastname', event.target.value)} mt="md" />
                    <TextInput label="Nickname" value={user.nickname} onChange={(event) => onInputChange('nickname', event.target.value)} mt="md" />
                    <TextInput label="E-mail" value={user.email} onChange={(event) => onInputChange('email', event.target.value)} mt="md" />
                    <PasswordInput label="Nowe hasło (opcjonalne)" placeholder="Wpisz nowe hasło, aby je zmienić" value={user.password} onChange={(event) => onInputChange('password', event.target.value)} mt="md" />
                    <NumberInput label="Wiek" value={user.age} onChange={(value) => onInputChange('age', value)} mt="md" />
                    <ColorInput label="Ulubiony kolor" value={user.color} onChange={(value) => onInputChange('color', value)} mt="md" />

                    <Box mt="lg" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" color="blue" mr="md">
                            Zapisz
                        </Button>
                        <Button color="red" onClick={() => navigate('/users')}>
                            Anuluj
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default EditUserByAdmin;
