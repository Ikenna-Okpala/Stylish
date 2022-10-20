
import { signInWithGooglePopup, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import SignUpForm from "../sign-up-form/sign-up-form.component"
import "./sign-in.styles.scss"


const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()

        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div className="sign-in-header">
            <h1>
                Sign In Page
                <div>
                    <button onClick={logGoogleUser}>
                        Sign in with Google Popup
                    </button>
                </div>

                <SignUpForm />
            </h1>
        </div>
    )
}

export default SignIn