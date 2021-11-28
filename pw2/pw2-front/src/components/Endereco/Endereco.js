import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, } from 'react-router-dom';
import { clearCart } from '../../redux/slicer/cartSlicer';

function Endereco() {

  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart);

  const [enderecos, setEnderecos] = useState([]);
  const [logradouro, setLogradouro] = useState('');
  const [logradouroError, setLogradouroError] = useState('');
  const [numero, setNumero] = useState('');
  const [numeroError, setNumeroError] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [disable, setDisable] = useState(false)
  const [checkedRadio, setCheckedRadio] = useState('novo');
  const history = useHistory();

  const dispatch = useDispatch()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let novoEndereco = 0;
    if (checkedRadio === 'novo') {
      const endereco = {
        usuarioId: user.id,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
        cep,
      }

      await fetch(`${process.env.REACT_APP_API}/enderecos/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(endereco)
      }).then(resp => resp.json())
        .then(json => {
          novoEndereco = json.endereco.id
          // setEnderecoId(json.endereco.id)
      })
    } else {
      novoEndereco = parseInt(checkedRadio);
    }
    
    const compra = {usuarioId: user.id}

    const compraResponse = await fetch(`${process.env.REACT_APP_API}/compras/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(compra)
    }).then(resp => resp.json())
      .then(json => json)
    console.log(compraResponse)

    console.log(cart.produtos)

    const compraItems = cart.produtos.map(produto => {
      return {
        produtoId: produto.id,
        compraId: compraResponse.compra.id,
        quantidade: produto.quantidade
      }
    })

    console.log(compraItems)

    fetch(`${process.env.REACT_APP_API}/compraitems/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(compraItems)
    }).then(resp => resp.json())
      .then(json => json)

    dispatch(clearCart());
    alert('Compra concluída com sucesso! Volte sempre!')
    history.push('/')
  }

  const handleRadio = (e) => {
    setCheckedRadio(e.target.value)
    if (e.target.value === 'novo') {
      console.log('habilitado')
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  useEffect(() => {
    if (user.logado) {
      console.log(user)
      fetch(
        `${process.env.REACT_APP_API}/enderecos/${user.id}`,
        {credentials: 'include'}
      )
      .then(resp => {
        if(resp.status === 404) {
          console.log('User nao tem end')
          return {status: 404}
        }
        return resp.json()
      })
      .then(json =>{
        if (json.status === 404) {
          console.log('Nao tem endereco')
        } else {
          setEnderecos(json)
        }
      })
    }
  }, [])

  return (
    <div>
      <h3>Endereço</h3>
      
      <form onSubmit={handleSubmit}>
      <div id="formNovoEndereco">
        <div id="selecaoEndereco">
          <h4>Selecione um endereço</h4>
          <div >
            <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio" 
                  id="novoEndereco"value="novo"
                  name="endereco"
                  checked={checkedRadio === 'novo'}
                  onChange={handleRadio}
                />
              <label className="form-check-label" htmlFor="novoEndereco">
                Novo Endereço
              </label>
            </div>

            {enderecos.map(endereco => {
              return (
                <div key={endereco.id} className="form-check">
                  <input
                    onClick={handleRadio}
                    className="form-check-input"
                    type="radio"
                    id={`endereco-${endereco.id}`}
                    value={endereco.id}
                    name={`endereco-${endereco.id}`}
                    checked={checkedRadio === endereco.id.toString()}
                    onChange={handleRadio}
                  />
                  <label className="form-check-label" htmlFor={`endereco-${endereco.id}`}>
                    <span>&#8470;</span> {endereco.numero}, Rua: {endereco.logradouro} - Bairro: {endereco.bairro} - Cidade: {endereco.cidade} - UF: {endereco.uf} - CEP: {endereco.numero}
                  </label>
                </div>
                )
            })}

          </div>
        </div>
        <h4>Adicione um novo endereço</h4>
          <label htmlFor="logradouro">Logradouro</label>
          <input
            type="text"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            id="logradouro"
            className={logradouroError === '' ? 'form-control' : 'form-control is-invalid'}
            placeholder="Logradouro"
            disabled={disable}
            required={!disable}
          />
          <div className="invalid-feedback" style={{ display: 'block' }}>
            {logradouroError}
          </div>

          <label htmlFor="Número">Número</label>
          <input
            type="number"
            id="número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className={numeroError === '' ? 'form-control' : 'form-control is-invalid'}
            placeholder="Número"
            disabled={disable}
            required={!disable}
          />

          <label htmlFor="bairro">Bairro</label>

          <input
            type="text"
            id="bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            className="form-control"
            placeholder="Bairro"
            disabled={disable}
            required={!disable}
          />

          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="form-control"
            placeholder="Cidade"
            disabled={disable}
            required={!disable}
          />

          <label htmlFor="uf">UF</label>
          <input
            type="text"
            value={uf}
            id="uf"
            onChange={(e) => setUf(e.target.value)}
            onChange={(e) => setUf(e.target.value)}
            className="form-control"
            placeholder="UF exemplo: AM"
            disabled={disable}
            required={!disable}
          />

          <label htmlFor="cep">CEP</label>
          <input
            type="number"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            id="cep"
            className="form-control"
            placeholder="CEP (apenas números)"
            disabled={disable}
            required={!disable}
          />
        </div>
        {isPending ?
          <button disabled className="btn btn-primary mt-3" type="submit">Enviando dados...</button> :
          <button className="btn btn-primary mt-3" type="submit">Enviar</button>
        }
      </form>
    </div>
  )
}

export default Endereco
