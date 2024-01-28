import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

export default function MUser (){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    };

    return(
        <div className="user-container">
        <div className="manage-user-container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Imię</th>
                            <th scope="col">Nazwisko</th>
                            <th scope="col">Email</th>
                            <th scope="col">Akcja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>
                                    <a className="btn btn-primary mr-2">Edytuj</a>
                                    <a className="btn btn-danger">Usuń</a>
                                    <a className="btn btn-success">Szczegóły</a>
                                </td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
    
}