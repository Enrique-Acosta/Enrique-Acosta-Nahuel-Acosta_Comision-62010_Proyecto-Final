class JuegoTrivia {
  constructor() {
      this.preguntas = [];
      this.preguntaActual = 0;
      this.puntaje = 0;
      this.puntajeManager = new PuntajeManager();
      this.audioElement = document.getElementById('musica');
      this.clickSound = document.getElementById('clickSound');
      this.muteButton = document.getElementById('muteButton');
      // Icono Mute 
      this.muteIcons = {
          unmute: document.querySelector('#muteButton .fa-volume-up'),
          mute: document.querySelector('#muteButton .fa-volume-mute'),
      };
      this.isMuted = false;

      // Event listener para el botón de mute
      this.muteButton.addEventListener('click', () => this.toggleMute());
      this.audioElement.volume = 0.3;

      document.getElementById('comenzarJuego').addEventListener('click', () => this.iniciarJuego());

      // Añadir eventos de clic a los botones de respuesta
      document.addEventListener('click', (event) => {
          if (event.target.tagName === 'BUTTON' && event.target.id !== 'comenzarJuego') {
              this.playClickSound();
          }
      });
  }

  async cargarPreguntas() {
      try {
          const response = await fetch('data/preguntas.json');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          this.preguntas = await response.json();
          this.mostrarPregunta();
      } catch (error) {
          console.error('Error al cargar las preguntas:', error);
      }
  }

  mostrarPregunta() {
      if (this.preguntaActual < this.preguntas.length) {
          const pregunta = this.preguntas[this.preguntaActual];
          const preguntaDiv = document.getElementById('pregunta');
          preguntaDiv.innerHTML = pregunta.pregunta;
          
          // IMG DE ALGUNAS PREGUNTAS
          if (pregunta.img) {
              const imgElement = document.createElement('img');
              imgElement.src = pregunta.img;
              imgElement.alt = 'Imagen de la pregunta';
              imgElement.style.display = 'block';
              imgElement.style.margin = '20px auto';
              preguntaDiv.appendChild(imgElement);
          }

          const respuestasDiv = document.getElementById('respuestas');
          respuestasDiv.innerHTML = '';
          pregunta.respuestas.forEach((respuesta, index) => {
              const button = document.createElement('button');
              button.textContent = respuesta;
              button.onclick = () => this.verificarRespuesta(index);
              respuestasDiv.appendChild(button);
          });
      }else {
          this.mostrarResultado();
        }
  }

  verificarRespuesta(index) {
      const pregunta = this.preguntas[this.preguntaActual];
      if (pregunta && pregunta.correcta === index) {
          this.puntaje++;
      } else {
          this.mostrarResultado();
          return;
      }
      this.preguntaActual++;
      this.mostrarPregunta();
  }

  mostrarResultado() {
      document.getElementById('pregunta').innerHTML = 'Juego Terminado';
      document.getElementById('respuestas').innerHTML = '';
      document.getElementById('resultado').innerHTML = `Tu puntaje es: ${this.puntaje}`;
      this.puntajeManager.guardarPuntaje(this.puntaje);
      this.puntajeManager.mostrarPuntajes();
      this.mostrarBotonJugarNuevamente();
      document.getElementById('puntajes').style.display = 'block';
  }

  iniciarJuego() {
      // Inicializar puntaje y pregunta actual
      this.puntaje = 0;
      this.preguntaActual = 0;

      // Ocultar resultados y botón de jugar nuevamente
      document.getElementById('resultado').innerHTML = '';
      document.getElementById('boton-jugar-nuevamente').innerHTML = '';
      
      document.getElementById('puntajes').style.display = 'none';
      document.getElementById('inicio').style.display = 'none';
      document.getElementById('juego').style.display = 'block';
      this.cargarPreguntas();
      this.audioElement.play().catch(error => {
          console.error('Error al reproducir la música:', error);
      });
  }
  // BOTON PLAY AGAIN
  mostrarBotonJugarNuevamente() {
      const jugarNuevamenteButton = document.createElement('button');
      jugarNuevamenteButton.textContent = 'Jugar nuevamente';
      jugarNuevamenteButton.addEventListener('click', () => location.reload());
      document.getElementById('boton-jugar-nuevamente').appendChild(jugarNuevamenteButton);
  }

  // MUTEAR Y DESMUTEAR
  toggleMute() {
      this.isMuted = !this.isMuted;
      this.audioElement.muted = this.isMuted;
      this.muteIcons.unmute.style.display = this.isMuted ? 'none' : 'inline';
      this.muteIcons.mute.style.display = this.isMuted ? 'inline' : 'none';
  }
  
  playClickSound() {
      this.clickSound.play().catch(error => {
          console.error('Error al reproducir el sonido de clic:', error);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new JuegoTrivia();
});



  