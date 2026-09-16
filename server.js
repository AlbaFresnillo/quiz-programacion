const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const questions = [
  // --- Bloque 1: Códigos HTTP y Red ---
  {
    category: "Bloque 1: Códigos HTTP y Red",
    question:
      "¿Qué código HTTP devuelve el servidor cuando el contenido no ha cambiado y el navegador puede usar su copia en caché?",
    options: [
      "200 OK",
      "304 Not Modified",
      "204 No Content",
      "412 Precondition Failed",
    ],
    correct: 1,
    explanation:
      "304 Not Modified indica que la copia en caché sigue vigente. Se usa con cabeceras como If-None-Match o If-Modified-Since.",
  },
  {
    category: "Bloque 1: Códigos HTTP y Red",
    question: "¿Qué significa exactamente el error HTTP 403?",
    options: [
      "La página no existe",
      "El servidor se ha caído",
      "El acceso al recurso está prohibido",
      "La sesión ha caducado",
    ],
    correct: 2,
    explanation:
      "403 Forbidden indica que el servidor comprende la solicitud pero deniega el acceso, sin depender de si hay credenciales válidas.",
  },
  {
    category: "Bloque 1: Códigos HTTP y Red",
    question:
      "¿Cuál de estos métodos HTTP se considera idempotente por especificación?",
    options: ["POST", "PATCH", "PUT", "CONNECT"],
    correct: 2,
    explanation:
      "PUT es idempotente: ejecutar la misma petición varias veces deja el recurso exactamente en el mismo estado final.",
  },
  {
    category: "Bloque 1: Códigos HTTP y Red",
    question:
      "¿Qué mecanismo HTTP impide que tu web sea incrustada dentro de un <iframe> ajeno?",
    options: [
      "X-Frame-Options (o Content-Security-Policy con frame-ancestors)",
      "Access-Control-Allow-Origin",
      "Cache-Control",
      "Strict-Transport-Security",
    ],
    correct: 0,
    explanation:
      "X-Frame-Options y CSP frame-ancestors previenen ataques de clickjacking bloqueando la incrustación en iframes.",
  },
  {
    category: "Bloque 1: Códigos HTTP y Red",
    question: '¿Cuál es el código HTTP oficial conocido como "I\'m a teapot"?',
    options: ["400", "418", "505", "499"],
    correct: 1,
    explanation:
      "El código 418 nació en el RFC 2324 como una broma del April Fools' Day en 1998 y quedó en la cultura web.",
  },

  // --- Bloque 2: Atajos y DevTools ---
  {
    category: "Bloque 2: Atajos y DevTools",
    question:
      "En la consola de DevTools de Chrome, ¿qué devuelve la variable $0?",
    options: [
      "El último valor impreso en consola",
      "El elemento actualmente seleccionado en Elements",
      "El primer <script> de la página",
      "null",
    ],
    correct: 1,
    explanation:
      "$0 devuelve el nodo del DOM seleccionado en la pestaña Elements. $1, $2, etc., recuerdan selecciones anteriores.",
  },
  {
    category: "Bloque 2: Atajos y DevTools",
    question: "¿Qué atajo abre la paleta de comandos de Chrome DevTools?",
    options: [
      "Ctrl + Shift + P / Cmd + Shift + P",
      "F11",
      "Ctrl + Shift + D / Cmd + Shift + D",
      "Alt + C",
    ],
    correct: 0,
    explanation:
      "Ctrl/Cmd + Shift + P abre la paleta de comandos para ejecutar acciones rápidas (screenshots, modo oscuro, etc.).",
  },
  {
    category: "Bloque 2: Atajos y DevTools",
    question:
      "En Chrome DevTools, ¿cómo puedes simular una conexión 3G lenta o trabajar Offline?",
    options: [
      "Desde la pestaña Application exclusivamente",
      "Desde la pestaña Network, en el selector de throttling",
      "Desde la pestaña Console",
      "Desde los ajustes del sistema operativo",
    ],
    correct: 1,
    explanation:
      "En la pestaña Network puedes usar el menú de throttling para probar velocidades como Fast 3G, Slow 3G u Offline.",
  },
  {
    category: "Bloque 2: Atajos y DevTools",
    question:
      "¿Qué método de consola permite agrupar mensajes manteniéndolos inicialmente colapsados?",
    options: [
      "console.table()",
      "console.groupCollapsed()",
      "console.bundle()",
      "console.folder()",
    ],
    correct: 1,
    explanation:
      "console.groupCollapsed() crea un grupo cerrado por defecto en la consola, a diferencia de console.group().",
  },
  {
    category: "Bloque 2: Atajos y DevTools",
    question:
      "Si quieres medir cuánto tarda en ejecutarse un bloque de código sin librerías externas, ¿qué utilizas?",
    options: [
      "console.start() y console.stop()",
      "console.time() y console.timeEnd()",
      "console.benchmark()",
      "console.timer()",
    ],
    correct: 1,
    explanation:
      "console.time('etiqueta') inicia el cronómetro y console.timeEnd('etiqueta') imprime el tiempo total transcurrido.",
  },

  // --- Bloque 3: HTML y Navegadores ---
  {
    category: "Bloque 3: HTML y Navegadores",
    question:
      "¿Qué atributo HTML nativo permite cargar una imagen de forma diferida cuando se aproxima al viewport?",
    options: [
      'defer="true"',
      'async="lazy"',
      'loading="lazy"',
      'preload="none"',
    ],
    correct: 2,
    explanation:
      "loading='lazy' es el estándar nativo en navegadores para diferir la descarga de imágenes sin necesidad de scripts.",
  },
  {
    category: "Bloque 3: HTML y Navegadores",
    question:
      "Entre los atributos de <script>, ¿cuál descarga en paralelo y ejecuta de inmediato al terminar la descarga?",
    options: ["defer", "async", "inline", "preload"],
    correct: 1,
    explanation:
      "async descarga sin bloquear y ejecuta inmediatamente en cuanto llega, sin respetar el orden del HTML. defer espera al parseo.",
  },
  {
    category: "Bloque 3: HTML y Navegadores",
    question:
      "¿Cuál es la combinación de etiquetas HTML que permite crear un desplegable/acordeón sin JavaScript?",
    options: [
      "<accordion> y <content>",
      "<details> y <summary>",
      "<dropdown> y <item>",
      "<collapse> y <panel>",
    ],
    correct: 1,
    explanation:
      "<details> crea el contenedor interactivo y <summary> proporciona el encabezado interactivo donde hacer clic.",
  },
  {
    category: "Bloque 3: HTML y Navegadores",
    question:
      "¿Cuál de estos almacenamientos del navegador persiste habitualmente tras cerrar la pestaña o ventana?",
    options: [
      "sessionStorage",
      "Variables globales en memoria",
      "localStorage",
      "Estado reactivo de frontend",
    ],
    correct: 2,
    explanation:
      "localStorage persiste en disco hasta ser borrado explícitamente. sessionStorage se elimina al cerrar la sesión de pestaña.",
  },
  {
    category: "Bloque 3: HTML y Navegadores",
    question:
      "¿Qué tamaño aproximado suele tener el límite por origen para localStorage en la mayoría de navegadores?",
    options: ["500 KB", "Aproximadamente 5–10 MB", "50 MB", "Ilimitado"],
    correct: 1,
    explanation:
      "Aunque no hay un valor único obligatorio por estándar, casi todos los navegadores asignan entre 5 y 10 MB por origen.",
  },

  // --- Bloque 4: CSS y Git del día a día ---
  {
    category: "Bloque 4: CSS y Git del día a día",
    question:
      "En CSS Flexbox, ¿qué propiedad alinea los elementos en el eje transversal (cross axis)?",
    options: [
      "justify-content",
      "align-items",
      "flex-direction",
      "align-self-all",
    ],
    correct: 1,
    explanation:
      "align-items alinea en el eje transversal (perpendicular), mientras que justify-content controla el eje principal.",
  },
  {
    category: "Bloque 4: CSS y Git del día a día",
    question:
      "¿Qué unidad CSS es relativa al tamaño de fuente del elemento raíz (<html>)?",
    options: ["em", "rem", "ch", "vh"],
    correct: 1,
    explanation:
      "rem (root em) toma como base el font-size de <html>. Por el contrario, em depende del font-size del elemento padre directo.",
  },
  {
    category: "Bloque 4: CSS y Git del día a día",
    question:
      "En Git, ¿qué comando deshace el último commit manteniendo los cambios preparados (staged)?",
    options: [
      "git reset --hard HEAD~1",
      "git reset --soft HEAD~1",
      "git clean -fd",
      "git drop",
    ],
    correct: 1,
    explanation:
      "git reset --soft HEAD~1 retrocede el puntero pero conserva tus modificaciones en el área de preparación (stage).",
  },
  {
    category: "Bloque 4: CSS y Git del día a día",
    question:
      "¿Qué comando de Git guarda temporalmente tus cambios sin hacer commit para dejar la rama limpia?",
    options: ["git stash", "git pause", "git freeze", "git save"],
    correct: 0,
    explanation:
      "git stash guarda las modificaciones pendientes en un búfer temporal y limpia el espacio de trabajo; se recuperan con git stash pop.",
  },
  {
    category: "Bloque 4: CSS y Git del día a día",
    question:
      "En CSS Grid, ¿qué patrón permite crear columnas responsive que se ajusten solas al espacio disponible?",
    options: [
      "repeat(auto-fit, minmax(...))",
      "display: responsive",
      "columns: flex",
      "grid-flow: expand",
    ],
    correct: 0,
    explanation:
      "repeat(auto-fit, minmax(200px, 1fr)) genera columnas fluidas automáticas sin necesidad de añadir media queries.",
  },
];

const QUESTION_TIME = 15; // Segundos por pregunta
let timerInterval = null;
let timeLeft = QUESTION_TIME;

let gameState = {
  status: "LOBBY",
  currentQuestion: 0,
  players: {},
};

io.on("connection", (socket) => {
  socket.on("player:join", (name) => {
    gameState.players[socket.id] = {
      name: name.trim() || "Anónimo",
      score: 0,
      lastAnswer: null,
    };
    io.emit("lobby:update", Object.values(gameState.players));
  });

  socket.on("host:start", () => {
    gameState.status = "QUESTION";
    gameState.currentQuestion = 0;
    for (const id in gameState.players) {
      gameState.players[id].score = 0;
      gameState.players[id].lastAnswer = null;
    }
    startQuestionCycle();
  });

  socket.on("player:answer", (answerIdx) => {
    const player = gameState.players[socket.id];
    if (
      player &&
      gameState.status === "QUESTION" &&
      player.lastAnswer === null
    ) {
      player.lastAnswer = answerIdx;
      const isCorrect =
        answerIdx === questions[gameState.currentQuestion].correct;
      if (isCorrect) {
        // Puntuación con bonus por rapidez
        player.score += 100 + timeLeft * 5;
      }
      socket.emit("player:answered", { answerIdx });
      io.emit("host:answerCount", countAnswers());

      // Si todos han respondido, revelar de inmediato
      const { answered, total } = countAnswers();
      if (total > 0 && answered === total) {
        revealCurrentAnswer();
      }
    }
  });

  socket.on("host:reveal", () => {
    revealCurrentAnswer();
  });

  socket.on("host:next", () => {
    gameState.currentQuestion++;
    if (gameState.currentQuestion < questions.length) {
      gameState.status = "QUESTION";
      for (const id in gameState.players) {
        gameState.players[id].lastAnswer = null;
      }
      startQuestionCycle();
    } else {
      gameState.status = "FINISHED";
      clearInterval(timerInterval);
      io.emit("game:finished", getLeaderboard());
    }
  });

  socket.on("disconnect", () => {
    delete gameState.players[socket.id];
    io.emit("lobby:update", Object.values(gameState.players));
  });
});

function startQuestionCycle() {
  clearInterval(timerInterval);
  timeLeft = QUESTION_TIME;

  const q = questions[gameState.currentQuestion];
  io.emit("game:question", {
    index: gameState.currentQuestion + 1,
    total: questions.length,
    category: q.category,
    question: q.question,
    options: q.options,
    timeLimit: QUESTION_TIME,
  });

  io.emit("game:timer", timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    io.emit("game:timer", timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      revealCurrentAnswer();
    }
  }, 1000);
}

function revealCurrentAnswer() {
  if (gameState.status === "RESULT") return;
  clearInterval(timerInterval);
  gameState.status = "RESULT";

  const q = questions[gameState.currentQuestion];
  io.emit("game:reveal", {
    correct: q.correct,
    explanation: q.explanation,
    leaderboard: getLeaderboard(),
  });
}

function countAnswers() {
  const total = Object.keys(gameState.players).length;
  const answered = Object.values(gameState.players).filter(
    (p) => p.lastAnswer !== null,
  ).length;
  return { answered, total };
}

function getLeaderboard() {
  return Object.values(gameState.players)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
