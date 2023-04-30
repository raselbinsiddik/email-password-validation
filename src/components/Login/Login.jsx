import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const auth = getAuth(app)


const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef()

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('');
        setSuccess('');
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please add at least one uppercase');
            return;
        }
        else if (!/(?=.*[!@#$&*])/) {
            setError('please add at leasta  two simble')
        }
        else if (password.length < 6) {
            setError('please add at list 6 charaters')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                if (!loggedUser.emailVerified) {
                    
                }
                setSuccess('user login success')
                setError('')
            })
            .catch(error => {
                setError(error.message);
            });
        
    }
    handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please provide your email address to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
            alert('please check your email')
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
        })
    }
   
    return (
        <div className='w-25 mx-auto'>
            <h1>please login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">email address</label>
                    <input type="text" className="form-control" ref={emailRef} name="email" id="username" placeholder="Enter username" required />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="form-control" id="password" placeholder="Enter password"required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>forget password? please <button onClick={handleResetPassword} className='btn btn-link'>Reset password</button></small></p>
            <p><small>new to this ? please
             <Link to="/register">Register</Link>
            </small></p>
            <p className='text-denger'>{success}</p>
            <p className='text-success'>{ error}</p>
        </div>
    );
};

export default Login;