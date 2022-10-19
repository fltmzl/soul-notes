import useInput from "../../hooks/useInput";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import Button from "../Button";

const LoginForm = () => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  return (
    <form onSubmit={onLogin} className="flex flex-col gap-10 w-11/12 max-w-lg">
      <h1 className="text-4xl">Login</h1>

      {/* <div>
        <span className="text-red-500">{error && error.message}</span>
      </div> */}

      <div>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" value={email} onChange={setEmail} className="form-input" />
      </div>

      <div>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" value={password} onChange={setPassword} className="form-input" />
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
