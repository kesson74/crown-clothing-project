import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,  
  signinWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { SignupContainer } from "./sign-in-form.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";


const SignInForm = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signinWithGooglePopup();
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await signInAuthUserWithEmailAndPassword(email, password);     
      resetFormFields();     
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("The password is incorrect");
          break;
        case "auth/user-not-found":
          alert("The email is not associated with any user");
          break;
        default:          
      }
    }
  };

  return (
    <SignupContainer>
      <h2>Do you have account?</h2>
      <span>Sign in using your email and pwd</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </SignupContainer>
  );
};

export default SignInForm;
