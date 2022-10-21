import SignUpForm from "../sign-up-form/sign-up-form.component"
import "./authentication.styles.scss"
import SignInForm from "../sign-in-form/sign-in-form.component"
import "./authentication.styles.scss"

const SignIn = () => {

    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default SignIn