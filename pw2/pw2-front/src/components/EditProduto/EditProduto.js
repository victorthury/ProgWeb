import { useEffect, useState } from "react"
// import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function EditProduto() {

  // const user = useSelector(state => state.user)

  const [nome, setNome] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('0');
  const [estoque, setEstoque] = useState('10');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3020/produtos/${id}`, { credentials: 'include' })
      .then(resp => resp.json())
      .then(json => {
        setNome(json.nome);
        setDescricao(json.descricao);
        setPreco(json.preco);
        setEstoque(json.estoque);
      })
  }, [id])

  const handleSubmit = (e) => {

    const produto = { nome, descricao, preco, estoque };
    setIsPending(true);

    e.preventDefault();
    fetch(`http://localhost:3020/produtos/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    }).then(resp => resp.json())
      .then(json => {
        setIsPending(false);
        if (json.errors) {
          json.errors.forEach(error => {
            if (error.path === 'nome') setNomeError(error.message);
          });
        } else {
          history.push(`/produto/${id}`);
        }
      })
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
          onChange={(e) => setNome(e.target.value)}
          id="nome"
          className={nomeError === '' ? 'form-control' : 'form-control is-invalid'}
          placeholder="Nome"
        />
        <div className="invalid-feedback" style={{ display: 'block' }}>
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
        {isPending ?
          <button disabled className="btn btn-primary mt-3" type="submit">Enviando dados...</button> :
          <button className="btn btn-primary mt-3" type="submit">Enviar</button>
        }
      </form>
    </div>
  )
}

export default EditProduto
