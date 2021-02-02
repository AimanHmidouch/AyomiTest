import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../Actions/userActions';

export default function SignIn(props) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signUp(username, email, password));
        props.history.push('/')
    }

    return (
        <div>
            <form className="form">
                <div>
                    <label htmlFor="userName">Username</label>
                    <input type="userName"
                        placeholder="Enter userName..."
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        placeholder="Enter email..."
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        placeholder="Enter password..."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    ></input>
                </div>
                <div>
                    <button type="submit"
                        onClick={submitHandler}
                    >Register</button>
                </div>
            </form>
        </div>
    )
}