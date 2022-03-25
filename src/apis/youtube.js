import axios from 'axios';
const KEY = 'AIzaSyCFk-p029HlOSmrAP32qD9tvXvdt1sFu8Y';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        type: 'video',
        maxResults: 10,
        key: KEY
    }
})
