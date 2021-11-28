import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../redux/slicer/userSlicer';

import { useHistory } from 'react-router-dom';

function Login() {

  const cart = useSelector(state => state.cart)

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();
  const inputRef = useRef();

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    const credenciais = { email, senha };

    fetch(`${process.env.REACT_APP_API}/login`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciais)
    })
    .then(resp => {
      if (resp.status === 401) {
        setError(true);
      }
      return resp.json()
    })
    .then(json => {
      if(json.loginSuccess !== false) {
        dispatch(login(json))
        console.log(cart.loginPosTelaCompra)
        if (cart.loginPosTelaCompra){
          history.push('/endereco');
        } else {
          history.push('/');
        }
      }
    })
  }

  return (
    <div className="container-fluid">
      <h3>Login</h3>
      <form >
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          ref = {inputRef}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="form-control"
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          id="senha"
          className="form-control"
        />

        {error && <div className="invalid-feedback" style={{display: 'block'}}>
          Email ou senha inválidos
        </div>}

        <button
          className="btn btn-primary mt-3"
          onClick={handleClick}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default Login
