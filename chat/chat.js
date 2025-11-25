//Elementos do html
const btnVoltar = document.getElementById("btn-voltar");
const listaContatos = document.getElementById("lista-contatos");
const headerNome = document.getElementById("chat-header-nome");
const headerImg = document.getElementById("chat-header-img");
const mensagensLista = document.getElementById("mensagens-lista");
const inputMensagem = document.getElementById("input-mensagem");
const btnEnviar = document.getElementById("bn-enviar");

//Lista de contatos 
const contatos = {

  // Contato verdadeiro (BOT)
  "jujuba": {
    nome: "jujuba",
    avatar: "../Imagens/menina1.png",
    isBot: true, 
    mensagensIniciais: [
      { tipo: "received", texto: "Oiii amiga" },
    ]
  },

  // Contatos falsos 
  "Mario": {
    nome: "Mario",
    avatar: "../Imagens/menino1.png",
    isBot: false,
    mensagensIniciais: [
      { tipo: "received", texto: "Bom diaa!" }
    ]
  },

  "Vick": {
    nome: "Vick",
    avatar: "../Imagens/menina2.png",
    isBot: false,
    mensagensIniciais: [
      { tipo: "received", texto: "Amiga?" }
    ]
  },

  "Miliondollarman": {
    nome: "Miliondollarman",
    avatar: "../Imagens/menino2.png",
    isBot: false,
    mensagensIniciais: []
  },

  "Leo": {
    nome: "Leo",
    avatar: "../Imagens/menino3.png",
    isBot: false,
    mensagensIniciais: [
      { tipo: "received", texto: "Bom diaa!" }
    ]
  }
};

//Cria bolha para a mensagem 
function criarMensagemElemento(texto, tipo) {

  // Cria uma div que será a bolha da mensagem
  const div = document.createElement('div');

  // Se for mensagem enviada → classe mensagem-enviada
  // Se for recebida → mensagem-recebida
  div.className = (tipo === 'sent')
    ? 'mensagem-enviada'
    : 'mensagem-recebida';

  // Coloca o texto dentro da bolha
  div.textContent = texto;

  return div; 
};

// Mostra as mensagens do coontato clicado   
function mostrarMensagensDoContato(username) {

  // Pega o contato selecionado
  const contato = contatos[username];
  if (!contato) return; // se não existir, sai

  // Troca nome e foto no cabeçalho
  headerNome.textContent = contato.nome;
  headerImg.src = contato.avatar;

  // Apaga mensagens antigas
  mensagensLista.innerHTML = "";

  // Adiciona as mensagens iniciais do contato
  contato.mensagensIniciais.forEach(msg => {
    const elemento = criarMensagemElemento(msg.texto, msg.tipo);
    mensagensLista.appendChild(elemento);
  });
};

//Guarda o contato ativo no momento
let contatoAtivo = null;

listaContatos.addEventListener("click", (evento) => {

  // Verifica se clicou em um contato
  const li = evento.target.closest(".contato");
  if (!li) return;

  // Pega o nome do contato clicado
  const username = li.dataset.username;
  if (!username) return;

  // Define como contato ativo
  contatoAtivo = username;

  // Remove "ativo" dos outros contatos
  document.querySelectorAll(".contato").forEach(item => {
    item.classList.remove("ativo");
  });

  // Marca o contato clicado como ativo
  li.classList.add("ativo");
  mostrarMensagensDoContato(username);
});

window.addEventListener("DOMContentLoaded", () => {

  // Seleciona o primeiro usuário
  const primeiroContato = document.querySelector("#lista-contatos .contato");

  // Se existir, abre automaticamente
  if (primeiroContato) {
    primeiroContato.classList.add("ativo");

    const username = primeiroContato.dataset.username;

    contatoAtivo = username;

    mostrarMensagensDoContato(username);
  }
});

//Envia mensagem ao usuário
function enviarMensagem() {

  // Se nenhum contato estiver aberto, não manda
  if (!contatoAtivo) return;

  // Pega o texto digitado
  const texto = inputMensagem.value.trim();

  // Não permite mensagem vazia
  if (texto === "") return;

  // Cria bolha do usuário
  const elemento = criarMensagemElemento(texto, "sent");
  mensagensLista.appendChild(elemento);

  // Desce o scroll
  mensagensLista.scrollTop = mensagensLista.scrollHeight;

  // Chama o bot se necessário
  respostaAutomaticaBot(texto);

  // Limpa o campo
  inputMensagem.value = "";
}

btnEnviar.addEventListener("click", enviarMensagem);

// Enviar com Enter
inputMensagem.addEventListener("keydown", (tecla) => {
  if (tecla.key === "Enter") enviarMensagem();
});

// Mostra o texto "digitando..."
function mostrarDigitando() {
  const div = document.createElement("div");
  div.className = "mensagem-recebida typing";
  div.id = "digitando";
  div.textContent = "digitando...";
  mensagensLista.appendChild(div);
  mensagensLista.scrollTop = mensagensLista.scrollHeight;
}

// Remove o "digitando..."
function removerDigitando() {
  const dig = document.getElementById("digitando");
  if (dig) dig.remove();
}

// Respostas do bot
const respostasBot = {

  oi: [
    "Oiii amiga! 💕",
    "Oi!! Como você tá?",
    "Heey! Tudo bem por aí?"
  ],

  bem: [
    "Que bommm! Fico feliz por você 😍",
    "Awnn que ótimo, amiga!",
    "Perfeito então! Me conta novidades ✨"
  ],

  triste: [
    "O que aconteceu amiga? 😢",
    "Ei, tô aqui pra você 💗",
    "Amiga… fala comigo 😞"
  ],

  pergunta: [
    "Hmmm boa pergunta 🤔",
    "Não sei ao certo, amiga kkkk 😂",
    "Eu acho que sim! Mas não tenho certeza 😅"
  ],

  padrao: [
    "Simm 🙃",
    "Entendi amiga!",
    "Aiii sei como é 😂",
    "Nossa, sério? 😮"
  ]
};

function gerarRespostaDoBot(textoUsuario) {

  const msg = textoUsuario.toLowerCase();

  if (msg.includes("oi") || msg.includes("olá")) {
    return escolherAleatoria(respostasBot.oi);
  }

  if (msg.includes("bem") || msg.includes("boa") || msg.includes("certo")) {
    return escolherAleatoria(respostasBot.bem);
  }

  if (msg.includes("triste") || msg.includes("mal") || msg.includes("chatead") ) {
    return escolherAleatoria(respostasBot.triste);
  }

  if (msg.includes("?")) {
    return escolherAleatoria(respostasBot.pergunta);
  }

  return escolherAleatoria(respostasBot.padrao);
}

// Função que escolhe resposta aleatória
function escolherAleatoria(lista) {
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}

// Bot responde
function respostaAutomaticaBot(textoUsuario) {

  const contato = contatos[contatoAtivo];

  // Só responde se o contato for bot
  if (!contato.isBot) return;

  // Mostra "digitando..."
  mostrarDigitando();

  // Tempo baseado no tamanho da mensagem do usuário
  const Tempo = 800 + textoUsuario.length * 40;

  setTimeout(() => {

    removerDigitando(); 

    const resposta = gerarRespostaDoBot(textoUsuario); 

    const elemento = criarMensagemElemento(resposta, "received"); 

    mensagensLista.appendChild(elemento); 
    mensagensLista.scrollTop = mensagensLista.scrollHeight; 

  }, Tempo);
}
// Modo mobile: abrir chat ao clicar no contato
listaContatos.addEventListener("click", () => {
  if (window.innerWidth <= 900) {
    document.body.classList.add("chat-aberto");
  }
});

// Botão de voltar no mobile
btnVoltar.addEventListener("click", () => {
  document.body.classList.remove("chat-aberto");
});
//Volta para o feed
document.getElementById("btn-voltar-feed").addEventListener("click", () => {
  window.location.href = "../Feed/index.html"; // coloque o caminho correto do seu feed
});
