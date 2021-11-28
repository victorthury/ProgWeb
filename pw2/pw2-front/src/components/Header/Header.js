import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slicer/userSlicer';

function Header() {

  const user = useSelector(state => state.user)
  const history = useHistory();
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <div className="float-start">
          <Link className="navbar-brand mb-0 h1" to="/">Minha Loja</Link>
        </div>
        <div className="float-end">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/sobre">Sobre</Link>
              
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/cart">Meu Carrinho</Link>
              </li>

              {(!user.logado || user.tipoUsuario === "colaborador") &&
                <li className="nav-item">
                  <Link className="nav-link active" to="/signup">
                    {
                      user.tipoUsuario === 'colaborador' ?
                      'Cadastrar Novo Colaborador' : 
                      'Sign Up'
                    }
                  </Link>
                </li>
              }

              {!user.logado &&
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>
              }

              {user.logado && <li className="nav-item">
                <a onClick={handleLogout} className="nav-link active" href="/">Logout [{user.nome}]</a>
              </li>}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header