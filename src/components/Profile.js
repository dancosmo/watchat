import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './context/auth';
import Container from 'react-bootstrap/esm/Container';
import Img from './icons/user.png';
import TrashIcon from './svg/TrashIcon';
import UserAvatar from './svg/UserAvatar';
import { storage, db, auth } from '../firebase';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [img, setImg] = useState('');
  const [user, setUser] = useState('');
  const userData = useContext(AuthContext);
  const { theme } = useContext(AuthContext);
  const navigate = useNavigate();

  const userTimeStamp = userData.user.metadata.creationTime;

  useEffect(() => {
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
        } catch (err) {
          console.log(err.message);
        }
        setImg('');
      };
      uploadImg();
    }
    const getUserName = async () => {
      const userRef = doc(db, 'users', `${auth.currentUser.uid}`);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log('user not found');
      }
    };
    getUserName();
  }, [img, user.avatarPath]);

  const deleteUserAvatar = async () => {
    try {
      const confirm = window.confirm('delete avatar');
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          avatar: '',
          avatarPath: '',
        });
        navigate('/');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return user ? (
    <Container className="profile-container d-flex">
      <Container className="img-container d-flex">
        <img src={user.avatar || Img} alt="avatar" />
        <div className="avatar-overlay">
          <div>
            <label htmlFor="photo">
              <UserAvatar />
            </label>
            <label>
              {user.avatar ? (
                <TrashIcon deleteUserAvatar={deleteUserAvatar} />
              ) : null}
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="photo"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
        </div>
      </Container>
      <Container style={{ color: `${theme.text}`, marginTop: '5%' }}>
        <h3>User Name: {user.name} </h3>
        <p>User Email: {user.email}</p>
        <p>Joined: {userTimeStamp.substring(0, 17)}</p>
        <>Account Status:</>
      </Container>
    </Container>
  ) : null;
};

export default Profile;
