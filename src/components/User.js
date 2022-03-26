import React, { useContext, useEffect, useState} from "react";
import { db } from "../firebase";
import { onSnapshot, doc} from "firebase/firestore";
import OnlineStatus from "./svg/OnlineStatus";
import ListGroup from "react-bootstrap/ListGroup";
import Img from "./icons/user.png";
import NewMessage from "./svg/NewMessage";
import { AuthContext } from "./context/auth";


const User = ({ user1, user, selectUser, chat }) => {
  const { theme } = useContext(AuthContext);
  const user2 = user.uid;
  const [data, setData] = useState("");
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMessages", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
    
  },[user1, user2]);
 
  const renderInboxPeek = () =>{
      const message = data.text;
      if (message.length > 10){
          return message.substring(0,10);
      }
      else return message;
  }
  return (
    <ListGroup.Item style={{backgroundColor:`${theme.background2}`}}
      className= {chat.uid === user.uid ? "selected-user" : null}
      onClick={() => selectUser(user)}
    >
      <img alt="avatar" src={user.avatar || Img}></img>
      <label style={{color:`${theme.text}`}} className="mx-2">{user.name}</label>
      <label>
        <OnlineStatus status={user.isOnline} />
      </label>
      
      {data?.from !== user1 && data?.unread && (<NewMessage color={theme.text}/>) }
      <div style={{color:`${theme.text}`}} className="inbox-peek" >{data ? (renderInboxPeek()) : null }</div>
    </ListGroup.Item>
  );
};

export default User;
