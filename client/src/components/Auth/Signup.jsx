import { useCallback, useContext, useEffect, useState } from 'react'
import MainButton from '../Common/MainButton'
import Input from '../Common/Input'
import LinkButton from '../Common/LinkButton';
import { _email_regex } from '../../utilities/constatns';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Card from '../Common/Card';

const default_form = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
}

function Signup() {
  const cookies = new Cookies();
  const { toggleLogin, setIsAuth } = useContext(AuthContext)
  const [ signupForm, setSignupForm ] = useState(default_form);

  const [ showPassword, setShowPassword ] = useState(false);
  const [ formInvalid, setFormInvalid ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const toggleShowPassword = () => setShowPassword(p => !p);

  const checkValidity = useCallback(() => {
    let invalid = true
    invalid = invalid && (
      signupForm.firstName === '' ||
      signupForm.lastName === '' ||
      signupForm.password === '' ||
      !_email_regex.test(signupForm.username) ||
      signupForm.password !== signupForm.confirmPassword
    )
    return invalid
  }, [signupForm]);

  useEffect(() => {
    setFormInvalid(checkValidity())
  }, [signupForm, checkValidity])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value
    })
  }

  const handleSwitch = () => {
    setSignupForm(default_form)
    toggleLogin();
  }

  const signUp = async() => {
    if(formInvalid) return
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/signup`, signupForm);
      setLoading(false)
      const {
        token,
        userId,
        firstName,
        lastName,
        username,
        hashedPassword
      } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);

      if(token) setIsAuth(true);
      
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <Card>
      <Input 
        placeholder='First Name'
        name='firstName'
        type='text'
        onChange={handleChange}
        />
      <Input 
        placeholder='Last Name'
        name='lastName'
        type='text'
        onChange={handleChange}
        />
      <Input 
        placeholder='Username'
        name='username'
        type='email'
        onChange={handleChange}
        />
      <Input 
        placeholder='Password'
        name='password'
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        />
      <Input 
        placeholder='Confirm Password'
        name='confirmPassword'
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        />
      <div 
        className='flex items-center gap-4 cursor-pointer'
        onClick={toggleShowPassword}
        >
        <Input
            placeholder='Show password'
            type='checkbox'
            checked={showPassword}
            onChange={() => {}}
            />
        <label 
          className='flex-1'
          >Show password</label>
      </div>
      <MainButton 
        onClick={signUp}
        loading={loading}
        disabled={formInvalid}
        >
        Sign up
      </MainButton>
      <LinkButton
        onClick={handleSwitch}
        center
        >
        Login
      </LinkButton>
    </Card>
  )
}

export default Signup