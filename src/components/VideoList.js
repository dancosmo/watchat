import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, video }) => {

const selectedVideo = (data) => {
    if(data){
        video(data);
    }
    else return
}
  const renderVideoList = videos.map((video) => {
      return <VideoItem key={video.id.videoId} video={video} selectedVideo={selectedVideo}></VideoItem>;
    });
    
  return <ListGroup className="video-list">{renderVideoList}</ListGroup>;
};

export default VideoList;
