import React, { useState } from 'react';
import { TextInput, PasswordInput, NumberInput, ColorInput, Button, Paper, Title, Box } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddUser() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [color, setColor] = useState('#000000');
    const navigate = useNavigate();

    async function save(event) {
        event.preventDefault();
        const token = localStorage.getItem('token'); // Pobranie tokena
        try {
            await axios.post('http://localhost:8080/admin/users', {
                firstname,
                lastname,
                nickname,
                email,
                password,
                age,
                color,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówków żądania
                }
            });
            alert('Użytkownik dodany pomyślnie');
            navigate('/users'); // Poprawiona ścieżka nawigacji
        } catch (error) {
            alert('Wystąpił błąd podczas dodawania użytkownika: ' + (error.response?.data?.message || ''));
            console.error(error);
        }
    }

    return (
        <Box sx={{ maxWidth: 500 }} mx="auto">
            <Paper padding="md" shadow="xs" withBorder>
                <Title order={1} align="center" mb="md">
                    Nowy użytkownik
                </Title>

                <form onSubmit={save}>
                    {/* Pola formularza */}
                    <TextInput label="Imię" placeholder="Imię" value={firstname} onChange={(event) => setFirstname(event.target.value)} required />
                    <TextInput label="Nazwisko" placeholder="Nazwisko" value={lastname} onChange={(event) => setLastname(event.target.value)} required />
                    <TextInput label="Nickname" placeholder="Nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} required />
                    <TextInput label="Email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    <PasswordInput label="Hasło" placeholder="Hasło" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    <NumberInput label="Wiek" placeholder="Wiek" value={age} onChange={(value) => setAge(value)} required />
                    <ColorInput label="Ulubiony kolor" value={color} onChange={(value) => setColor(value)} required />

                    <Button type="submit" fullWidth mt="lg" color="blue">
                        Dodaj użytkownika
                    </Button>

                    <Link to="/users" style={{ textDecoration: 'none' }}>
                        <Button fullWidth mt="lg" color="red">
                            Anuluj
                        </Button>
                    </Link>
                </form>
            </Paper>
        </Box>
    );
}
