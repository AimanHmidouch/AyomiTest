import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  signUp } from '../Actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SignIn(props) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password2, setPassword2] = useState('');

    const userSignup = useSelector(state => state.userSignup);
    const { token, loading, error } = userSignup;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signUp(username, email, password, password2));
        
    }
    
    useEffect(() => {
        if(token){
            props.history.push('/user');
        }
    }, [props.history, token])

    return (
        <div>
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : ( <></>)
            }
            <form className="form">
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="username" 
                            placeholder="Enter username..."
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
                    <label htmlFor="password">Confirm password</label>
                    <input type="password" 
                            placeholder="Retype password..."
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2}
                            required    
                    ></input> 
                </div>
                <div>
                    <button type="submit"
                            onClick={submitHandler}
                    >Sign Up</button> 
                </div>     
            </form>
        </div>
    )
}
