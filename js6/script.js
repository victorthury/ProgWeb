function getBarsHeights() {
  const barHeightArray = [];
  for (let i = 0; i < 5; i++) {
    const barHeightValue = document.getElementById(`bar-height-0${i+1}`).value;
    barHeightArray.push(barHeightValue);
  }
  return barHeightArray;
}

function getBarWidth() {
  const barWidthValue = document.getElementById('bar-width').value;
  return barWidthValue;
}

function convertToPixelString(value) {
  return value ? `${value}px` : '0';
}

function setGraphDimensions(barWidth, barsHeights) {
  const graph = document.getElementById('graph');

  const graphWidth = Number(barWidth) * 5 + 4 * 5;
  const graphHeight = Math.max(...barsHeights.map(e => Number(e)));

  graph.style.setProperty('width', `${graphWidth}px`);
  graph.style.setProperty('height', `${graphHeight}px`);
}



function setBarsStyleProperties(barWidth, barsHeights) {
  const barWidthString = convertToPixelString(barWidth);

  barsHeights.forEach((height, i) => {
    const bar = document.getElementById(`bar-0${i + 1}`);
    const barHeightString = convertToPixelString(height);

    bar.style.setProperty('height', barHeightString);
    bar.style.setProperty('width', barWidthString);

    const barPosition = (Number(barWidth) + 10) * i;
    const barPositionString = convertToPixelString(barPosition);
    bar.style.setProperty('left', barPositionString);
  });
}

function drawGraph() {
  const barWidth = getBarWidth();
  const barsHeights = getBarsHeights();

  setGraphDimensions(barWidth, barsHeights);
  setBarsStyleProperties(barWidth, barsHeights);

}

const button = document.getElementById('draw-graph');
button.onclick = () => {
  drawGraph();
}