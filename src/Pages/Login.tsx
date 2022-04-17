import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Group from '../img/group.png'
import Img1 from '../img/img1.svg'
import '../css/login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  return (
    <main>
      <div className="main__images">
        <img src={Group} alt="logo" className="images-group" />
        <img src={Img1} alt="logo" className="images-figure" />
      </div>
      <div className="main__information">
        <TextField
          id="standard-basic"
          label="Email"
          type="email"
          variant="standard"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Senha"
          type="password"
          variant="standard"
          onChange={e => setSenha(e.target.value)}
        />
        <button
          type="button"
          className="information__btn"
          onClick={() => console.log(email, senha)}>
          Login
        </button>
      </div>
    </main>
  )
}

export default Login
