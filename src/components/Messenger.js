import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./context/auth";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import User from "./User";
import ListGroup from "react-bootstrap/ListGroup";
import Message from "./Message";
import Reply from "./svg/Reply";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Img from "./icons/user.png";
import Invite from "./svg/Invite";

const Messenger = ({videoCallback}) => {
  const [users, setUsers] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");
  const [user, setUser] = useState();
  const [chat, setChat] = useState("");
  const { theme } = useContext(AuthContext);
  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersReference = collection(db, "users");
    //Now we are going to create the query object
    const q = query(
      usersReference,
      where("uid", "not-in", [auth.currentUser.uid])
    );
    const listOfUsers = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => listOfUsers();
  }, []);

  const videoInvite = (data) =>{
        videoCallback(data);
  }

  const selectUser = async (user) => {
    setChat(user);
    setUser(user);
    setOpen(!open);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
    const unreadCheck = await getDoc(doc(db,"lastMessages", id));
        if (unreadCheck.data().from !== user1){
          await updateDoc(doc(db,"lastMessages", id),{
            unread:false
          })
    }
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    await addDoc(collection(db, "messages", id, "chat"), {
      text: text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });
    await setDoc(doc(db, "lastMessages", id),{
      text:text,
      from:user1,
      to:user2,
      createdAt: Timestamp.fromDate(new Date()),
      unread:true,
    })
    setText("");
  };
  const inviteToWatch = async () => {
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const currentVideo = await getDoc(doc(db,"users", user1));
    const getCurrentVideo = currentVideo.data().currentVideo;
    await addDoc(collection(db, "messages", id, "chat"),{
      text: {getCurrentVideo},
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    })
    await setDoc(doc(db, "lastMessages", id),{
      text:"video invitation",
      from:user1,
      to:user2,
      createdAt: Timestamp.fromDate(new Date()),
      unread:true,
    })
  }
  
  const renderUsers = () =>
    users.map((user) => {
      return <User  key={user.uid} user={user} user1={user1} selectUser={selectUser} chat={chat}></User>;
    });

  return (
    <div>
      <div className="users-container">
        <ListGroup >{renderUsers()}</ListGroup>
      </div>
      <div style={{backgroundColor:`${theme.background2}`}} className="container-box px-2 py-2">
        {user ? (
          <div>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="user-chat-box"
              style={{backgroundColor:`${theme.background}`, borderColor:`${theme.border}`,}}
            >     
              <img style={{width:"20px", marginRight:"5px"}} alt="avatar" src={user.avatar || Img}></img>           
              {user.name}
            </Button>
            <button style={{color:`${theme.text}`, backgroundColor:"transparent", border:"none"}} onClick={()=>inviteToWatch()}><Invite/>Invite to Watch</button>
            <Collapse className="my-2" in={open}>
              <div id="example-collapse-text">
                <Container className="my-2 messages-container">
                  {msgs.length
                    ? msgs.map((msg, i) => <Message key={i} msg={msg} user1={auth.currentUser.uid} videoInvite={videoInvite} />)
                    : null}
                </Container>
                <div className="message-form">
                  <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                      type="text"
                      id="textInput1"
                      placeholder="Enter a message"
                      value={text}
                      autoComplete="off"
                      onChange={(e) => setText(e.target.value)}
                    />
                    <Reply />
                  </Form>
                </div>
              </div>
            </Collapse>
          </div>
        ) : (
          <div style={{color:`${theme.text}`}}>
            <h5>You are not chatting with anyone</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
