import React from 'react';
import './ProfileScreen.css';
import Nav from './Nav';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import firebase from './Configure';
import PlansScreen from './PlansScreen';

function ProfileScreen() {

    const user = useSelector(selectUser);
  return (
    <div className='profileScreen'>
      <Nav />
      <div className="profileScreen-body">
        <h1>Edit Profile</h1>
        <div className="profileScreen-info">
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt=''
            />
            <div className="profileScreen-details">
                <h2>{user.email}</h2>
                <div className="profileScreen-plans">
                  <h3>Plans</h3>
                  <PlansScreen />
                  <button 
                    onClick={() => firebase.auth().signOut()}
                    className="profileScreen-signOut"
                  >
                    Sign Out
                  </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen;
