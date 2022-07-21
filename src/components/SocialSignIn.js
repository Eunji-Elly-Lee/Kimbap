import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { firebaseInstance, authService } from 'fbase';
import { Button } from 'react-bootstrap';
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
        className="social-button mt-5 d-block">
        Continue with Google
      </Button>
      <div className="message text-center">{message}</div>
    </div>
  );
}

export default SocialSignIn;
