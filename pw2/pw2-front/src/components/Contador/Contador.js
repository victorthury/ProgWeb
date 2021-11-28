import { useState, useEffect } from "react"

function Contador() {
  
  const [contador, setContador] = useState(0);

  useEffect(() => {
    document.title = `Contador ${contador}`
  }, [contador]);
  
  useEffect(() => {
    console.log('Carregamento inicial do componente')
  },[])

  return (
    <div>
      <h3>
        {contador}
      </h3>
      <button onClick={() => setContador(contador +  1)} className="btn btn-primary">+</button>
      <button onClick={() => setContador(contador - 1)} className="btn btn-danger mx-2">-</button>
    </div>
  )
}

export default Contador
