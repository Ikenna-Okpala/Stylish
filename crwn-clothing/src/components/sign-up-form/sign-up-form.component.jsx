

import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import "./sign-up-form.styles.jsx"
import Button from "../button/button.component"
import { SignUpContainer } from "./sign-up-form.styles.jsx"
import { useDispatch } from "react-redux"
import { signUpStart } from "../../store/user/user.action"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const SignUpForm = () => {
    // the fact that you are hooked into thew context will causxe react to re run your context
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        //no default behaviour
        event.preventDefault()
        console.log("handle submit")

        if (password !== confirmPassword) {
            alert("passwords do not match")
            return
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields()
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Cannot create user email already in use")
            } else {
                console.log("User creation encountered an error, ", error)
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
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm