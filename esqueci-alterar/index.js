//  MODO ESCURO
const trilho = document.getElementById("trilho");
const body = document.querySelector("body");

// Adiciona evento de clique para alternar o modo escuro
trilho.addEventListener("click", () => {
  trilho.classList.toggle("dark");
  body.classList.toggle("dark");
});

// VISIBILIDADE DAS SENHAS

// Alterna visibilidade da SENHA ATUAL
function togglePasswordAtual() {
  // Alterna a imagem do ícone (olho aberto/fechado)
  document.querySelectorAll(".eye").forEach(e => e.classList.toggle("hide"));
  // Captura o input da senha atual
  const el = document.getElementById("senhaAtual");
  // Alterna o tipo do input
  el.type = el.type === "password" ? "text" : "password";
}

// Alterna visibilidade da NOVA SENHA
function togglePassword() {
  document.querySelectorAll(".eye2").forEach(e => e.classList.toggle("hide"));
  const el = document.getElementById("novaSenha");
  el.type = el.type === "password" ? "text" : "password";
}

// Alterna visibilidade da CONFIRMAÇÃO DE SENHA
function togglePasswordConfirm() {
  document.querySelectorAll(".eye3").forEach(e => e.classList.toggle("hide"));
  const el = document.getElementById("confirmSenha");
  el.type = el.type === "password" ? "text" : "password";
}

// MODO VIA URL (?modo=)

// Lê parâmetros da URL
const params = new URLSearchParams(window.location.search);
// Pega o valor de "modo"
const modoURL = params.get("modo");

// Captura elementos importantes
const tituloPagina = document.getElementById("tituloPagina");

const formEmail = document.getElementById("formEmail");
const formCodigo = document.getElementById("formCodigo");
const formSenha = document.getElementById("formSenha");

const emailRec = document.getElementById("emailRec");
const codigoDigitado = document.getElementById("codigoDigitado");
const codigoGeradoEl = document.getElementById("codigoGerado");

const senhaAtual = document.getElementById("senhaAtual");
const novaSenha = document.getElementById("novaSenha");
const confirmarSenha = document.getElementById("confirmSenha");

const msgEmail = document.getElementById("msgEmail");
const msgCodigo = document.getElementById("msgCodigo");
const msgSenha = document.getElementById("msgSenha");

let usuarioEncontrado = null;

// MODO RECUPERAR SENHA
function ativarModoRecuperar() {
  // Ajusta título
  tituloPagina.textContent = "RECUPERAR SENHA";

  // Mostra apenas o formulário de e-mail
  formEmail.classList.remove("hidden");
  formCodigo.classList.add("hidden");
  formSenha.classList.add("hidden");

  // Esconde campos relacionados à senha atual
  senhaAtual.classList.add("hidden");
  senhaAtual.previousElementSibling.classList.add("hidden");
  document.querySelectorAll(".eye").forEach(e => e.classList.add("hidden"));
}

// MODO ALTERAR SENHA
function ativarModoAlterar() {
  tituloPagina.textContent = "ALTERAR SENHA";

  formEmail.classList.add("hidden");
  formCodigo.classList.add("hidden");
  formSenha.classList.remove("hidden");

  // Mostra senha atual (input + label + ícones)
  senhaAtual.classList.remove("hidden");
  senhaAtual.previousElementSibling.classList.remove("hidden");
  document.querySelectorAll(".eye").forEach(e => e.classList.remove("hidden"));
}

//DEFINIR MODO DA PÁGINA
function definirModoDaPagina() {
  if (modoURL === "alterar") return ativarModoAlterar();
  return ativarModoRecuperar();
}

// VALIDAR E-MAIL
formEmail.addEventListener("submit", (e) => {
  e.preventDefault();

  // Busca usuários do localStorage
  const usuarios = obterUsuarios();

  // E-mail digitado
  const emailDigitado = emailRec.value.trim();

  // Procura usuário com esse e-mail
  usuarioEncontrado = usuarios.find(u => u.email === emailDigitado);

  if (!usuarioEncontrado) {
    msgEmail.textContent = "E-mail não encontrado!";
    msgEmail.className = "mensagem erro";
    return;
  }

  // Gera código de 6 dígitos
  const codigo = String(Math.floor(100000 + Math.random() * 900000));

  // Salva no localStorage
  localStorage.setItem("codigoRecuperacao", codigo);

  // Exibe o código na tela
  codigoGeradoEl.textContent = codigo;

  // Troca para etapa do código
  formEmail.classList.add("hidden");
  formCodigo.classList.remove("hidden");

  msgEmail.textContent = "";
});

// VALIDAR CÓDIGO

formCodigo.addEventListener("submit", (e) => {
  e.preventDefault();

  const codigoDigitadoValor = codigoDigitado.value.trim();
  const codigoCorreto = localStorage.getItem("codigoRecuperacao");

  if (codigoDigitadoValor === "" || codigoDigitadoValor !== codigoCorreto) {
    msgCodigo.textContent = "Código incorreto!";
    msgCodigo.className = "mensagem erro";
    return;
  }

  msgCodigo.textContent = "";

  // Passa para a etapa das senhas
  formCodigo.classList.add("hidden");
  formSenha.classList.remove("hidden");
});

// SALVAR SENHA 
formSenha.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nova = novaSenha.value.trim();
  const conf = confirmarSenha.value.trim();
  const atual = senhaAtual.value.trim();

  // Validações
  if (nova === "" || conf === "") {
    msgSenha.textContent = "Preencha todos os campos.";
    msgSenha.className = "mensagem erro";
    return;
  }

  if (nova !== conf) {
    msgSenha.textContent = "As senhas não coincidem!";
    msgSenha.className = "mensagem erro";
    return;
  }

  // Gera hash da nova senha
  const novaHash = await gerarHash(nova);

  // MODO ALTERAR  
  if (modoURL === "alterar") {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!user) {
      msgSenha.textContent = "Nenhum usuário logado!";
      msgSenha.className = "mensagem erro";
      return;
    }

    const atualHash = await gerarHash(atual);

    if (atualHash !== user.senha) {
      msgSenha.textContent = "Senha atual incorreta!";
      msgSenha.className = "mensagem erro";
      return;
    }

    user.senha = novaHash;
    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    const usuarios = obterUsuarios();
    const i = usuarios.findIndex(u => u.email === user.email);
    if (i !== -1) {
      usuarios[i].senha = novaHash;
      salvarUsuarios(usuarios);
    }

    msgSenha.textContent = "Senha alterada com sucesso!";
    msgSenha.className = "mensagem sucesso";

    setTimeout(() => {
      window.location.href = "Feed/index.html";
    }, 1500);

    return;
  }

  // MODO RECUPERAR 
  const usuarios = obterUsuarios();
  const index = usuarios.findIndex(u => u.email === usuarioEncontrado.email);

  if (index === -1) {
    msgSenha.textContent = "Erro ao localizar usuário.";
    msgSenha.className = "mensagem erro";
    return;
  }

  usuarios[index].senha = novaHash;
  salvarUsuarios(usuarios);

  localStorage.removeItem("codigoRecuperacao");

  msgSenha.textContent = "Senha redefinida com sucesso!";
  msgSenha.className = "mensagem sucesso";

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
});

// NAVEGAÇÃO COM ENTER 

// Enter no campo email envia o formulário
emailRec.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    formEmail.querySelector("button").click();
  }
});

// Enter no campo código envia o formulário
codigoDigitado.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    formCodigo.querySelector("button").click();
  }
});

// Enter em nova senha pula para confirmar senha
novaSenha.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    confirmarSenha.focus();
  }
});

// Enter em confirmar senha salva senha
confirmarSenha.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    formSenha.querySelector("button").click();
  }
});

// INICIAR A PÁGINA 
definirModoDaPagina();
