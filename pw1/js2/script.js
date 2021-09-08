function numberToJokenpo(number) {
  const conversor = {
    1: 'Papel',
    2: 'Pedra',
    3: 'Tesoura',
  }
  return conversor[number];
}

function jokenpo(escolhaDoUsuario, escolhaDoComputador) {

  console.log(`Você jogou ${numberToJokenpo(escolhaDoUsuario)}\nO computador jogou ${numberToJokenpo(escolhaDoComputador)}`);
  
  if (escolhaDoUsuario === 1 && escolhaDoComputador === 2
    ||escolhaDoUsuario === 2 && escolhaDoComputador === 3
    ||escolhaDoUsuario === 3 && escolhaDoComputador === 1
  ){
    return 2
  } else if (escolhaDoUsuario === escolhaDoComputador) {
    return 1;
  }
  return 0;
}

function resultadoDaRodada(resultado, pontuacao) {
  if (resultado === 2) {
    console.log('%cVocê ganhou!', 'color: green')
    return 1
  } else {
    if (resultado === 1) {
      console.log('%cA rodada empatou!', 'color: orange')
    } else {
      console.log('%cVocê Perdeu!', 'color: red;', `A sua pontuação foi de ${pontuacao}`)
    }
    return 0
  }
}

function game() {
  let jogador = null;
  let pontuacao = 0;
  let resultado = 1;
  do {
    console.log('Escolha a sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura')
    jogador = parseInt(prompt()) ;
    const computador = Math.floor(Math.random() * Math.floor(3)) + 1;
    resultado = jokenpo(jogador, computador)
    pontuacao += resultadoDaRodada(resultado, pontuacao);
  } while (resultado && (jogador > 0 && jogador <= 3));
}

game();