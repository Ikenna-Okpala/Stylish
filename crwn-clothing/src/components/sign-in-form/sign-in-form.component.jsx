

import { useState } from "react"
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.jsx"
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component"
import { ButtonsContainer, SignUpContainer } from "./sign-in-form.styles.jsx"
import { useDispatch } from "react-redux"
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action"

const defaultFormFields = {
    email: "",
    password: "",
    confirmPassword: ""
}


const SignInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    const handleSubmit = async (event) => {
        //no default behaviour
        event.preventDefault()
        console.log("handle submit")


        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields()
        }
        catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email")
                    break
                case "auth/user-not-found":
                    alert("No user asscoiated with this email")
                    break
                default:
                    console.log(error)
            }

        }


    }
    const handleChange = (event) => {
        //the thing that emits the event
        const { name, value } = event.target

        //updates fporm fields with the right name and value
        setFormFields({ ...formFields, [name]: value })

    }
    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPES_CLASSES.google}>Google sign in</Button>
                </ButtonsContainer>

            </form>
        </SignUpContainer>
    )
}

export default SignInForm