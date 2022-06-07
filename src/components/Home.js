import React, { useContext, useState, useEffect } from "react";
import Messenger from "./Messenger";
import { AuthContext } from "./context/auth";
import VideoSearch from "./VideoSearch";
import VideoList from "./VideoList";
import useVideos from "../hooks/useVideos";
import VideoDetail from "./VideoDetail";

const Home = () => {
  const { user, theme } = useContext(AuthContext);
  const [videos, search] = useVideos("coding");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const video = (data) => {
    if (!data) {
      return null;
    } else {
      setSelectedVideo(data);
    }
  };

  const videoCallback =(data)=>{
    setSelectedVideo(data.getCurrentVideo.video);
  }

  useEffect(() => {
    setSelectedVideo(null);
  }, [videos]);

  return (
    <div className="flex-home">
      {user ? (
          <Messenger videoCallback={videoCallback}/>
      ) : (
        <div
          className="no-user-container"
          style={{
            color:`${theme.text}`,
            backgroundColor: `${theme.background}`,
          }}
        >
          Log In to join Chat
        </div>
      )}
      <div className="video-search-container">
        <VideoSearch onSearchSubmit={search} />
        {selectedVideo ? (
          <VideoDetail video={selectedVideo} />
        ) : (
          <VideoList videos={videos} video={video} />
        )}
      </div>
    </div>
  );
};

export default Home;
