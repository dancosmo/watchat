import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { AuthContext } from './context/auth';

const VideoItem = ({ video, selectedVideo }) => {
  const { theme } = useContext(AuthContext);

  return (
    <ListGroup.Item
      onClick={() => selectedVideo(video)}
      style={{
        backgroundColor: `${theme.elementBackground}`,
        color: `${theme.color}`,
        display: 'flex',
        cursor: 'pointer',
        flexWrap: 'wrap',
      }}
    >
      <img src={video.snippet.thumbnails.medium.url} alt="video-thumbnal"></img>
      <div className="video-info-container" style={{ color: `${theme.text}` }}>
        <div style={{ fontWeight: `bold` }}>{video.snippet.title}</div>
        <div>Channel: {video.snippet.channelTitle}</div>
        <div style={{ marginTop: `10px` }}>{video.snippet.description}</div>
      </div>
    </ListGroup.Item>
  );
};

export default VideoItem;
