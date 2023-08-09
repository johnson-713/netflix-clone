import React, { useRef } from 'react';
import './SignInScreen.css';
// import auth from './Configure';
import firebase from './Configure';

function SignInScreen() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value,
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value,
    )
    .then((authUser) => {
      console.log(authUser);
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div className='signInScreen'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder='Email' type='email'/>
        <input ref={passwordRef} placeholder='password' type='password' />
        <button type='submit' onClick={signIn}>Sign In</button>

        <h4>
          <span className='signInScreen-gray'>New to Netflix?</span>
          <span className='signInScreen-link' onClick={register}>Sign Up now.</span>
        </h4>
      </form>
    </div>
  )
}

export default SignInScreen;
