import React, { useContext } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AuthContext } from "./context/auth";

function GoogleSignIn() {
  const navigate = useNavigate();
  const { theme } = useContext(AuthContext);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
          setDoc(doc(db, "users", user.uid),{
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            createdAt: user.metadata.creationTime,
            isOnline: true,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container>
        <Button style={{backgroundColor:`${theme.background}`, borderColor:`${theme.border}`, color:`${theme.text}`}} variant="success" onClick={signInWithGoogle}>
          Google Sign In
        </Button>
      </Container>
    </div>
  );
}

export default GoogleSignIn;
