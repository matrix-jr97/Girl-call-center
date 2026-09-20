const characters = [
  {
    id: "emma",
    name: "Emma",
    letter: "E",
    desc: "Calme, chaleureuse et attentive. Idéale pour discuter.",
    tone: "Violet"
  },
  {
    id: "max",
    name: "Max",
    letter: "M",
    desc: "Drôle, énergique et décontracté.",
    tone: "Blue"
  },
  {
    id: "nova",
    name: "Nova",
    letter: "N",
    desc: "Futuriste, curieuse et passionnée par la technologie.",
    tone: "Indigo"
  }
];

let selected = null;
let running = false;
let seconds = 900;
let interval = null;

const list = document.getElementById("characters");
const balance = document.getElementById("balance");
const panel = document.getElementById("callPanel");
const callName = document.getElementById("callName");
const callAvatar = document.getElementById("callAvatar");
const timer = document.getElementById("timer");
const status = document.getElementById("callStatus");
const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");

function fmt(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;
}

function render() {
  list.innerHTML = characters
    .map(
      (character) => `
        <article class="card">
          <div class="avatar">${character.letter}</div>

          <h3>${character.name}</h3>

          <p>${character.desc}</p>

          <button onclick="selectCharacter('${character.id}')">
            📞 Choisir
          </button>
        </article>
      `
    )
    .join("");

  balance.textContent = fmt(seconds);
}

window.selectCharacter = function (id) {
  selected = characters.find((character) => character.id === id);

  if (!selected) {
    return;
  }

  callName.textContent = selected.name;
  callAvatar.textContent = selected.letter;
  status.textContent = "Prêt à commencer";

  panel.classList.remove("hidden");

  panel.scrollIntoView({
    behavior: "smooth"
  });
};

startBtn.onclick = function () {
  if (!selected || running) {
    return;
  }

  if (seconds <= 0) {
    alert("Crédit insuffisant.");
    return;
  }

  running = true;

  status.textContent = "Appel en cours — prototype";

  startBtn.classList.add("hidden");
  endBtn.classList.remove("hidden");

  interval = setInterval(() => {
    seconds = Math.max(0, seconds - 1);

    render();

    timer.textContent = fmt(seconds);

    if (seconds === 0) {
      endCall("Crédit épuisé");
    }
  }, 1000);
};

endBtn.onclick = function () {
  endCall("Appel terminé");
};

function endCall(message) {
  running = false;

  clearInterval(interval);

  interval = null;

  status.textContent = message;

  startBtn.classList.remove("hidden");
  endBtn.classList.add("hidden");
}

document.getElementById("buyBtn").onclick = function () {
  alert(
    "Le paiement Telegram Stars sera activé dans la version backend. Aucun paiement n'est effectué dans ce prototype."
  );
};

render();
