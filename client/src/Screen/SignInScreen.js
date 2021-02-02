import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signIn, userDetails } from '../Actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SignIn(props) {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { token, loading, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signIn(userName, password));
        props.history.push('/profile')
    }

    // useEffect(() => {
    //     if (token) {
    //         props.history.push('/profile')
    //     }
    // }, [token, props.history])


    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (<></>)
            }
            <form className="form">
                <div>
                    <label htmlFor="userName">Username</label>
                    <input type="userName"
                        placeholder="Enter userName..."
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
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
                    >Login</button>
                </div>
            </form>
        </div>
    )
}
