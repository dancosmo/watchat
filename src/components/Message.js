import React, { useRef, useEffect, useContext } from 'react';
import { AuthContext } from './context/auth';
import Moment from 'react-moment';

const Message = ({ msg, user1, videoInvite }) => {
  const scrollRef = useRef();
  const { theme } = useContext(AuthContext);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  const messageBackground = () => {
    if (user1 === msg.from) {
      return 'transparent';
    } else return 'rgba(255, 255, 255, 0.4)';
  };

  const confirmVideo = () => {
    videoInvite(msg.text);
  };

  const renderMessage = () => {
    const message = msg.text;
    if (message instanceof Object && user1 !== msg.from) {
      return (
        <div>
          You've been invited to watch a video{' '}
          <button className="video-invitation" onClick={() => confirmVideo()}>
            Watch
          </button>
        </div>
      );
    } else if (message instanceof Object && user1 === msg.from) {
      return `you sent a video invitation`;
    } else return message;
  };

  return (
    <div
      className="message-background"
      style={{ backgroundColor: `${messageBackground()}` }}
      ref={scrollRef}
    >
      <div style={{ color: `${theme.text}` }}>{renderMessage()}</div>
      <small style={{ color: `${theme.text}` }}>
        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
      </small>
    </div>
  );
};

export default Message;
