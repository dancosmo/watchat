import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./context/auth";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, getDoc, doc, updateDoc} from "firebase/firestore";
import User from "./User";
import ListGroup from "react-bootstrap/ListGroup";
import MessengerForm from "./MessengerForm";

const Messenger = ({ videoCallback }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const { theme } = useContext(AuthContext);
  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersReference = collection(db, "users");
    //Now we are going to create the query object
    const q = query(
      usersReference,
      where("uid", "not-in", [auth.currentUser.uid])
    );
    const listOfUsers = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => {
      listOfUsers();
    };
  }, []);

  const videoInvite = (data) => {
    videoCallback(data);
  };

  const selectUser = async (user) => {
    setSelectedUser(user);
    const user2 = selectedUser?.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const unreadCheck = await getDoc(doc(db, "lastMessages", id));
    if (unreadCheck.data()?.from !== user1) {
      await updateDoc(doc(db, "lastMessages", id), {
        unread: false,
      });
    }
  };
  const renderUsers = () =>
    users.map((user) => {
      return (
        <User
          key={user.uid}
          user={user}
          user1={user1}
          selectUser={selectUser}
          chat={selectedUser}
        ></User>
      );
    });

  return (
    <div className="messenger-container">
      <div className="users-container">
        <ListGroup>{renderUsers()}</ListGroup>
      </div>
      <div
        style={{ backgroundColor: `${theme.background}` }}
        className="message-form-container px-2 py-2"
      >
        <MessengerForm
          selectedUser={selectedUser}
          user1={user1}
          inviteToWatchVideo={videoInvite}
        />
      </div>
    </div>
  );
};

export default Messenger;
