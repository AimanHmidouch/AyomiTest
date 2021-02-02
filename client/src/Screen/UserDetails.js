import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signOut, userDetails, update } from '../Actions/userActions';


export default function UserDetails(props) {
    const dispatch = useDispatch();
    const [myProfile, setMyProfile] = useState({ email: '', first_name: '', last_name: '' });
    const [editMode, setEditMode] = useState(false);

    const userSignin = useSelector(state => state.userSignin);
    const profile = useSelector(state => state.userDetails);
    const { user, loading, error } = profile;
    const { username } = userSignin
    const { email, first_name, last_name } = myProfile

    const [inputUsername, setInputUsername] = useState(username)
    const [inputEmail, setInputEmail] = useState(email)
    const [inputFirst, setInputFirst] = useState(first_name)
    const [inputLast, setInputLast] = useState(last_name)


    const logout = (e) => {
        dispatch(signOut());
        props.history.push('/');
    }
    const onSubmit = () => {
        dispatch(update(inputUsername, inputEmail, inputFirst, inputLast))
    }

    const onCancel = () => {
        setEditMode(false)
        setInputUsername(username)
        setInputEmail(email)
        setInputFirst(first_name)
        setInputLast(last_name)
    }
    useEffect(() => {
        dispatch(userDetails(username))
    }, [username])

    useEffect(() => {
        if (user) {
            setMyProfile(user)
            setInputUsername(username)
            setInputEmail(email)
            setInputFirst(first_name)
            setInputLast(last_name)
        }
    }, [user, username, email, first_name, last_name])
    return (
        <div>
            <h1>User</h1>
            <form className="form">
                <div>
                    <label htmlFor="userName">Username</label>
                    <input type="text"
                        placeholder="Enter userName..."
                        value={inputUsername}
                        required
                        disabled={!editMode}
                        onChange={(e) => setInputUsername(e.target.value)}
                    ></input>
                </div>
                {
                    email && <div>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            placeholder="Enter email..."
                            value={inputEmail}
                            required
                            disabled={!editMode}
                            onChange={(e) => setInputEmail(e.target.value)}
                        ></input>
                    </div>
                }

                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        placeholder="Enter First Name..."
                        value={inputFirst}
                        required
                        disabled={!editMode}
                        onChange={(e) => setInputFirst(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        placeholder="Enter Last Name..."
                        value={inputLast}
                        required
                        disabled={!editMode}
                        onChange={(e) => setInputLast(e.target.value)}
                    ></input>
                </div>
                {editMode ? <div>
                    <button type="button"
                        onClick={onCancel}
                    >Cancel</button>
                    <button type="submit"
                        onClick={onSubmit}
                    >Update</button>
                </div> : <div>
                        <button type="button"
                            onClick={() => setEditMode(true)}
                        >Edit Profile</button>
                    </div>}

            </form>
            <button type="button" onClick={logout}>Log Out</button>
        </div>
    )
}
