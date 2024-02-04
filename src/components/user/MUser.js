import React, { useEffect, useState } from 'react';
import {Table, Button, Col, Grid} from '@mantine/core';
import axios from 'axios';
import '../../App.css';
import {Link, useParams} from "react-router-dom";

export default function MUser() {
    const [users, setUsers] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8080/users");
            setUsers(result.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
    }

    const rows = users.map((user, index) => (
        <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.nickname}</td>
            <td>{user.email}</td>
            <td>
                <Link to={`/edituser/${user.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color="blue" size="md" style={{ marginRight: 8 }}>Edytuj</Button>
                </Link>
                <Button
                    variant="outline"
                    color="red"
                    size="md"
                    style={{ marginRight: 8 }}
                    onClick={() => deleteUser(user.id)} // Poprawione: użyj user.id zamiast id
                >
                    Usuń
                </Button>
            </td>
        </tr>
    ));

    return (
        <Grid style={{ height: '50vh'}} align="center" justify="center">
            <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                <Table striped highlightOnHover fontSize="lg">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Nickname</th>
                        <th>Email</th>
                        <th>Dodatkowe Funkcje</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Col>
            <Link to="/adduser" style={{ textDecoration: 'none' }}>
                <Button variant="outline" color="blue" size="md">
                    Nowy użytkownik
                </Button>
            </Link>
        </Grid>

);
}
