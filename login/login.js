// Função ativada ao clicar no ícone do olho
function togglePassword() {
    const senha = document.getElementById("senha"); 
  
    document.querySelectorAll(".eye").forEach((eye) => eye.classList.toggle("hide"));
  
    const type = senha.getAttribute("type") === "password" ? "text" : "password";
    senha.setAttribute("type", type); 
  }
  
  // MODO ESCURO 
  const trilho = document.getElementById("trilho"); 
  const body = document.querySelector("body"); 
  
  // Verifica se o botão existe antes de aplicar o evento
  if (trilho) {
    // Ao clicar, alterna a classe "dark" tanto no trilho quanto no body
    trilho.addEventListener("click", () => {
      trilho.classList.toggle("dark");
      body.classList.toggle("dark");
    });
  }
  
  //  SELEÇÃO DOS CAMPOS DO FORMULÁRIO 
  
  const identificadorInput = document.getElementById("identificador"); // Campo de e-mail/usuário/celular
  const senhaInput = document.getElementById("senha"); 
  const entrarButton = document.getElementById("entrarButton"); 
  const loginForm = document.getElementById("loginForm"); 
  
  // Se algum elemento estiver faltando, mostra no console para debug
  if (!identificadorInput || !senhaInput || !entrarButton || !loginForm) {
    console.error("Erro: algum elemento do formulário não foi encontrado.");
  }
  
  // NAVEGAÇÃO COM ENTER 
  
  // Verifica se os campos existem antes de aplicar os eventos
  if (identificadorInput && senhaInput && entrarButton) {
  
    // Quando pressionar Enter no campo identificador, foca no campo senha
    identificadorInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); 
        senhaInput.focus(); 
      }
    });
  
    // Quando pressionar Enter no campo senha, foca no botão entrar
    senhaInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        entrarButton.focus(); 
      }
    });
  }
  
  // Verifica se o formulário existe
  if (loginForm) {
  
    // Evento ao enviar o formulário
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault(); 
  
      const identificador = identificadorInput.value.trim(); 
      const senha = senhaInput.value.trim(); 
  
      // Verifica se campos estão vazios
      if (identificador === "" || senha === "") {
        const erro = document.getElementById("mensagemErro");
        erro.textContent = "Preencha todos os campos!";
        erro.style.display = "block"; o
  
        // Esconde após 3 segundos
        setTimeout(() => (erro.style.display = "none"), 3000);
        return; 
      }
  
      try {
        // Tenta autenticar o usuário usando storage.js
        const usuario = await autenticarUsuario(identificador, senha);
  
        // Se autenticar com sucesso
        if (usuario) {
          const mensagem = document.getElementById("mensagemBoasVindas");
  
          // Exibe mensagem de boas-vindas com nome do usuário
          mensagem.textContent = `Bem-vindo(a), ${usuario.nome}!`;
          mensagem.style.display = "block";
  
          // Salva usuário logado no localStorage
          localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  
          // Redireciona para o feed após 2 segundos
          setTimeout(() => {
            window.location.href = "Feed/index.html";
          }, 2000);
  
        } else {
          // Exibe erro caso identificador ou senha estejam incorretos
          const erro = document.getElementById("mensagemErro");
          erro.textContent = "Identificador ou senha incorretos. Tente novamente.";
          erro.style.display = "block";
  
          setTimeout(() => (erro.style.display = "none"), 3000);
        }
  
      } catch (err) {
        // Caso ocorra um erro interno
        console.error("Erro durante o login:", err);
  
        const erro = document.getElementById("mensagemErro");
        erro.textContent = "Ocorreu um erro interno ao tentar fazer login.";
        erro.style.display = "block";
  
        setTimeout(() => (erro.style.display = "none"), 3000);
      }
    });
  }
  