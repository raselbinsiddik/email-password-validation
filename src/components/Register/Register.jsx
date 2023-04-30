import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app)
const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] =useState('')
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');
        const email = (event.target.email.value);
        const password = (event.target.password.value);
        const name = event.target.name.value;
        
        
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please add at least one uppecase password');
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('please add at least tow numbers');
        }
        else if (password.length<6) {
            setError('please add at list 6 charaters')
            return;
        }
        createUserWithEmailAndPassword(auth,email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                setError('');
                event.target.reset();
                setSuccess('user has been success');
                sendVarificationEmail(result.user)
               updateUserData(result.user,name)
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
               
        })
    }
    const sendVarificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('please verify your email address')
        })
    }

    const updateUserData = () => {
        updateProfile(user, {
            displayName:name
        })
            .then(() => {
            console.log('user name update')
            })
            .catch(error => {
            setError(error.message)
        })
    }
    const handleEmailChange = (event) => {
          console.log(event.target.value)
    }
    const handlePassword = (event) => {
        console.log(event.target.value)
    }
    return (
        <div className='w-50 mx-auto'>
            <h3>please register</h3>
            <form onSubmit={handleSubmit} >
                <input className='w-50 mb-4' 
                    type="text" name="name" id="name" placeholder='Your name' required /><br />
                
                <input className='w-50 mb-4' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your email' required /><br />

                <input className='w-50 mb-4' onBlur={handlePassword} type="password" name="password" id="password" placeholder='Your password' required /><br />
                
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already you an account? please <Link to="/login">Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-primary'>{ success}</p>
        </div>
    );
};

export default Register;