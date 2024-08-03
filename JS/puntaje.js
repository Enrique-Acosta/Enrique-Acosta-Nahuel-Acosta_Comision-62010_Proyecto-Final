class PuntajeManager {
  constructor() {
    this.puntajes = [];
    this.cargarPuntajes();
  }

  cargarPuntajes() {
    const puntajesGuardados = localStorage.getItem('puntajes');
    if (puntajesGuardados) {
      this.puntajes = JSON.parse(puntajesGuardados);
    }
  }

  guardarPuntaje(puntaje) {
    this.puntajes.push(puntaje);
    localStorage.setItem('puntajes', JSON.stringify(this.puntajes));
  }

  mostrarPuntajes() {
    const puntajesDiv = document.getElementById('puntajes');
    puntajesDiv.innerHTML = '<h2>Puntajes:</h2>';
    this.puntajes.forEach((puntaje, index) => {
      const p = document.createElement('p');
      p.textContent = `Juego ${index + 1}: ${puntaje} puntos`;
      puntajesDiv.appendChild(p);
    });
  }
}

