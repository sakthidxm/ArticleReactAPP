import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {

        try {

            if ([password !== confirmPassword]) {
                setError('Please re-enter confirm password');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(),email,password);
            navigate("/articles")
            
        } catch (error) {

            setError(error.message);

        }


    }




    return (
        <>
            < h1 > This is SignUp Page</h1 >

            {error && <p className="error">{error}</p>}

            <input placeholder="Enter Registered Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Set Password' value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder='Re-Enter Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

            <button onClick={createAccount}>Create Account</button>

            <Link to="/login"> Login </Link>

        </>
    );

}

export default SignUpPage;