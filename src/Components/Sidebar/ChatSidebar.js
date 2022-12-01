import React ,{useEffect,useState} from 'react';
import {Avatar} from '@mui/material';
import './ChatSidebar.css';
import db from '../../FirebaseAuth'; 
import {Link } from "react-router-dom";
import {collection, orderBy,query,getDocs,addDoc} from "firebase/firestore";

export const ChatSidebar = ({id,name,addNewChat}) => {
  
  const [start ,setStart]=useState('');
  const [messages , setMessages] =useState([]);

  useEffect(() => {

    if(id){
       getDocs( query(collection(db, `rooms/${id}/messages`), orderBy("timestamp", "desc")))
       .then(snap =>{
        setMessages(snap.docs.map((doc) => doc.data()))
        })
    }
     
  }, [id]);

  useEffect(()=>{
    setStart(Math.floor(Math.random() * 1000));
  },[])

  const createMembers =()=>{
    const Roomname=prompt("Enter to Add a Members");

    if(Roomname){
      addDoc(collection(db,"rooms") ,{
          name:Roomname
        }).then(()=>{
          console.log("data submitted successfully");
        }).catch(err => console.log(err))
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
          <div  className='chatSidebar'>
          <Avatar src={`https://avatars.dicebear.com/api/avataaars/${start}.svg`} />
          <div className="chatinfo">
              <h2>{name}</h2>
              <p>{messages[0]?.message}</p>
          </div>
          
        </div>
    </Link>
    
  ) : (
    <div onClick={createMembers} className='chatSidebar'>
        <h2 >Add New Members</h2>
    </div>
  );

}
