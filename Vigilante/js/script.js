(function() {

  let FPS = 1;
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let caveiraDimensions = [250, 285];
  let devastacaoDimensions = [100, 100];
  let devastacaoGrandeDimensions = [250, 250];
  let lagosPositions = [
  // LAGO 1
    [
      [650, 0],
      [650, 224],
      [1075, 95],
      [1120, 0],
      [650, 0],
    ],
    // LAGO 1
    [
      [20, 400],
      [280, 400],
      [280, 830],
      [20, 830],
      [20, 450],
    ]
  ];

  let probFoco = 1;
  let probCaveira = 15;
  let reserva;
  let barraDeVida;
  let placar;
  let focoPosition;
  let focos = [];
  let gameLoop;
  let relogioFoco = 0;
  let relogioCaveira = 0
  let relogioGlobal = 0
  let gameOver = false;
  let firstPlay = true;
  let paused = false;

  function init() {
    if (firstPlay) {
      throwGameInfo('start');
      firstPlay = false;
    }
    window.addEventListener("keydown", function (e) {
      if (e.key === 's' || e.key === 'S') {
        cleanDom();
        reserva = new Reserva();
        barraDeVida = new BarraDeVida();
        placar = new Placar();
        gameLoop = setInterval(run, 1000 / FPS);
      }
    })
  }
  

  function resetVar() {
    FPS = 1;
    gameDimensions = [1243, 960];
    focoDimensions = [100, 130];
    caveiraDimensions = [250, 285];
    devastacaoDimensions = [100, 100];
    devastacaoGrandeDimensions = [250, 250];
    lagosPositions = [
      // LAGO 1
      [
        [650, 0],
        [650, 224],
        [1075, 95],
        [1120, 0],
        [650, 0],
      ],
      // LAGO 1
      [
        [20, 400],
        [280, 400],
        [280, 830],
        [20, 830],
        [20, 450],
      ]
    ];

    probFoco = 1;
    probCaveira = 15;
    reserva;
    barraDeVida;
    placar;
    focoPosition;
    focos = [];
    gameLoop;
    relogioFoco = 0;
    relogioCaveira = 0
    relogioGlobal = 0
    gameOver = false;
  }

  function cleanDom() {
    clearInterval(gameLoop);
    document.body.innerHTML = '';
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'p' || e.key === 'P') {
      paused = !paused;
      if(paused) {
        focos.forEach(foco => {
          foco.limpaTimeout();
        });
        clearInterval(gameLoop);
        throwGameInfo('pause');
      } else {
        document.body.removeChild(document.body.querySelector('.blur'));
        gameLoop = setInterval(run, 1000 / FPS);
        focos.forEach(foco => {
          foco.setFocoTimeout();
        });
      }
    }
  })

  class Reserva {
    constructor () {
      this.element = document.createElement('div');
      this.element.className = 'reserva';
      this.element.style.width =`${gameDimensions[0]}px`;
      this.element.style.height =`${gameDimensions[1]}px`;
      document.body.appendChild(this.element);
    }
  }

  class FocoIncendio {
    constructor () {
      this.element = document.createElement('div');

      this.element.className = 'foco-incendio';
      
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;


      this.leftPosition = focoPosition[0];
      this.topPosition = focoPosition[1];
      
      this.element.style.left = `${this.leftPosition}px`;
      this.element.style.top = `${this.topPosition}px`;

      this.devastacaoWidth = devastacaoDimensions[0];
      this.devastacaoHeight = devastacaoDimensions[1];

      this.focoCss = 'foco-devastacao';
      this.focoLifeDecrement = 1;
      
      this.element.addEventListener('click', this.removeFoco);

      
      this.timerFunction = () => {
        if (reserva.element) {
          this.element.removeEventListener('click', this.removeFoco);
          this.element.className = this.focoCss;
          this.element.style.width = `${this.devastacaoWidth}px`;
          this.element.style.height = `${this.devastacaoHeight}px`;
          this.topPosition += 60;
          this.element.style.top = `${this.topPosition}px`;
          const quantidadeDevastacao = document.querySelectorAll('.foco-devastacao').length
          const quantidadeDevastacaoGrande = document.querySelectorAll('.caveira-devastacao').length
          barraDeVida.setQuantidadeDevastacao(quantidadeDevastacao);
          barraDeVida.setQuantidadeDevastacaoGrande(quantidadeDevastacaoGrande);
          barraDeVida.updateLife();
          focos.pop(this);
        }
      }

      this.timer = setTimeout(this.timerFunction, 2000);

      // this.timer = setTimeout(() => {
      //   if (reserva.element) {
      //     this.element.removeEventListener('click', this.removeFoco);
      //     this.element.className = this.focoCss;
      //     this.element.style.width = `${this.devastacaoWidth}px`;
      //     this.element.style.height = `${this.devastacaoHeight}px`;
      //     this.topPosition += 60;
      //     this.element.style.top = `${this.topPosition}px`;
      //     const quantidadeDevastacao = document.querySelectorAll('.foco-devastacao').length
      //     const quantidadeDevastacaoGrande = document.querySelectorAll('.caveira-devastacao').length
      //     barraDeVida.setQuantidadeDevastacao(quantidadeDevastacao);
      //     barraDeVida.setQuantidadeDevastacaoGrande(quantidadeDevastacaoGrande);
      //     barraDeVida.updateLife();
      //     focos.pop(this);
      //   }
      // }, 2000);

      reserva.element.appendChild(this.element);
    }

    getElement() {
      return this.element;
    }

    removeFoco(e) {
      const element = e.target;
      const timeoutId = focos.pop(element);
      if (timeoutId) {
        clearTimeout(timeoutId.timer)
      }
      placar.incrementPoints();
      reserva.element.removeChild(element);
    }

    limpaTimeout() {
      clearTimeout(this.timer);
    }

    setFocoTimeout() {
      this.timer = setTimeout(this.timerFunction, 2000);
    }
  }

  class CaveiraDeFogo extends FocoIncendio {
    constructor() {
      super();
      this.element.className = 'caveira';
      this.focoCss = 'caveira-devastacao';
      this.focoLifeDecrement = 2;
      this.element.style.width = `${caveiraDimensions[0]}px`;
      this.element.style.height = `${caveiraDimensions[1]}px`;
      this.devastacaoWidth = devastacaoGrandeDimensions[0];
      this.devastacaoHeight = devastacaoGrandeDimensions[1];
    }
  }

  class BarraDeVida {
    constructor(numberOfLives = 5) {
      this.element = document.createElement('div');
      this.element.className = 'barra-status';
      this.lives = numberOfLives;
      this.remainingLives = numberOfLives;
      this.element.innerHTML = `×${this.lives}`;
      this.quantidadeDevastacao = 0;
      this.quantidadeDevastacaoGrande = 0;
      document.body.appendChild(this.element);
    }

    updateLife() {
      const remainingLives = this.lives - (this.quantidadeDevastacao + 2 * this.quantidadeDevastacaoGrande)
      const remainingLivesNormalized = remainingLives < 0 ? 0 : remainingLives;
      this.remainingLives = remainingLivesNormalized;
      this.element.innerHTML = `×${remainingLivesNormalized}`;
    }

    setQuantidadeDevastacao(value) {
      this.quantidadeDevastacao = value
    }

    setQuantidadeDevastacaoGrande(value) {
      this.quantidadeDevastacaoGrande = value
    }

    getVidas() {
      return this.remainingLives;
    }
  }

  class Placar {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'placar';
      this.pontos = 0
      this.pontosFormatado = zeroPad(this.pontos, 5);
      this.element.innerHTML = `placar ${this.pontosFormatado}`
      document.body.appendChild(this.element);
    }

    incrementPoints() {
      this.pontos += 10
      this.pontosFormatado = zeroPad(this.pontos, 5);
      this.element.innerHTML = `placar ${this.pontosFormatado}`
    }

    getPoints() {
      return this.pontosFormatado;
    }
  }

  function setFocoPosition(focoDim) {
    let isLago = true;
    while(isLago) {
      position = [
        Math.floor((Math.random() * (gameDimensions[0] - focoDim[0]))),
        Math.floor((Math.random() * (gameDimensions[1] - focoDim[1]))),
      ];
      isLago = isFocoPositionLake(position);
    }
    return position;
  }

  function isFocoPositionLake(focoPosition) {
    for (let i = 0; i < lagosPositions.length; i++) {
      if (inside(focoPosition, lagosPositions[i])) {
        return true;
      }
    }
    return false;
  }

  function inside(point, vs) {
    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];

      var intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  };

  const zeroPad = (num, places) => String(num).padStart(places, '0');

  function throwGameInfo (info) {
    const element = document.createElement('div');
    element.className = 'blur';

    const gameOverInfo = document.createElement('div');
    gameOverInfo.className = 'game-info';

    const title = document.createElement('h1');
    if (info === 'start') {
      title.innerText = 'Vigilantes da Floresta';
    } else if (info === 'gameover'){
      title.innerText = 'GAME OVER';
    } else if (info === 'pause'){
      title.innerText = 'PAUSE';
    }

    const pontuacao = document.createElement('p');
    if (info === 'start') {
      pontuacao.innerText = '\n\n\n Pressione S para começar o jogo';
    } else if (info === 'gameover') {
      pontuacao.innerText = `Você fez ${placar.getPoints()} pontos \n\n\n pressione S para recomeçar`
    }


    gameOverInfo.appendChild(title)
    gameOverInfo.appendChild(pontuacao)

    element.appendChild(gameOverInfo)
    
    document.body.appendChild(element);
    gameOver = true;
  }
  
  function run() {

    if (barraDeVida.getVidas() <= 0) {
      throwGameInfo('gameover');
      clearInterval(gameLoop);
      resetVar();
      init()
    } else {
      if (Math.random() * 4 < probFoco || relogioFoco == 4) {
        focoPosition = setFocoPosition(focoDimensions)
        if (!isFocoPositionLake(focoPosition)) {
          let foco = new FocoIncendio();
          focos.push(foco);
          relogioFoco = 0
        }
      } else {
        relogioFoco ++;
      }
  
      if ((relogioCaveira >= 5 && Math.random() * 60 < probCaveira) || relogioCaveira == 20) {
        focoPosition = setFocoPosition(caveiraDimensions)
        if (!isFocoPositionLake(focoPosition)) {
          let foco = new CaveiraDeFogo();
          focos.push(foco);
        }
        relogioCaveira = 0;
      } else {
        relogioCaveira ++;
      }
  
      if (relogioGlobal > 59 && relogioGlobal % 60 == 0) {
        FPS += 1;
        clearInterval(gameLoop);
        gameLoop = setInterval(run, 1000 / FPS);
      }
  
      relogioGlobal ++;
    }
    console.log(focos)
  }

  init();
})();