(function () {
  const pontos = [];
  document.addEventListener("mousemove", function (event) {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    if (pontos.length >= 8) {
      const removedDot = pontos.shift();
      document.body.removeChild(removedDot);
    }
    pontos.push(dot);
    console.log(pontos)
    document.body.appendChild(dot);
  });
})();