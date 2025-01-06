/*
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosMaquina = 0;

// Referencias del HTML
const btnIniciar = document.querySelector("#btnIniciar");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const puntosJugadorHTML = document.querySelectorAll("small")[0];
const puntosMaquinaHTML = document.querySelectorAll("small")[1];

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasMaquina = document.querySelector("#maquina-cartas");

// Función para crear un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let especial of especiales) {
    for (let tipo of tipos) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

// Funcion para pedir una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};

// Obtener el valor de la carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Agregar carta HTML
const agregarCartaHTML = (carta, turno) => {
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  if (turno === "jugador") {
    divCartasJugador.append(imgCarta);
  } else {
    divCartasMaquina.append(imgCarta);
  }
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  // Sumar puntos
  puntosJugador += valorCarta(carta);
  puntosJugadorHTML.innerText = puntosJugador;

  // Crear imagen de la carta
  agregarCartaHTML(carta, "jugador");

  if (puntosJugador > 21) {
    console.warn("Perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoMaquina(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoMaquina(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoMaquina(puntosJugador);
});

btnIniciar.addEventListener("click", () => {
  console.clear();
  deck = crearDeck();

  puntosJugador = 0;
  puntosMaquina = 0;

  puntosJugadorHTML.innerText = 0;
  puntosMaquinaHTML.innerText = 0;

  divCartasJugador.innerHTML = "";
  divCartasMaquina.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});

// Turno de la máquina
const turnoMaquina = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosMaquina += valorCarta(carta);
    puntosMaquinaHTML.innerText = puntosMaquina;

    agregarCartaHTML(carta, "maquina");

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosMaquina < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosMaquina === puntosMinimos) {
      alert("Nadie gana");
    } else if (puntosMinimos > 21) {
      alert("La máquina gana");
    } else if (puntosMaquina > 21) {
      alert("El Jugador gana");
    } else {
      alert("La máquina gana");
    }
  }, 100);
};
