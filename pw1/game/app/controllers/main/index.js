const index = (req, res) => {
  const conteudo = 'Jogo Vigilantes da Floresta';
  res.render('main/index', {
    conteudo: conteudo
  });
};
const sobre = (req, res) => {
  const conteudo = 'Sobre o jogo';
  res.render('main/sobre', {
    conteudo: conteudo
  });
};

const ui = (req, res) => {
  res.render('main/ui');
}

const jogo = (req, res) => {
  res.render('main/jogo', { layout: 'jogo' });
}
module.exports = { index, sobre, ui, jogo }