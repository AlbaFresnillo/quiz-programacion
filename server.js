const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const questions = [
  // --- Bloque 1: Componentes y Arquitectura Moderna ---
  {
    category: "Bloque 1: Componentes y Arquitectura",
    question:
      "En Angular moderno, ¿cuál es la forma estándar de declarar componentes sin necesidad de NgModule?",
    options: [
      "Dynamic Components",
      "Standalone Components",
      "Core Components",
      "Stateless Modules",
    ],
    correct: 1,
    explanation:
      "Los Standalone Components eliminan la necesidad de NgModule importando dependencias directamente en el decorador @Component.",
  },
  {
    category: "Bloque 1: Componentes y Arquitectura",
    question:
      "En la nueva sintaxis de control de flujo en templates, ¿qué directiva sustituye a *ngIf?",
    options: ["#if", "@if", "v-if", "[ngIf]"],
    correct: 1,
    explanation:
      "El bloque @if forma parte del nuevo Control Flow nativo del compilador y no requiere importar CommonModule.",
  },
  {
    category: "Bloque 1: Componentes y Arquitectura",
    question:
      "¿Qué parámetro es estrictamente obligatorio al utilizar el nuevo bloque @for en los templates?",
    options: ["let index", "track", "pipe", "async"],
    correct: 1,
    explanation:
      "track es obligatorio para optimizar el rendimiento de renderizado identificando elementos únicos en el DOM.",
  },
  {
    category: "Bloque 1: Componentes y Arquitectura",
    question:
      "¿Qué bloque complementario se utiliza junto con @for para mostrar contenido cuando la lista está vacía?",
    options: ["@default", "@empty", "@else", "@fallback"],
    correct: 1,
    explanation:
      "El bloque @empty se renderiza automáticamente si la colección iterada en el @for no contiene elementos.",
  },
  {
    category: "Bloque 1: Componentes y Arquitectura",
    question:
      "¿Qué función moderna se recomienda para resolver servicios sin declararlos en el constructor?",
    options: ["getService()", "inject()", "useService()", "provide()"],
    correct: 1,
    explanation:
      "inject() permite resolver dependencias en el contexto de inyección (propiedades, funciones auxiliares) sin saturar el constructor.",
  },

  // --- Bloque 2: Signals y Reactividad ---
  {
    category: "Bloque 2: Signals y Reactividad",
    question:
      "¿Qué función nativa crea un Signal de solo lectura derivado automáticamente de otros Signals?",
    options: ["effect()", "computed()", "derive()", "memo()"],
    correct: 1,
    explanation:
      "computed() genera un valor reactivo derivado que solo se recalcula de forma lazy cuando sus dependencias cambian.",
  },
  {
    category: "Bloque 2: Signals y Reactividad",
    question:
      "¿Cómo se lee el valor actual de un Signal llamado 'counter' en TypeScript o plantillas?",
    options: ["counter.value", "counter()", "counter.get()", "$counter"],
    correct: 1,
    explanation:
      "Los Signals son funciones getter; se ejecutan invocándolos como counter() para leer su valor y registrar la dependencia.",
  },
  {
    category: "Bloque 2: Signals y Reactividad",
    question:
      "¿Qué método de un WritableSignal se utiliza cuando el nuevo valor depende del valor anterior?",
    options: ["set()", "update()", "mutate()", "patch()"],
    correct: 1,
    explanation:
      "update(fn) recibe el valor actual y devuelve el nuevo estado de forma inmutable. set() sobrescribe sin importar el anterior.",
  },
  {
    category: "Bloque 2: Signals y Reactividad",
    question:
      "¿Dónde está permitido ejecutar effect() sin necesidad de pasar un Injector manual?",
    options: [
      "Dentro de cualquier método público",
      "Únicamente en el contexto de inyección (constructor o inicializadores)",
      "En la plantilla HTML",
      "Dentro del hook ngOnDestroy",
    ],
    correct: 1,
    explanation:
      "effect() necesita un contexto de inyección para enlazarse al ciclo de vida del componente y limpiarse automáticamente.",
  },
  {
    category: "Bloque 2: Signals y Reactividad",
    question:
      "¿Qué función de @angular/core/rxjs-interop transforma un Observable en un Signal?",
    options: ["fromObservable()", "toSignal()", "asSignal()", "pipeToSignal()"],
    correct: 1,
    explanation:
      "toSignal(observable$) suscribe internamente el flujo reactivo de RxJS y expone sus emisiones como un Signal síncrono.",
  },

  // --- Bloque 3: Ciclo de Vida y Rendimiento ---
  {
    category: "Bloque 3: Ciclo de Vida y Rendimiento",
    question:
      "¿Qué estrategia de detección de cambios optimiza el componente comprobando solo inputs inmutables o eventos?",
    options: [
      "ChangeDetectionStrategy.Default",
      "ChangeDetectionStrategy.OnPush",
      "ChangeDetectionStrategy.Lazy",
      "ChangeDetectionStrategy.Manual",
    ],
    correct: 1,
    explanation:
      "OnPush evita comprobaciones innecesarias en el árbol de componentes a menos que cambien referencias de @Input o Signals.",
  },
  {
    category: "Bloque 3: Ciclo de Vida y Rendimiento",
    question:
      "¿En qué hook del ciclo de vida están garantizados por primera vez los valores resueltos de @Input()?",
    options: [
      "ngOnInit",
      "constructor",
      "ngAfterViewInit",
      "ngAfterContentChecked",
    ],
    correct: 0,
    explanation:
      "En ngOnInit Angular ya ha inicializado y enlazado los datos de entrada del componente; en el constructor aún son undefined.",
  },
  {
    category: "Bloque 3: Ciclo de Vida y Rendimiento",
    question:
      "¿Qué hook del ciclo de vida garantiza que una referencia @ViewChild ya está disponible en el DOM?",
    options: ["ngOnInit", "ngAfterViewInit", "ngDoCheck", "ngOnChanges"],
    correct: 1,
    explanation:
      "ngAfterViewInit se ejecuta justo después de que Angular inicializa y renderiza la vista y los hijos del componente.",
  },
  {
    category: "Bloque 3: Ciclo de Vida y Rendimiento",
    question:
      "¿Qué operador moderno de RxJS cancela automáticamente una suscripción al destruirse el componente?",
    options: [
      "take(1)",
      "takeUntilDestroyed()",
      "autoUnsubscribe()",
      "finalize()",
    ],
    correct: 1,
    explanation:
      "takeUntilDestroyed() se enlaza al DestroyRef del componente para cancelar la suscripción y evitar fugas de memoria.",
  },
  {
    category: "Bloque 3: Ciclo de Vida y Rendimiento",
    question:
      "¿Qué API moderna permite registrar callbacks de limpieza sin implementar forzosamente ngOnDestroy?",
    options: [
      "DestroyRef.onDestroy()",
      "afterDestroy()",
      "cleanUp()",
      "onComponentExit()",
    ],
    correct: 0,
    explanation:
      "Inyectar DestroyRef permite registrar funciones de destrucción directamente en cualquier servicio o función auxiliar.",
  },

  // --- Bloque 4: Enrutamiento, Formularios y Servicios ---
  {
    category: "Bloque 4: Routing, Forms y Servicios",
    question:
      "¿Qué tipo o función se utiliza en el enrutador para definir guards funcionales?",
    options: [
      "CanActivateFn",
      "RouteFilter",
      "AuthInterceptor",
      "PathResolver",
    ],
    correct: 0,
    explanation:
      "CanActivateFn define guards funcionales más limpios y directos sin necesidad de crear clases ni servicios dedicados.",
  },
  {
    category: "Bloque 4: Routing, Forms y Servicios",
    question:
      "En Angular Router, ¿qué propiedad permite cargar un componente standalone de forma lazy?",
    options: ["loadChildren", "loadComponent", "importComponent", "asyncRoute"],
    correct: 1,
    explanation:
      "loadComponent permite la carga perezosa de un único componente standalone sin necesidad de encapsularlo en un módulo.",
  },
  {
    category: "Bloque 4: Routing, Forms y Servicios",
    question:
      "En Reactive Forms, ¿qué propiedad pasa a true cuando el usuario hace focus y luego sale (blur) del campo?",
    options: ["dirty", "touched", "pristine", "blurred"],
    correct: 1,
    explanation:
      "touched indica que el control ha perdido el foco tras interactuar con él; dirty indica que su valor ha sido modificado.",
  },
  {
    category: "Bloque 4: Routing, Forms y Servicios",
    question:
      "Si registras un servicio con providedIn: 'root', ¿cuántas instancias se generan en toda la app?",
    options: [
      "Una por cada componente que lo inyecte",
      "Una única instancia compartida (Singleton)",
      "Una por cada ruta",
      "Ninguna hasta registrarse en providers",
    ],
    correct: 1,
    explanation:
      "providedIn: 'root' genera un Singleton a nivel de aplicación que además permite tree-shaking si no se utiliza.",
  },
  {
    category: "Bloque 4: Routing, Forms y Servicios",
    question:
      "Al configurar provideHttpClient(), ¿cómo se registran interceptores funcionales modernos?",
    options: [
      "Declarando una clase en HTTP_INTERCEPTORS",
      "Usando withInterceptors([...])",
      "Añadiéndolos en el constructor",
      "Con el decorador @Interceptor",
    ],
    correct: 1,
    explanation:
      "provideHttpClient(withInterceptors([miInterceptor])) es la forma funcional moderna de encadenar interceptores HTTP.",
  },
];

const QUESTION_TIME = 15;
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
        player.score += 100 + timeLeft * 5;
      }
      socket.emit("player:answered", { answerIdx });
      io.emit("host:answerCount", countAnswers());

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
