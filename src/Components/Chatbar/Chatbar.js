import React , { useState , useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoodIcon from '@mui/icons-material/Mood';
import MicIcon from '@mui/icons-material/Mic';
import {Avatar , IconButton } from '@mui/material';
import {useParams } from "react-router-dom";
import db from '../../FirebaseAuth';
import {collection, doc, orderBy,query,Timestamp,addDoc,getDoc,getDocs} from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import './Chatbar.css';

export  function Chatbar (){
  const [input,setInput] = useState("");
  const [start ,setStart]=useState('');
  const { roomId } =useParams();
  const [roomname ,setRoomName] =useState('');
  const [messages , setMessages] =useState([]);
  const [{ user }] = useStateValue();

  

  useEffect(() => {

    if(roomId){
      getDoc(doc(db, "rooms", roomId)).then(docData => { 
            setRoomName(docData.data().name)
          }
      )
      
       getDocs( query(collection(db, `rooms/${roomId}/messages`), orderBy("timestamp", "asc")))
       .then(snap =>{
        setMessages(snap.docs.map((doc) => doc.data()))
        })
     
    }
  }, [roomId]);

   

  useEffect(()=>{
    setStart(Math.floor(Math.random() * 1000));
  },[])



  const sendMessage = (e) => {
    e.preventDefault();

    const colRef = collection(db, `rooms/${roomId}/messages`);
    addDoc(colRef, {
      message: input,
      name: user.displayName,
      timestamp: Timestamp.now()
    });

    setInput("");
    
    getDocs( query(collection(db, `rooms/${roomId}/messages`), orderBy("timestamp", "asc")))
    .then(snap =>{
     setMessages(snap.docs.map((doc) => doc.data()))
     })

  }

  return (
    <div className='chat'>
        <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/${start}.svg`}/>
            <div className="chat_info">
                <h2>{roomname}</h2>
                <p>
                  Last seen {" "}
                  {new Date( messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                </p>
            </div>
            <div className="chat_right">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>  
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>  
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton> 
            </div>
        </div>
        <div className="chat_body">

          {
              messages.map(data =>(
              <p className={`chat_msg ${user.displayName === data.name && "chat_receiver"}`} > 
             
                  <span className="chat_personName" >{data.name}</span> 
                  {data.message}
                  <span className="chat_TimeStamp">{new Date(data.timestamp?.toDate()).toUTCString()}</span>    
             </p>
            ))
            
            }
            
        </div>
        <div className="chat_footer">
                  <IconButton>
                     <MoodIcon />
                  </IconButton>
                  <form>
                    <input value={input} onChange={ (e)=> setInput(e.target.value)} type="text" placeholder='text a message'/>
                    <button onClick={sendMessage} type="submit">Type a Message</button>
                  </form>
                  <IconButton>
                      <MicIcon />
                  </IconButton>
        </div>
        
    </div>
  );
}
