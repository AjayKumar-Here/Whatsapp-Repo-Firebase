import React from 'react';
import { Button } from '@mui/material';
import './Login.css';
import {auth , provider } from '../../FirebaseAuth';
import {signInWithPopup } from 'firebase/auth';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../Reducer';

const Login = () => {
  // eslint-disable-next-line
  const [{},dispatch] = useStateValue();

  const signin = ()=>{
    signInWithPopup(auth ,provider)
    .then((result) =>{
      dispatch({
          type: actionTypes.SET_USER,
          user : result.user,
      });
    })
    .catch((err) => alert(err.message) );
  };

  return (
    <div className='login'>
       <div className="login_con">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoEqjbUvklsfMJ17-jLOi4tY8KY8HPcyea0Q&usqp=CAU" alt="" />
           
           <div className="login_text">
                <h2>Sign in To Whatsapp</h2>
           </div>
              <Button onClick={signin}>
                   Sign in With Google
              </Button>
       </div>
    </div>
  );
};

export default Login;