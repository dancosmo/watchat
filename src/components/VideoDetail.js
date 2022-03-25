import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { AuthContext } from './context/auth';
import {db} from "../firebase";
import {doc, updateDoc} from "firebase/firestore";


const VideoDetail = ({video}) => {

    const {theme, user} = useContext(AuthContext);

    useEffect(()=>{
        const updateCurrentVideo = async ()=>{
            await updateDoc(doc(db,"users", user.uid),{
                currentVideo: {video},
            })
        }
        updateCurrentVideo();
    },[video])
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
    return (
        <Container className='video-detail'>
                <iframe style={{width:"100%", height:"100%"}} title='video-player' src={videoSrc}/>
                <div style={{color:`${theme.text}`}}>
                    <h5>{video.snippet.title}</h5>
                    <label>{video.snippet.description}</label>
                    <div>Channel: {video.snippet.channelTitle}</div>
                </div>
        </Container>
    );
}

export default VideoDetail;