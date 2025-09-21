import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { firebaseInstance, authService } from 'fbase';
import { Button } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc";
import 'components/SocialSignIn.css';

function SocialSignIn() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const onClick = async () => {
    try {
      const provider = new firebaseInstance.auth.GoogleAuthProvider();
      await authService.signInWithPopup(provider)
        .then(() => {
          navigate("/");
        });
    } catch (error) {
      if (error.code === "auth/popup-blocked") {
        setMessage("The popup has been blocked by the browser!");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Button type="submit" onClick={onClick}
        className="google-button mt-5 d-block">
        <FcGoogle className="mb-1" /> Continue with Google
      </Button>
      <div className="mt-3 text-center">{message}</div>
    </div>
  );
}

export default SocialSignIn;
