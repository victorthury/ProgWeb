const counter = function (valor) {
  let b = valor;
  return function () {
    b += 1;
    return b
  }
}

let incrementar = counter(1);
console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());
// Resultado esperado
// Primeira chamada 2
// Segunda chamada 3
// Terceira chamada 4