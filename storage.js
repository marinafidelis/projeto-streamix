// FUNÇÕES DE LOCALSTORAGE

// busca todos os usuários salvos no localstorage e se não existir, retorna um array vazio
function obterUsuarios() {
    try {
        const usuarios = localStorage.getItem("usuarios");     //tentar pegar o item armazenado
        return JSON.parse(usuarios) || [];               //converte o texto JSON em objeto,se for null retorna array vazio
    } catch (error) {
        console.error("Error ao ler usuários do localStorage", error);
        return [];
    }
}

// salvar usuários
function salvarUsuarios(lista) {
    try {
        const json = JSON.stringify(lista);     //converte o objeto em texto JSON
        localStorage.setItem("usuarios", json);
        console.log("Usuários salvos com sucesso!.");
    } catch (error) {
        console.error("Error ao salvar usuários no localStorage", error);
    }
}

//salvar um novo usuário
function salvarUsuario(novoUsuario) {
    try {
        const usuarios = obterUsuarios();    //pega todos os usuários salvos
        const existe = usuarios.some(u => u.email === novoUsuario.email);  //verifica se já existe um usuário com o mesmo email

        if (existe) {
            return { sucesso: false, mensagem: " Este e-mail já está cadastrado." };

        }
        usuarios.push(novoUsuario);    //adiciona o novo usuário na lista
        salvarUsuarios(usuarios);
        return {
            sucesso: true, mensagem: "Usuário cadastrado com sucesso!"
        }
    } catch (erro) {
        console.error("Erro ao salvar novo usuário", erro);
        return { sucesso: false, mensagem: "Erro ao salvar usuário." };
    }
}

//gora um hash (enbaralha) de uma senha usando SHA-256
async function gerarHash(senha) {
    const encoder = new TextEncoder();   //transforma o texto da senha em bytes
    const data = encoder.encode(senha);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);  //cria o hash usando o algaritmo SHA-256

    //transforma o resultado (bytes) em texto 
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

// FUNÇÕES DE LOCALSTORAGE

// busca todos os usuários salvos no localstorage e se não existir, retorna um array vazio
function obterUsuarios() {
    try {
        const usuarios = localStorage.getItem("usuarios");     //tentar pegar o item armazenado
        return JSON.parse(usuarios) || [];               //converte o texto JSON em objeto,se for null retorna array vazio
    } catch (error) {
        console.error("Error ao ler usuários do localStorage", error);
        return [];
    }
}

// salvar usuários
function salvarUsuarios(lista) {
    try {
        const json = JSON.stringify(lista);     //converte o objeto em texto JSON
        localStorage.setItem("usuarios", json);
        console.log("Usuários salvos com sucesso!.");
    } catch (error) {
        console.error("Error ao salvar usuários no localStorage", error);
    }
}

//salvar um novo usuário
function salvarUsuario(novoUsuario) {
    try {
        const usuarios = obterUsuarios();    //pega todos os usuários salvos
        const existe = usuarios.some(u => u.email === novoUsuario.email);  //verifica se já existe um usuário com o mesmo email

        if (existe) {
            return { sucesso: false, mensagem: " Este e-mail já está cadastrado." };

        }
        usuarios.push(novoUsuario);    //adiciona o novo usuário na lista
        salvarUsuarios(usuarios);
        return {
            sucesso: true, mensagem: "Usuário cadastrado com sucesso!"
        }
    } catch (erro) {
        console.error("Erro ao salvar novo usuário", erro);
        return { sucesso: false, mensagem: "Erro ao salvar usuário." };
    }
}

//gora um hash (enbaralha) de uma senha usando SHA-256
async function gerarHash(senha) {
    const encoder = new TextEncoder();   //transforma o texto da senha em bytes
    const data = encoder.encode(senha);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);  //cria o hash usando o algaritmo SHA-256

    //transforma o resultado (bytes) em texto 
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

//AUTENTCAR USUÁRIO (EMAIL, USUÁRIO OU CELULAR) + SENHA
async function autenticarUsuario(identificador, senhaDigitada) {
    const usuarios = obterUsuarios();        //pega os usuarios salvos
    const senhaHash = await gerarHash(senhaDigitada);  //gera o hash da senha digitada

    //procura o usuário pelo identificador
    const usuario = usuarios.find(
        (u) =>
            (u.email === identificador ||
                u.usuario === identificador ||
                u.celular === identificador) &&
            u.senha === senhaHash);

    //se encontrar, retorna o usuário, senão retorna null
    return usuario || null;
}



