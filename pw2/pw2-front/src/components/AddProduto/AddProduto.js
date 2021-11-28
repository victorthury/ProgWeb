import { useState } from "react"
import { useSelector } from 'react-redux';
import { useHistory , Link} from 'react-router-dom';

function AddProduto() {

  const user = useSelector(state => state.user)
  
  const [nome, setNome] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('0');
  const [estoque, setEstoque] = useState('10');
  const [imagem, setImagem] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const produto = { nome, descricao, preco, estoque, imagem };
    const keys = Object.keys(produto);
    const formData = new FormData();

    keys.forEach((key, index) => {
      formData.append(key, produto[key]);
    })

    for (var value of formData.values()) {
      console.log(value);
    }

    // setIsPending(true);

    fetch('http://localhost:3020/produtos', {
      method: 'POST',
      credentials: 'include',
      body: formData
    }).then(resp => {
      console.log('oi')
      return resp.json()
    })
    .then(json => {
      setIsPending(false);
      if (json.errors) {
        json.errors.forEach(error => {
          if (error.path === 'nome') setNomeError(error.message);
        });
      } else {
        history.push(`/produto/${json.id}`);
      }
    })
  }

  if (user.tipoUsuario !== 'colaborador') {
    return (
      <div>
        <h2 className='d-flex justify-content-center'>
          Acesso negado, apenas para colaboradores!
        </h2>
        <h2 className='d-flex justify-content-center'>
          <Link to="/">Volte às compras ;)</Link>
        </h2>
      </div>
    )
  }

  return (
    <div>
      <h3>Adição de produtos</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          required
          value={nome}
          onChange={(e)=> setNome(e.target.value)}
          id="nome"
          className={nomeError === '' ? 'form-control' : 'form-control is-invalid'}
          placeholder="Nome"
        />
        <div className="invalid-feedback" style={{display: 'block'}}>
          {nomeError}
        </div>
        
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          required
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="form-control"
          placeholder="Descrição"
        />
        
        <label htmlFor="preco">Preço</label>
        <input
          type="number"
          required
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          id="preco"
          className="form-control"
          placeholder="Preço"
        />
        
        <label htmlFor="estoque">Estoque</label>
        <select
          id="estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          className="form-control"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label mt-2">Escolha uma imagem para o produto</label>
          <input 
            onChange={(e) => setImagem(e.target.files[0])} 
            className="form-control"
            type="file"
            id="formFile"
            required
          />
        </div>

        {isPending ? 
        <button disabled className="btn btn-primary mt-3" type="submit">Enviando dados...</button>:
        <button className="btn btn-primary mt-3" type="submit">Enviar</button>
        }
      </form>
    </div>
  )
}

export default AddProduto
