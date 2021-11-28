import {
  AddProduto,
  EditProduto,
  Endereco,
  Header,
  Login,
  MeuCarrinho,
  Produtos,
  Produto,
  SignUp,
  Sobre,
} from './components/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="container mt3">
        <Switch>
          <Route path="/" exact component={Produtos}/>
          <Route path="/produto/add" exact component={AddProduto}/>
          <Route path="/produto/:id" exact component={Produto}/>
          <Route path="/produto/:id/edit" exact component={EditProduto}/>
          <Route path="/sobre" component={Sobre}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/cart" component={MeuCarrinho}/>
          <Route path="/endereco" component={Endereco}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
