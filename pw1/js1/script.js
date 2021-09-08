function renderTable() {
  let html = '';
  
  for (let i = 0; i < 10; i++) {
    multiplicando = i + 1

    html += '<table border="1">'
    html += '<thead>'
    html += '<tr>'
    html += `<th colspan="2">Produtos de ${multiplicando}</th>`
    html += '</tr>'
    html += '</thead>'

    html += '<tbody>'

    for (let j = 0; j < 10; j++) {
      multiplicador = j + 1;
      html += '<tr>'
      html += '<td>'
      html += `${multiplicando}x${multiplicador}`
      html += '</td>'

      html += '<td>'
      html += multiplicando * multiplicador
      html += '</td>'

      html += '</tr>'
    }
    html += '</tbody>'

    html += '</table>'
  }


  document.querySelector('div').innerHTML = html;
}

renderTable();