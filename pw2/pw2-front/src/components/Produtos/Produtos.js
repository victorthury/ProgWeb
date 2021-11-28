import { useState, useEffect, useReducer } from "react"
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function filterPage(pageNumber, array) {
  const size = array.length
  const newArray = []
  for (let i = (pageNumber - 1) * 10; (i < pageNumber*10) && i < size; i++ ) {
    newArray.push(array[i]);
  }
  return newArray;
}

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

function Produtos() {
  
  const test = [0,1,2,3,4,5,6,7,8,9,10]
  

  const [state, dispatch] = useReducer(reducer, { count: 1 });
  const [produtos, setProdutos] = useState([]);
  const [produtosPaginate, setProdutosPaginate] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const history = useHistory();
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    fetch('http://localhost:3020/produtos', { credentials: 'include'})
    .then(resp => resp.json())
    .then(json  => setProdutos(json))
  }, [])

  // useEffect(() => {
  //   filterPage(2, test);
  // }, [])

  useEffect(() => {
    setSearchResult(produtos.filter(produto => produto.nome.toLowerCase().includes(searchString.toLowerCase())))
  }, [searchString, produtos, pageNumber]);

  const handleClick = () => {
    history.push("/produto/add")
  }

  return (
    <div>
      <div className="clearfix">
        <h3 className="float-start">Listagem de Produtos</h3>
        {user.tipoUsuario === 'colaborador' && <div className="float-end">
          <button
            className="btn btn-sm btn-primary"
            onClick={handleClick}
          ><FontAwesomeIcon icon={faPlus} /></button>
        </div>}
      </div>
      <input 
        type="text"
        placeholder="Busca"
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
        className="form-control mb-3"
      />

      {console.log(filterPage(1, produtos))}

      <ul className="list-group">
        {searchString === '' ?
          filterPage(state.count, produtos).map(produto =>
            <li key={produto.id} className="list-group-item">
              <Link to={`produto/${produto.id}`}>
                {produto.nome}
              </Link>
            </li>
          ):
          filterPage(state.count, searchResult).map(produto =>
            <li key={produto.id} className="list-group-item">
              <Link to={`produto/${produto.id}`}>
                {produto.nome}
              </Link>
            </li>
          )
        }
      <div className="mt-2 d-flex justify-content-center">
          <button onClick={() => dispatch('decrement')} className="btn btn-sm btn-primary mx-2">
          Anterior
        </button>
          <button onClick={() => dispatch('increment')} className="btn btn-sm btn-primary mx-2">
          Próximo
        </button>
      </div>
        
      </ul>
    </div>
  )
}

export default Produtos
