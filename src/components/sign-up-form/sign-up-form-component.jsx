import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from '../button/button.component';



const SignUpForm = () => {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('The email exists already');
      }
      else{
        console.log('User creation failed, due to: ' , error);
      }
      
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account yet?</h2>
      <span>Sign up using your email and pwd</span>
      <form onSubmit={handleSubmit}>
       
        <FormInput
          label = "Your name"
          type= "text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
      
        <FormInput
          label ="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
      
        <FormInput
          label ="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
       
        <FormInput
          label ="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType ="google" type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
