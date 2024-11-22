import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import SignInForm from "components/SignInForm";
import SocialSignIn from "components/SocialSignIn";
import "routes/SignIn.css";

function SignIn({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="signIn d-flex align-items-center">
      <div className="w-100">
        <SignInForm />
        <SocialSignIn />
      </div>
    </div>
  );
}

SignIn.propTypes = {
  user: PropTypes.object,
}

export default SignIn;