import { useState, useEffect, useReducer, useCallback, useMemo } from "react"
import { useParams, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faPlus, faMinus, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Comentario } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { appendItem, updateCart } from '../../redux/slicer/cartSlicer';

const reducer = (state, action) => {
  switch (action) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return state.count <= 1 ? { count: 1 } : { count: state.count - 1 }
    default:
      throw new Error();
  }
}

function Produto() {
  
  const cart = useSelector(state => state.cart)

  const [produto, setProduto] = useState({});
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, { count: 1 });
  const [comentarios, setComentarios] = useState([]);
  const [inputComentario, setInputComentario] = useState('');
  const [limiteCompraError, setLimiteCompraError] = useState(false);
  const [limiteCompraUpdateError, setLimiteCompraUpdateError] = useState(false);
  const [image, setImage] = useState('')
  const history = useHistory();

  const cartDispatch = useDispatch();

  const handleEdit = () => {
    history.push(`/produto/${id}/edit`);
  }

  const handleDelete = () => {
    fetch(`http://localhost:3020/produtos/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(json => history.push('/'))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setComentarios([...comentarios, { id: comentarios.length, texto: inputComentario, like: false }]);
    setInputComentario('');
  }

  const handleCart = (e) => {
    e.preventDefault();
    const itemInCartIndex = cart.produtos.findIndex(item => item.id === produto.id);
    
    if (itemInCartIndex === -1) {
      if (state.count <= produto.estoque) {
        setLimiteCompraError(false)
        cartDispatch(appendItem({ ...produto, quantidade: state.count }))
        history.push('/cart')
      } else {
        setLimiteCompraError(true);
      }
    } else {
      const { quantidade } = cart.produtos[itemInCartIndex]
      if (state.count + quantidade <= produto.estoque) {
        setLimiteCompraUpdateError(false);
        cartDispatch(updateCart(state.count))
        history.push('/cart')
      } else {
        setLimiteCompraUpdateError(true);
      }
    }
  }

  const setLike = useCallback((id) => {
    setComentarios(comentarios.map(c => c.id === id ? {...c, like: !c.like} : c))
  }, [comentarios]);

  const likes = useMemo(() => {
    return comentarios.filter(c => c.like).length
  }, [comentarios])

  useEffect( () => {
    fetch(`http://localhost:3020/produtos/${id}`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(json => {
      setProduto(json)
    } )
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3020/image/${id}.jpg`, {
      method: 'GET',   
      credentials: 'include',
    })
      .then(resp => resp)
      .then(json => {
        setImage(json.url)
      })
  }, [id, image]);

  return (
    <div>
      <div className="clearfix">
        <h3 className="float-start">{produto.nome}</h3>
        <div className="float-end">
          <button
            className="btn btn-sm btn-primary mx-1"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>

      <div className="d-grid mb-3">
        <span className="fs-4 fw-bold primary text-success">R${produto.preco}</span>
        {image && <img src={image} alt={produto.nome} style={{maxWidth: 720}}/>}
        <span>Estoque disponível: {produto.estoque}</span>
      </div>
      <h5>
        Descrição
      </h5>
      <p>{produto.descricao}</p>

      <div className="clearfix">
        <button onClick={() => dispatch('increment')} className="btn btn-sm btn-primary float-start">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <h2 className="float-start mx-2" style={{marginTop: '-2px'}}>{state.count}</h2>
        <button onClick={() => dispatch('decrement')} className="btn btn-sm btn-danger float-start">
          <FontAwesomeIcon icon={faMinus} />
        </button >

        <button onClick={handleCart} className="btn btn-sm btn-primary float-start mx-4">
          <strong> Adiconar ao Carrinho</strong> <FontAwesomeIcon icon={faShoppingCart} />
        </button>

      </div>

      {limiteCompraError && <div className="invalid-feedback mb-2" style={{ display: 'block' }}>
        Quantidade selecionada não é válida, precisa ser menor ou igual ao estoque
      </div>}

      {limiteCompraUpdateError && <div className="invalid-feedback mb-2" style={{ display: 'block' }}>
        Quantidade selecionada não é válida, a soma com o que já está no carrinho ultrapassa o valor em estoque
      </div>}

      <div>
        <h5>
          Comentários 
          <span className="badge rounded-pill bg-primary mx-2">
            Likes: {likes}
          </span>
        </h5>
        <form onSubmit={handleSubmit}>
          <input
          className="form-control mt-3"
          value={inputComentario}
          onChange={e => setInputComentario(e.target.value)}
          type="text" />
        </form>
        <ul className="list-group mt-3">
          {comentarios.map(comentario => <Comentario setLike={setLike} key={comentario.id} comentario={comentario}/>)}
        </ul>
      </div>
    </div>
  )
}

export default Produto
