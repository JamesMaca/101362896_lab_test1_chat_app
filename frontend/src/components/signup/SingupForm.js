import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function SingupForm() {
    const [newUser, setNewUser] = useState(
        {
            username: "",
            firstname: "",
            lastname: "",
            password: ""
        }
    )
    
    const creatNewUser = (e) => {
        const {id, value} = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }))
    }

    const addNewUser = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4040/signup', newUser); // Ensure correct server URL
            if (response.status === 201) {
                window.location.href = '/';
            } else {
                console.error('Error signing up: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error signing up: ' + error);
        }
    }

    return (
        <div className='signup-container'>
            <h1>Sign Up</h1>
            <form onSubmit={addNewUser}>
                <div className='form-group'>
                    <input type="text" id="username" placeholder="Username" onChange={creatNewUser}/>
                </div>
                <br />
                <div className='form-group'>
                    <input type="text" id="firstname" placeholder="Fist Name" onChange={creatNewUser}/>
                </div>
                <br />
                <div className='form-group'>
                    <input type="text" id="lastname" placeholder="Last Name" onChange={creatNewUser}/>
                </div>
                <br />
                <div className='form-group'>
                    <input type="text" id="password" placeholder="Password" onChange={creatNewUser}/>
                </div>
                <br />
                <div className='form-group'>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    );
}