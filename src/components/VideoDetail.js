import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const VideoDetail = ({ video }) => {
  const { theme, user } = useContext(AuthContext);

  useEffect(() => {
    if(user){
      const updateCurrentVideo = async () => {
        await updateDoc(doc(db, "users", user.uid), {
          currentVideo: { video },
        });
      };
      updateCurrentVideo();
    }
    else return alert("You have to log in you share videos")
  }, [video, user]);

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <div className="video-detail">
      <iframe
        style={{ width: "100%", height: "70vh" }}
        title="video-player"
        src={videoSrc}
      />
      <div style={{ color: `${theme.text}` }}>
        <h5>{video.snippet.title}</h5>
        <label>{video.snippet.description}</label>
        <div>Channel: {video.snippet.channelTitle}</div>
      </div>
    </div>
  );
};

export default VideoDetail;
