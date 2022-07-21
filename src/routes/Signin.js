import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SignInForm from 'components/SignInForm';
import SocialSignIn from 'components/SocialSignIn';
import 'routes/SignIn.css';

function SignIn({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="signIn">
      <SignInForm />
      <SocialSignIn />
    </div>
  );
}

export default SignIn;
