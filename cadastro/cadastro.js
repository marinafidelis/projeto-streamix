//  MEXENDO Os OLHOS (senha) 

// Alternar visibilidade da senha
function togglePassword() {
    document.querySelectorAll(".eye").forEach((eye) => eye.classList.toggle("hide"));
    const senha = document.getElementById("senha");
    const type = senha.getAttribute("type") === "password" ? "text" : "password";
    senha.setAttribute("type", type);
  }
  
  // Alternar visibilidade da confirmação de senha
  function togglePasswordConfirm() {
    document.querySelectorAll(".eye2").forEach((eye2) => eye2.classList.toggle("hide"));
    const confirmsenha = document.getElementById("confirmSenha");
    const type = confirmsenha.getAttribute("type") === "password" ? "text" : "password";
    confirmsenha.setAttribute("type", type);
  }
  
  //  MODO ESCURO 
  
  const trilho = document.getElementById("trilho");
  const body = document.querySelector("body");
  
  trilho.addEventListener("click", () => {
    trilho.classList.toggle("dark");
    body.classList.toggle("dark");
  });
  
  //  FORMULÁRIO
  
  //  parte nome
  const form = document.querySelector("form");
  
  const nome = document.querySelector("#nome");
  const erroNome = nome.parentElement.querySelector(".error");
  
  //  apenas letras e espaços, com pelo menos duas palavras de 2 letras
  const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,})+$/;
  
  // função de validação
  function validarNome() {
    const valor = nome.value.trim();
  
    if (valor === "") {
      erroNome.textContent = "O campo nome é obrigatório.";
      return false;
    }
  
    if (!nomeValido.test(valor)) {
      erroNome.textContent = "Digite um nome completo válido (ex: João Silva)";
      return false;
    }
  
    // limpa mensagem se estiver tudo certo
    erroNome.textContent = ""; 
    return true;
  }
  // valida ao sair do input
  nome.addEventListener("blur", validarNome);
  
  // parte do usuário
  const usuario = document.querySelector("#usuario");
  const erroUsuario = usuario.parentElement.querySelector(".error");
  
  // pelo menos 3 caracteres, 1 símbolo e sem espaços
  const usuarioValido = /^(?=.*[^A-Za-z0-9])\S{3,}$/;
  
  function validarUsuario() {
    const valor = usuario.value.trim();
    erroUsuario.textContent = ""; // limpa antes de testar
  
    if (valor === "") {
      erroUsuario.textContent = "O campo usuário é obrigatório.";
      return false;
    }
  
    if (!usuarioValido.test(valor)) {
      erroUsuario.textContent =
        "Usuário deve ter 3 caracteres e um símbolo.";
      return false;
    }
  
    erroUsuario.textContent = ""; // limpa mensagem se estiver tudo certo
    return true;
  }
  
  // valida ao sair do input
  usuario.addEventListener("blur", validarUsuario);
  
  // parte do e-mail
  const email = document.querySelector("#email");
  const erroEmail = email.parentElement.querySelector(".error");
  
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  function validarEmail() {
    const valor = email.value.trim();
    erroEmail.textContent = "";
  
    if (valor === "") {
      erroEmail.textContent = "O campo e-mail é obrigatório.";
      return false;
    }
  
    if (!emailValido.test(valor)) {
      erroEmail.textContent = "Digite um e-mail válido (ex: exemplo@dominio.com)";
      return false;
    }
  
    erroEmail.textContent = ""; // limpa mensagem se estiver tudo certo
    return true;
  }
  
  email.addEventListener("blur", validarEmail);
  
  // parte do celular
  const celular = document.querySelector("#number");
  const erroCelular = celular.parentElement.querySelector(".error");
  
  // dispara sempre que o usuário digita
  celular.addEventListener("input", formatarCelular);
  
  function formatarCelular(e) {
    // pega o valor digitado
    let valor = e.target.value;
  
    // remove tudo que não for número
    valor = valor.replace(/\D/g, "");
  
    // limita a 11 dígitos
    if (valor.length > 11) valor = valor.slice(0, 11);
  
    // se tiver mais de 6 dígitos → formato completo (DD) 9XXXX-XXXX
    if (valor.length > 6) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    }
    // se tiver mais de 2 dígitos → coloca só o DDD e o começo
    else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    }
    // se o usuário está digitando o DDD
    else {
      valor = valor.replace(/^(\d*)/, "($1");
    }
  
    // atualiza o valor no input
    e.target.value = valor;
  }
  
  function validarCelular() {
    const valor = celular.value.replace(/\D/g, "");    //remove caracteres
    erroCelular.textContent = ""; // limpa o erro anterior
  
    if (valor === "") {
      erroCelular.textContent = "O campo celular é obrigatório.";
      return false;
    }
  
    if (valor.length < 11) {
      erroCelular.textContent = "Digite um número completo com DDD e 9 dígitos.";
      return false;
    }
  
    // tudo certo
    erroCelular.textContent = "";
    return true;
  }
  
  celular.addEventListener("blur", validarCelular);
  
  // parte da senha
  
  const senha = document.querySelector("#senha");
  const erroSenha = senha.closest(".input-wrapper").querySelector(".error");
  
  
  
  function validarSenha() {
    const valor = senha.value.trim();
    erroSenha.textContent = "";  // limpa o campo de erro 
  
    if (valor === "") {
      erroSenha.textContent = " O campo senha é obrigatório.";
      return false; //impede o envio
    }
  
    if (valor.length < 8) {
      erroSenha.textContent = "A senha deve ter no mínimo 8 caracteres.";
      return false;
    }
  
    const senhaForte = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!senhaForte.test(valor)) {
      erroSenha.textContent = "A senha deve conter uma letra maiúscula, um número e um símbolo.";
      return false;
    }
  
    erroSenha.textContent = "";
    return true;
  }
  senha.addEventListener("blur", validarSenha);
  senha.addEventListener("input", validarSenha);
  
  
  
  
  // confirmar senha
  const confirmarSenha = document.querySelector("#confirmSenha");
  const erroConfirmar = confirmarSenha.closest(".input-wrapper").querySelector(".error");
  
  
  
  function validarConfirmarSenha() {
    const valorSenha = senha.value.trim();
    const valorConfirmar = confirmarSenha.value.trim();
  
    erroConfirmar.textContent = "";
  
    if (valorConfirmar === "") {
      erroConfirmar.textContent = "Confirme sua senha.";
      return false;
    }
  
    if (valorConfirmar !== valorSenha) {
      erroConfirmar.textContent = "As senhas não coincidem.";
      return false;
    }
  
    erroConfirmar.textContent = "";
    return true;
  }
  confirmarSenha.addEventListener("blur", validarConfirmarSenha);
  confirmarSenha.addEventListener("input", validarConfirmarSenha);
  senha.addEventListener("input", validarConfirmarSenha);
  
  
  // REMOVER ERRO AO CLICAR NO INPUT
  [nome, usuario, email, celular, senha, confirmarSenha].forEach((input) => {
    input.addEventListener("focus", () => {
      const erro = input.closest(".input-box, .input-wrapper").querySelector(".error");
      if (erro) erro.textContent = "";
    });
  });
  
  
  // ENVIO DO FORMULÁRIO (localStorage)
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // impede o envio automático do formulário
  
    // checa se todas as funções de validação retornam true
    const tudoCerto =
      validarNome() &&
      validarUsuario() &&
      validarEmail() &&
      validarCelular() &&
      validarSenha() &&
      validarConfirmarSenha();
  
    // só continua se tudo estiver válido
    if (!tudoCerto) {
      console.log("Formulário inválido, verifique os campos"); // debug
      return;
    }
  
    // gera o hash da senha antes de salvar
    const senhaDigitada = senha.value.trim();
    const senhaHash = await gerarHash(senhaDigitada);
  
    // cria o objeto do usuário
    const novoUsuario = {
      nome: nome.value.trim(),
      usuario: usuario.value.trim(),
      email: email.value.trim(),
      celular: celular.value.trim(),
      senha: senhaHash, // salva o hash da senha
      genero: document.querySelector('input[name="gender"]:checked').value,
    };
  
    // salva no localStorage usando a função do storage.js
    const resultado = salvarUsuario(novoUsuario);
  
    if (resultado.sucesso) {
      const sucesso = document.getElementById("mensagemSucesso");
      sucesso.textContent = "Usuário cadastrado com sucesso!";
      sucesso.style.display = "block";
  
      form.reset();
  
      setTimeout(() => {
        sucesso.style.display = "none";
        window.location.href = "../login/login.html"; // redireciona pro login
      }, 2500);
    } else {
      const erro = document.getElementById("mensagemErro");
      erro.textContent = resultado.mensagem;
      erro.style.display = "block";
      setTimeout(() => (erro.style.display = "none"), 3000);
    }
  });
  