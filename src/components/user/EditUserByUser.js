import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, NumberInput, ColorInput, Button, Paper, Title, Box, PasswordInput } from '@mantine/core';
import axios from 'axios';

const EditUserByUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        nickname: '',
        email: '',
        age: '',
        color: '',
        newPassword: '',
        currentPassword: '',
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/edit-by-user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser({ ...response.data, newPassword: '', currentPassword: '' });
            } catch (error) {
                console.error("Failed to fetch user account", error);
            }
        };

        fetchData();
    }, [token]);

    const onInputChange = (name, value) => {
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // Struktura danych do wysłania, wykluczamy currentPassword z danych do wysłania, ale użyjemy go do weryfikacji
        const { currentPassword, newPassword, ...dataToUpdate } = user;
        try {
            // Wysyłamy zarówno dane do aktualizacji jak i obecne hasło do weryfikacji
            await axios.put(`http://localhost:8080/user/edit-by-user`, { ...dataToUpdate, newPassword, currentPassword }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/account'); // Przekierowanie do profilu użytkownika
        } catch (error) {
            console.error("Failed to update user account", error);
        }
    };

    return (
        <Box sx={{ maxWidth: 500 }} mx="auto" mt="lg">
            <Paper padding="md" shadow="xs" withBorder>
                <Title order={2} align="center" m="md">
                    Edytuj swoje konto
                </Title>
                <form onSubmit={onSubmit}>
                    <TextInput label="Imię" value={user.firstname} onChange={(event) => onInputChange('firstname', event.target.value)} mt="md" />
                    <TextInput label="Nazwisko" value={user.lastname} onChange={(event) => onInputChange('lastname', event.target.value)} mt="md" />
                    <TextInput label="Nickname" value={user.nickname} onChange={(event) => onInputChange('nickname', event.target.value)} mt="md" />
                    <TextInput label="E-mail" value={user.email} onChange={(event) => onInputChange('email', event.target.value)} mt="md" />
                    <NumberInput label="Wiek" value={user.age} onChange={(value) => onInputChange('age', value)} mt="md" />
                    <ColorInput label="Ulubiony kolor" value={user.color} onChange={(value) => onInputChange('color', value)} mt="md" />
                    <PasswordInput label="Aktualne hasło (do potwierdzenia zmian)" placeholder="Wpisz aktualne hasło" value={user.currentPassword} onChange={(event) => onInputChange('currentPassword', event.target.value)} mt="md" />
                    <PasswordInput label="Nowe hasło (opcjonalne)" placeholder="Wpisz nowe hasło, jeśli chcesz je zmienić" value={user.newPassword} onChange={(event) => onInputChange('newPassword', event.target.value)} mt="md" />

                    <Box mt="lg" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" color="blue" mr="md">
                            Zapisz zmiany
                        </Button>
                        <Button color="red" onClick={() => navigate('/account')}>
                            Anuluj
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default EditUserByUser;
