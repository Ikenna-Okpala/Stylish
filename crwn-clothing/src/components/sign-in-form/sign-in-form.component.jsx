

import { useState } from "react"
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import Button from "../button/button.component"

const defaultFormFields = {
    email: "",
    password: "",
    confirmPassword: ""
}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        //no default behaviour
        event.preventDefault()
        console.log("handle submit")


        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
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
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType="google">Google sign in</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm