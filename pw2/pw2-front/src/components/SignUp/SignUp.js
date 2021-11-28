import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import validateEmail from '../../utils/utils'

function SignUp() {

  const user = useSelector(state => state.user)

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoDeSenha, setConfirmacaoDeSenha] = useState('');

  const [emailFormatoError, serEmailFormatoError] = useState(false);
  const [emailConflitoError, setEmailConflitoError] = useState(false);
  const [nomeTamanhoError, setNomeTamanhoError] = useState(false);
  const [senhaTamanhoError, setSenhaTamanhoError] = useState(false);
  const [senhaConfirmacaoError, setSenhaConfirmacaoError] = useState(false);
  
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    const emailValido = validateEmail(email)
    const nomeTamanhoCorreto = (nome.length >= 3 && nome.length <= 100);
    const senhaTamanhoCorreto = senha.length > 5;
    const senhaIgualConfirmacao = senha === confirmacaoDeSenha;

    const formCorreto = senhaIgualConfirmacao && senhaTamanhoCorreto && nomeTamanhoCorreto && emailValido;

    if (formCorreto) {
      setNomeTamanhoError(false);
      setSenhaTamanhoError(false);
      setSenhaConfirmacaoError(false);
      serEmailFormatoError(false);

      const credenciais = { 
        email,
        nome,
        senha, 
        tipoUsuarioId: user.tipoUsuario === 'colaborador' ? 1 : 2,
      };

      fetch(`${process.env.REACT_APP_API}/signup`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciais)
      })
      .then(resp => {
        if (resp.status === 409) {
          setEmailConflitoError(true);
          return {msg: 'Usuario já existe', conflict: true}
        }
        return resp.json()
      })
      .then(json => {
        if (json.conflict) {
          console.log(json.msg)
        } else {
          console.log(json)
          console.log(credenciais)
          history.push('/login');
        }
      });
    } else {
      console.log('Fail')
      if (!emailValido) {
        serEmailFormatoError(true);
      } else {
        serEmailFormatoError(false);
      }
      if (!nomeTamanhoCorreto) {
        setNomeTamanhoError(true);
      } else {
        setNomeTamanhoError(false);
      }
      if (!senhaTamanhoCorreto) {
        setSenhaTamanhoError(true);
      } else {
        setSenhaTamanhoError(false);
      }
      if (!senhaIgualConfirmacao) {
        setSenhaConfirmacaoError(true);
      } else {
        setSenhaConfirmacaoError(false);
      }
    }
  }

  return (
    <div>
      <h3>Sign Up - {user.tipoUsuario === 'colaborador' ? 'Cadastrar Novo Colaborador' : 'Cadastro de Cliente'}</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className={(emailFormatoError || emailConflitoError ) ? 'form-control is-invalid' : 'form-control'}
        />
        {emailConflitoError && <div className="invalid-feedback" style={{ display: 'block' }}>
          Email já cadastrado, tente um email ainda não cadastrado
        </div>}
        {emailFormatoError && <div className="invalid-feedback" style={{ display: 'block' }}>
          Formato de email inválido, o email deve ter o formato nome@exemplo.com
        </div>}

        <label htmlFor="nome">Nome</label>
        <input 
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          id ="nome"
          className={nomeTamanhoError ? 'form-control is-invalid' : 'form-control'}
        />
        {nomeTamanhoError && <div className="invalid-feedback" style={{ display: 'block' }}>
          O nome deve ter de 3 a 100 caracteres
        </div>}
        
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          id="senha"
          className={senhaTamanhoError ? 'form-control is-invalid' : 'form-control'}
        />
        {senhaTamanhoError && <div className="invalid-feedback" style={{ display: 'block' }}>
          A senha deve ter pelo menos 6 caracteres
        </div>}
        
        <label htmlFor="confirmacaoDeSenha">Confirmação de senha</label>
        <input 
          type="password"
          value={confirmacaoDeSenha}
          onChange={(e) => setConfirmacaoDeSenha(e.target.value)}
          id="confirmacaoDeSenha"
          className={ senhaConfirmacaoError ? 'form-control is-invalid' : 'form-control'}
        />

        {senhaConfirmacaoError && <div className="invalid-feedback" style={{ display: 'block' }}>
          As senha não é igual a confirmação de senha
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

export default SignUp
