import { useCallback, useContext, useEffect, useState } from 'react'
import MainButton from '../Common/MainButton'
import Input from '../Common/Input'
import LinkButton from '../Common/LinkButton';
import { _email_regex } from '../../utilities/constatns';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import Cookies from 'universal-cookie'

const default_form = {
  username: '',
  password: ''
}

function Login() {
  const cookies = new Cookies();
  const { toggleLogin, setIsAuth } = useContext(AuthContext)
  const [ loginForm, setLoginForm ] = useState(default_form);

  const [ loading, setLoading ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ formInvalid, setFormInvalid ] = useState(false);

  const checkValidity = useCallback(() => {
    let invalid = true
    invalid = invalid && (
      loginForm.password === '' ||
      !_email_regex.test(loginForm.username)
    )
    return invalid
  }, [loginForm]);

  useEffect(() => {
    setFormInvalid(checkValidity())
  }, [loginForm, checkValidity])
  const toggleShowPassword = () => setShowPassword(p => !p);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }

  const handleSwitch = () => {
    setLoginForm(default_form)
    toggleLogin();
  }
  
  const login = async () => {    
    if(formInvalid) return
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:3000/login', loginForm);
      setLoading(false)
      console.log(res)
      const {
        token,
        userId,
        firstName,
        lastName,
        username,
      } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      if(token) setIsAuth(true);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div>
      <div className='bg-white p-5 rounded-sm my-6 space-y-4'>
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
          onClick={login}
          disabled={formInvalid}
          loading={loading}
          >
          Login
        </MainButton>
        <LinkButton
          center
          onClick={handleSwitch}
          >
          Sign up
        </LinkButton>
      </div>
    </div>
  )
}

export default Login