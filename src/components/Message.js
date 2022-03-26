import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Message = ({ msg, user1, videoInvite }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

 
  const messageBackground = () => {
    if (user1 === msg.from) {
      return "grey";
    } else return "darkgrey";
  };

  const confirmVideo = () => {
      videoInvite(msg.text);
  }

  const renderMessage = () =>{
    const message = msg.text;
    if(message instanceof Object && user1 !== msg.from){
      return <div>You've been invited to watch a video <button className="video-invitation" onClick={()=> confirmVideo()}>Watch</button></div>;
    }
    else if (message instanceof Object && user1 === msg.from){
      return `you sent a video invitation`;
    }
    else return message;
  }
  
  return (
    <div
      className="message-background"
      style={{ backgroundColor: `${messageBackground()}` }}
      ref={scrollRef}
    >
      <div>{renderMessage()}</div>
      <small>
        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
      </small>
    </div>
  );
};

export default Message;
