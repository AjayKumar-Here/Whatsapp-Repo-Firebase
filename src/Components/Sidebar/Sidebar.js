import React ,{useState , useEffect} from 'react';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {Avatar , IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import './Sidebar.css';
import { ChatSidebar } from './ChatSidebar';
import db from '../../FirebaseAuth';
import { collection,getDocs  } from "firebase/firestore"; 
import { useStateValue } from '../StateProvider';

export const Sidebar = () => {

  const [rooms , setRooms] = useState([]);
  const [{ user }] = useStateValue();


  useEffect(() => {
    getDocs(collection(db,"rooms")).then((snapshot)=>
     setRooms( snapshot.docs.map((doc)=> ({
      id : doc.id,
      data : doc.data(),
     }))
     ))
  }, [])


  
  return (
    <div className='sidebar'>
        <div className="header">
                  <Avatar 
                     src={user.photoURL} 
                  />
                  <h2>{user.displayName}</h2>
              <div className="headerRight">
                  <IconButton>
                    <DonutLargeIcon />
                  </IconButton>  
                  <IconButton>
                    <ChatIcon />
                  </IconButton>  
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>  
              </div>
        </div>
        <div className="searchbar">
           <div className="searchContainer">
              <SearchIcon />
              <input type="search" placeholder='Search or New chat start' />
           </div>
        </div>
        <div className="sidebar_chat">
           <ChatSidebar addNewChat/>
           {rooms.map(room =>(
                <ChatSidebar id={room.id} name={room.data.name}/>
           ))}
         
        </div>
    </div>
  )
}
