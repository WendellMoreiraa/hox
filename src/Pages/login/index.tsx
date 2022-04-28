import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as userActions from '../../store/actions/user'
import Group from '../../img/group.png'
import Img1 from '../../img/img1.svg'
import api from '../../services/api'

const useStyles = makeStyles({
  mainInformation: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    '@media (min-width:600px)': {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      marginBottom: '130px',
      marginRight: '50px'
    }
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    '@media (min-width:600px)': {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: '550px',
      width: '700px',
      border: '1px solid rgba(0, 0, 0, 0.061)',
      borderRadius: ' 40px',
      boxShadow: '3px 9px 6px #8080807d',
      position: 'relative',
      overflow: 'hidden'
    },
    '@media  (min-width:800px)': {
      width: '800px'
    },
    '@media (min-width:1300px)': {
      width: '900px'
    }
  },
  mainImages: {
    display: 'none',
    '@media (min-width:600px)': {
      display: 'block'
    }
  },
  informationBtn: {
    marginTop: '40px',
    padding: '15px',
    border: 'none',
    backgroundColor: 'rgba(118, 189, 122, 1)',
    fontSize: '16px',
    color: '#ffff',
    cursor: 'pointer',
    boxShadow: '7px 8px 4px #80808061',
    transition: 'all 0.5s',
    position: 'relative',
    '@media (min-width:600px)': {
      borderRadius: '10px'
    }
  },
  imagesFigure: {
    height: '300px',
    position: 'absolute',
    left: '20px',
    bottom: '0',
    '@media (min-width:600px)': {
      height: '300px',
      position: 'absolute',
      left: '20px',
      bottom: '0'
    },
    '@media (min-width:800px)': {
      height: '370px'
    }
  },
  imagesGroup: {
    height: '550px',
    position: 'absolute',
    left: '0',
    top: ' 0',
    zIndex: '-1',
    '@media (min-width:600px)': {
      height: '550px',
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: '-1'
    }
  },
  bodyLogins: {
    height: '100vh',
    '@media (min-width:600px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }
  }
})

function Login() {
  const dispach = useDispatch()

  const navigate = useNavigate()
  const loginStyles = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSession = async (validEmail: string) => {
    const { data } = await api.get('/auth')
    if (data.token) {
      dispach(userActions.userSignIn('admin', validEmail, data.token, true))
      localStorage.setItem('token', data.token)
      navigate('/')
    }
  }
  const handleLogin = async () => {
    if (email && password) {
      if (email === 'admin@gmail.com' && password === 'admin') {
        handleSession(email)
      }
    }
  }

  return (
    <div className={loginStyles.bodyLogins}>
      <main className={loginStyles.main}>
        <div className={loginStyles.mainImages}>
          <img src={Group} alt="logo" className={loginStyles.imagesGroup} />
          <img src={Img1} alt="logo" className={loginStyles.imagesFigure} />
        </div>
        <div className={loginStyles.mainInformation}>
          <TextField
            id="standard-basic"
            name="email"
            label="Email"
            type="email"
            variant="standard"
            sx={{ marginBottom: '20px' }}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            name="password"
            label="Senha"
            type="password"
            variant="standard"
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={loginStyles.informationBtn}
            onClick={() => handleLogin()}>
            Login
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login
