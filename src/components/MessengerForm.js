import React,{useState, useContext, useEffect} from 'react';
import { AuthContext } from "./context/auth";
import { db, auth } from "../firebase";
import {
    collection,
    query,
    onSnapshot,
    orderBy,
    addDoc,
    Timestamp,
    doc,
    setDoc,
    getDoc,
  } from "firebase/firestore";
import Message from "./Message";
import Reply from "./svg/Reply";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Img from "./icons/user.png";
import Invite from "./svg/Invite";
import UpArrow from "./svg/UpArrow";
import DownArrow from './svg/DownArrow';

const MessengerForm = ({selectedUser, user1, inviteToWatchVideo }) => {
    const [open, setOpen] = useState(true);
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [hideArrowUp, setHideArrowUp] = useState("none");
    const [hideArrowDown, setHideArrowDown] = useState("flex");
    const { theme } = useContext(AuthContext);

    useEffect(()=>{
                    const user2 = selectedUser?.uid;
                    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
                    const msgsRef = collection(db, "messages", id, "chat");
                    const q = query(msgsRef, orderBy("createdAt", "asc"));
                    const getMessages = onSnapshot(q, (querySnapshot) => {
                      let msgs = [];
                      querySnapshot.forEach((doc) => {
                        msgs.push(doc.data());
                      });
                      setMsgs(msgs);
                    });
                    return () => getMessages();
    }, [selectedUser?.uid, user1])

    const videoInvite = (data) =>{
        inviteToWatchVideo(data);
    }

    const inviteToWatch = async () => {
        const user2 = selectedUser.uid;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        const currentVideo = await getDoc(doc(db, "users", user1));
        const getCurrentVideo = currentVideo.data().currentVideo;
        await addDoc(collection(db, "messages", id, "chat"), {
          text: { getCurrentVideo },
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
        });
        await setDoc(doc(db, "lastMessages", id), {
          text: "video invitation",
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          unread: true,
        });
      };

    const renderMessages = () => {
        if (msgs[msgs.length-1] !== undefined) {
          const selectedUserId = selectedUser.uid;
            if(msgs[msgs.length-1].from === selectedUserId && msgs[msgs.length-1].to === user1){
              return msgs.map((msg, i) => {
                    return (
                      <Message
                        key={i}
                        msg={msg}
                        user1={auth.currentUser.uid}
                        videoInvite={videoInvite}
                      />
                    );
                  })
                }
                else if(msgs[msgs.length-1].to === selectedUserId && msgs[msgs.length-1].from === user1){
                  return msgs.map((msg, i) => {
                    return (
                      <Message
                        key={i}
                        msg={msg}
                        user1={auth.currentUser.uid}
                        videoInvite={videoInvite}
                      />
                    );
                  })
                }
        } else if( msgs[msgs.length-1] === undefined){
          return null
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user2 = selectedUser.uid;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        await addDoc(collection(db, "messages", id, "chat"), {
          text: text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
        });
        await setDoc(doc(db, "lastMessages", id), {
          text: text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          unread: true,
        });
        setText("");
      };

      const hideArrows = () =>{
        if(hideArrowDown === "flex"){
          setHideArrowUp("flex")
          setHideArrowDown("none")
        }
        else if(hideArrowUp === "flex"){
          setHideArrowUp("none")
          setHideArrowDown("flex")
        }
      }

    const renderMessageBox = () => {
        if (selectedUser) {
          return (
            <>
              <div
                className="user-chat-box"
                style={{
                  color:`${theme.text}`
                }}
              >
                <img
                  style={{ width: "30px", marginRight: "5px", borderRadius:"50%" }}
                  alt="avatar"
                  src={selectedUser.avatar || Img}
                ></img>
                {selectedUser.name}
                <button
                style={{
                  color: `${theme.text}`,
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => inviteToWatch()}
              >
                <Invite />
                 Invite
              </button>
              <Button
                onClick={() => {setOpen(!open); hideArrows()}}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="user-chat-box"
                style={{
                  backgroundColor: `${theme.background}`,
                  borderColor: `${theme.border}`,
                  borderRadius:"50px"
                }}
                
              >
                <UpArrow themeColor={theme.text} display={hideArrowUp}/>
                <DownArrow themeColor={theme.text} display={hideArrowDown}/>
              </Button>
              </div>

              <Collapse className="my-2" in={open}>
                <div id="example-collapse-text">
                  <Container className="my-2 messages-container">
                    {renderMessages()}
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
                      <Reply themeColor={theme.text} />
                    </Form>
                  </div>
                </div>
              </Collapse>
              </>
          );
        } else
          return (
            <div style={{ color: `${theme.text}` }}>
              <h5>You are not chatting with anyone</h5>
            </div>
          );
      };

    return (
        <div className='inner-message-form-container'>{renderMessageBox()}</div>
    );
}

export default MessengerForm;