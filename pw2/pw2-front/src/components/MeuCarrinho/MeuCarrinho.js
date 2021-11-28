import { useEffect, useState, } from "react"
import { useSelector, useDispatch, } from 'react-redux';
import { loginAfterCart } from '../../redux/slicer/cartSlicer'
import { Link, useHistory, } from 'react-router-dom'

function MeuCarrinho() {
  
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()

  const [carrinhoVazio, setCarrinhoVazio] = useState(false);
  const [carrinhoVazioError, setCarrinhoVazioError] = useState(false);

  const history = useHistory();

  const handleVoltar = (e) => {
    e.preventDefault();
    history.goBack(-1);
  }

  const handleAvancar = (e) => {
    e.preventDefault();
    if(cart.produtos.length) {
      if(user.logado) {
        history.push('/endereco');
      } else {
        dispatch(loginAfterCart(true));
        history.push('/login')
      }
    } else {
      setCarrinhoVazioError(true);
    }
  }

  useEffect(() => {
    if(!cart.produtos.length) {
      setCarrinhoVazio(true)
    }
  }, [cart.produtos])

  console.log(cart.produtos)
  return (
    <div>
      <h3>Carrinho de compras</h3>
      <ul className="list-group mb-2">
        {cart.produtos.length > 0 ?
        cart.produtos.map(produto =>
          <li key={produto.id} className="list-group-item">
            <Link className="mx-1" to={`produto/${produto.id}`}>
              {produto.nome}
            </Link>

            <span className="mx-1">
              Quantidade selecionada: {produto.quantidade}
            </span>
            <span className="mx-1">
              Estoque: {produto.estoque}
            </span>
            <span className="mx-1">
              Preço: R${produto.preco}
            </span>
          </li>
          ):
          <h4 className="d-flex justify-content-center text-secondary"> Carrinho vazio</h4>
        }
      </ul>

      {!carrinhoVazio &&
      <h4 className="mx-2">
        Total: <span className="badge badge-secondary bg-primary">R${cart.produtos.reduce((a, b) => a + parseInt(b.preco), 0)}</span>
      </h4>
      }

      {carrinhoVazioError && <div className="invalid-feedback d-flex justify-content-center my-2" style={{ display: 'block' }}>
        O carrinho está vazio, favor adicionar produtos que deseja comprar
      </div>}

      <div className="clearfix d-flex justify-content-center mt-2">
        <button onClick={handleVoltar} className="btn btn btn-primary mx-1">Voltar</button>
        <button onClick={handleAvancar} className="btn btn btn-primary mx-1">Avançar</button>
      </div>
    </div>
  )
}

export default MeuCarrinho
