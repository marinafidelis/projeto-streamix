// ----------- TROCA DE ABAS (VÍDEOS / POSTS) -----------

// Botões que alternam entre aba de vídeos e posts
const botoesAbas = document.querySelectorAll('.btn-aba, .btn-aba-footer');

// Containers dos feeds vídeos e posts
const feedVideos = document.getElementById('feed-videos');
const feedPosts = document.getElementById('feed-posts');


// Estado inicial: mostra o feed de vídeos e esconde o de posts
if (feedVideos && feedPosts) {
  feedVideos.classList.add('ativa');
  feedPosts.classList.remove('ativa');
}

// Quando clicar em um botão de aba (vídeos ou posts)
botoesAbas.forEach(btn => {
  btn.addEventListener('click', () => {
    const aba = btn.dataset.aba; //Lê o data-aba do botão: videos ou posts

    // Faz a troca se for uma aba válida
    if (aba === 'videos' || aba === 'posts') {
      // Tira  a classe "ativo' de todos os botões
      botoesAbas.forEach(b => b.classList.remove('ativo'));

      // Deixa o botão clicado como ativo
      btn.classList.add('ativo');

      //Alterna qual feed está  visível
      if (aba === 'videos') {
        feedVideos.classList.add('ativa');
        feedPosts.classList.remove('ativa');
      } else {
        feedPosts.classList.add('ativa');
        feedVideos.classList.remove('ativa');
      }
    }
  });
});


// -------------- VÍDEOS DO FEED --------------

// Lista de vídeos/ array com os vídeos que vão estar no feed de vídeos
const videos = [
  {
    id: 'embed1',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/KDDVHnLB4eE?si=hUUMa0ahSi0NS_ZC',
    titulo: 'Michael | Trailer Oficial - HD',
  },
  {
    id: 'embed2',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/A1BaZr82XJI?si=PrxATh9igpl5lrga',
    titulo: 'Se nao aprender PROGRAMAÇÃO com esse video. - ̗̀ DESISTE ̖́-',
  },
  {
    id: 'embed3',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/J_sH-GrUeUw?si=DHI_0AfhwANDw34S',
    titulo: 'Radiohead Perform "Creep" Live on September 14, 1993 | Late Night with Conan O’Brie',
  },
  {
    id: 'embed4',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/Kwrfc4HghBA?si=69qvkNrJE5PsX-Pz',
    titulo: 'E Lá Vamos Nós HD ',
  },
  {
    id: 'embed5',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/n4K-EP5x5zU?si=59xdYGORsjeaeFiQ',
    titulo: 'Homem de ferro estala os dedos|Vingadores Ultimato',
  },
  {
    id: 'embed6',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/SgROgxny6nU?si=ckdNLEiuDdzJq2Ua',
    titulo: 'Se o/esse mundo existe, porque existe? Ines Brasil',
  },
  {
    id: 'embed7',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/BMzzXYQ8zoQ?si=vlIt4PyIGdV9sXmK',
    titulo: 'Ananta - Gameplay Trailer | PS5 Games',
  },
  {
    id: 'embed8',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/C-AA7wX-Lqc?si=lJq3dPuq1K3o4Rhb',
    titulo: 'por ONDE COMEÇAR na PROGRAMAÇÃO?!',
  },
  {
    id: 'embed9',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/ZkCwGpYP3ik?si=CTRevQCBe23Lb3be',
    titulo: 'Expansão de Domínio! | JUJUTSU KAISEN (Dublado)',
  },
  {
    id: 'embed10',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/Xgq_dZSXyIE?si=m2FmISe5Xurh6lA',
    titulo: 'Too Sweet - Hozier',
  },
  {
    id: 'embed11',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/vbvyNnw8Qjg?si=4qvyVHuKHh2VytrX',
    titulo: 'Queen - Bohemian Rhapsody',
  },
  {
    id: 'embed12',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/Gg-tkMSUzW4?si=6iVCG7VtnbweNIRn',
    titulo: 'Scorpions - Send Me an Angel',
  },
];

// Função que monta os cards de vídeo no HTML
function mostrarVideos(videosArray) {
  if (!feedVideos) return;           //se feedVideos não for verdadeiro encerra a execução da função e retorna

  feedVideos.innerHTML = "";           //limpa o html atual no feed de vídeos

  //percorre o array de vídeos 
  videosArray.forEach(video => {
    const videoCard = document.createElement("div");  //cria a div do card de vídeo
    videoCard.classList.add("video-card");
    videoCard.dataset.id = video.id;           // Guarda o id do vídeo no HTML

    // Se o tipo de vídeo igual a "youtube", monta o iframe  
    if (video.tipo === "youtube") {
      videoCard.innerHTML = `
        <iframe src="${video.src}" frameborder="0" allowfullscreen></iframe>
        <h3>${video.titulo}</h3>
        
      `;
    }
    // Adiciona o card pronto no container do feed
    feedVideos.appendChild(videoCard);
  });
}

// Ao carregar a página, mostra todos os vídeos do array
mostrarVideos(videos);


// Array de vídeos especiais que aparecem quando o usuário usa o formulário de busca
const videosBusca = [
  {
    id: 'vingador1',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/n4K-EP5x5zU?si=59xdYGORsjeaeFiQ',
    titulo: 'Homem de ferro estala os dedos | Vingadores Ultimato',
  },
  {
    id: 'vingador2',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/R-9hB553mz4?si=sKmMilNmdz2Zi8VS',
    titulo: 'Rap do Homem de Ferro (Vingadores: Ultimato)',
  },
  {
    id: 'vingador3',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/RVK8sUsg1uI?si=pw-31iuAneKXRhJX',
    titulo: 'Todas as cenas da Nanotecnologia de Tony Stark em Guerra Infinita',
  },
  {
    id: 'vingador4',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/4eDfeKT4l5Q?si=vCu-WglaiHKwAnzC',
    titulo: 'Melhor cena do Homem de Ferro',
  },
  {
    id: 'vingador5',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/t86sKsR4pnk?si=4sorr6kaqR2Hzpou',
    titulo: 'Iron Man - Suit Up Scene',
  },
  {
    id: 'vingador6',
    tipo: 'youtube',
    src: 'https://www.youtube.com/embed/9NupmPBPFK8?si=dt8HmRyIjC9hEcF4',
    titulo: 'Viuva negra cena de luta HD',
  },
];

// -------- BUSCA ESPECIAL DO HEADER --------

//Elementos da busca (formulário & input)
const formBuscaHeader = document.querySelector('.pesquisa-header');
const inputBuscaHeader = document.getElementById('busca-header');

//Quando enviar a busca do header
if (formBuscaHeader && inputBuscaHeader) {
  formBuscaHeader.addEventListener('submit', (event) => {
    event.preventDefault();   //impede de recarregar a página


    mostrarVideos(videosBusca); // Por enquanto, independente do que for digitado, troca o feed para mostrar vídeos do array "videosBusca"

  });
}


// -------------------- POSTS DO FEED --------------------

// Array de posts fixos
const postsFixos = [
  {
    id: 1001,
    usuario: '@bugexistencial',
    avatar: '../Imagens/menino1.png',
    texto: 'Às vezes acho que o verdadeiro bug sou eu e o JavaScript tá só reagindo.',
    curtidas: 10,
    comentarios: 3,
    reposts: 1,
    criadoEm: 'há 2h'
  },
  {
    id: 1002,
    usuario: '@naosoueu',
    avatar: '../Imagens/menino2.png',
    texto: 'infelizmente não dá pra gente ganhar todas mas perder todas aparentemente da sim.',
    curtidas: 30,
    comentarios: 8,
    reposts: 6,
    criadoEm: 'há 12h'
  },
  {
    id: 1003,
    usuario: '@IsaNaoBela',
    avatar: '../Imagens/menina2.png',
    texto: 'oi bb queria saber se você gosta de cocaína, porque hj eu tô só o pó',
    curtidas: 15,
    comentarios: 13,
    reposts: 2,
    criadoEm: 'ontem'
  },
  {
    id: 1004,
    usuario: '@jujuba',
    avatar: '/imagens/menina1.png',
    texto: 'Em breve o lançamento da minha nova personalidade para 2026.',
    curtidas: 60,
    comentarios: 8,
    reposts: 2,
    criadoEm: 'há 4h'
  },
  {
    id: 1005,
    usuario: '@Vick',
    avatar: '../Imagens/menina1.png',
    texto: 'como pode o vagalume existir? um animal com a bundinha de led ksksk.',
    curtidas: 100,
    comentarios: 18,
    reposts: 12,
    criadoEm: 'há 2 semanas'
  },
  {
    id: 1006,
    usuario: '@milliondollarman',
    avatar: '../Imagens/menino2.png',
    texto: 'e a oficina do diabo na minha mente vazia que já virou uma multinacional.',
    curtidas: 67,
    comentarios: 10,
    reposts: 16,
    criadoEm: 'há 3h'
  },
  {
    id: 1007,
    usuario: '@httpsmari',
    avatar: '../Imagens/menina1.png',
    texto: 'Fazendo o projeto na base de 2lt de energetico  e "Baby" do Justin.',
    curtidas: 10,
    comentarios: 3,
    reposts: 0,
    criadoEm: 'há 15h'
  },
  {
    id: 1008,
    usuario: '@maipuper',
    avatar: '../Imagens/menina2.png',
    texto: 'sinceramente eu não julgo o galo por começar o dia gritando.',
    curtidas: 70,
    comentarios: 10,
    reposts: 9,
    criadoEm: 'há 1h'
  },
  {
    id: 1009,
    usuario: '@leoleoleo',
    avatar: '../Imagens/menino3.png',
    texto: 'Aquela frase iconica da Inês Brasil "a saida é logo ali monamu".',
    curtidas: 8,
    comentarios: 2,
    reposts: 4,
    criadoEm: 'há 5h'
  },
  {
    id: 1010,
    usuario: '@quemario',
    avatar: '../Imagens/menino1.png',
    texto: 'piririn, piririn, piririn someone has called me, who is? its me, fireball and the heat is killing',
    curtidas: 90,
    comentarios: 8,
    reposts: 6,
    criadoEm: 'há 3h'
  },

];

// pega o container onde os posts vão ser inseridos no html
const listaPost = document.getElementById('lista-posts');

// Array que vai guardar todos os posts que existem no feed
const todosPosts = [];

//pega o formulário e o textarea do criar post
const formPost = document.getElementById('form-post');
const textoPost = document.getElementById('texto-post');

//se os elemntos existirem na página, adiciona o comportamento
if (formPost && textoPost) {
  formPost.addEventListener('submit', (event) => {
    event.preventDefault();  //impede o formulário de recarregar a página

    const texto = textoPost.value.trim(); // Salva o texto que o usuário escreveu (sem espaços sobrando).
    if (!texto) return;   //se o campo estiver vazio, sai da função

    // Carrega os posts já criados
    const postsCriados = carregarPostsCriados();

    // Cria um novo objeto de post
    const novoPost = {
      id: Date.now(), // id único baseado na hora atual
      usuario: '@davilla',
      avatar: '../Imagens/usuario.png',
      texto: texto,
      curtidas: 0,
      comentarios: 0,
      reposts: 0,
      criadoEm: 'agora mesmo'
    };

    // Salva esse novo post no array de posts criados
    postsCriados.push(novoPost);
    salvarPostsCriados(postsCriados);

    // Adiciona o novo post no início do array geral
    todosPosts.unshift(novoPost); // coloca no começo
    //atualiza o feed na tela
    mostrarPosts(todosPosts);

    // Limpa textarea depois de postar  
    textoPost.value = '';
  });
}

// ---------------- POSTS CRIADOS PELO USUÁRIO COM LOCALSTORAGE ----------------

//lê os posts criados pelo usuário que estão salvos no navegador
function carregarPostsCriados() {
  const dados = localStorage.getItem('postsCriados'); //lê a string salva na chave 'postsCriados'
  if (!dados) return [];   // Se for a primeira vez, começa com a lista de posts vazia.
  try {
    return JSON.parse(dados); // transforma a string JSON em array/objeto 
  } catch (e) {
    console.error('Erro ao ler postsCriados do localStorage', e);
    return []; //se der erro, devolve o array vazio
  }
}

// Salva os posts criados pelo usuário no localStorage
function salvarPostsCriados(posts) {
  localStorage.setItem('postsCriados', JSON.stringify(posts));
}

// ---------------- FUNÇÃO QUE MONTA OS POSTS NA TELA ----------------

function mostrarPosts(postsArray) {
  if (!listaPost) return;  // se o container não existir, não faz nada

  listaPost.innerHTML = "";  // Limpa todo o conteúdo atual

  // Lê do localStorage como estão as curtidas de cada post
  const curtidasSalvas = carregarCurtidasSalvas();

  // Para cada post do array, cria um article e coloca no HTML
  postsArray.forEach(post => {
    const article = document.createElement('article');
    article.classList.add('post');
    article.dataset.id = post.id; // Guarda o id no HTML

    // Pega a quantidade de curtidas do post
    const curtidasDoPost = curtidasSalvas[post.id]?. // Vê se já tem curtidas guardadas no navegador.
      quantidade ?? post.curtidas ?? 0; // Se não achar as curtidas salvas, começa do zero.


    // Verifica se esse post está curtido pelo usuário
    const estaCurtido = curtidasSalvas[post.id]?.curtido ?? false;

    // Monta o conteúdo do post
    article.innerHTML = `
      <header class="post-header">
        <img src="${post.avatar || '/imagens/usuario.jpg'}" alt="Foto do usuário" class="foto-usuario">
        <div>
          <h2 class="nome-usuario">${post.usuario || 'Usuário Anônimo'}</h2>
          <span class="tempo">${post.criadoEm || ''}</span>
        </div>
      </header>

      <p class="descricao">${post.texto}</p>
      
      <footer class="acoes">
        <div class="acoes-esquerda">
          <button class="curtir">
            <i class="${estaCurtido ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            <span class="qtd-curtidas">${curtidasDoPost}</span>
          </button>
          <button class="comentar"><i class="fa-regular fa-comment"></i></button>
          <button class="compartilhar"><i class="fa-solid fa-retweet"></i></button>
        </div>
        <div class="acoes-direita">
          <button class="salvar"><i class="fa-regular fa-bookmark"></i></button>
        </div>
      </footer>
    `;

    // Adiciona o article novo na tela, dentro da lista.
    listaPost.appendChild(article);
  });
}


// ------------ CARREGAR POSTS DA API ------------

async function carregarPostsDaAPI() {
  try {
    //  Carrega posts criados pelo usuário do localStorage
    const postsCriados = carregarPostsCriados();
    if (postsCriados.length > 0) {   // Se tiver posts criados, joga todos no array geral
      todosPosts.push(...postsCriados);
    }

    //Adiciona os posts fixos no array geral
    todosPosts.push(...postsFixos);

    //  Já mostra na tela os posts criados + fixos
    mostrarPosts(todosPosts);

    //  Faz a requisição pra API (JSONPlaceholder)
    const resposta = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    if (!resposta.ok) throw new Error('Erro na resposta da API');

    const dados = await resposta.json(); //transforma a resposta em JSON

    //Converte os dados da API para o formato dos posts
    const postsAPI = dados.map((post, index) => ({
      id: post.id,
      usuario: `Usuário ${index + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      texto: post.body,
      curtidas: Math.floor(Math.random() * 200),
      criadoEm: `há ${Math.floor(Math.random() * 23) + 1} h`
    }));

    // Junta os posts da API com o resto
    todosPosts.push(...postsAPI);
    mostrarPosts(todosPosts);
  } catch (erro) {
    console.error('Erro ao carregar posts da API:', erro);

    // Se der erro e ainda não tiver nada, garante que pelo menos os fixos apareçam
    if (todosPosts.length === 0) {
      todosPosts.push(...postsFixos);
    }
    mostrarPosts(todosPosts);
  }
}

carregarPostsDaAPI();  //Chama a função assim que o JS carregar, para começar mostrando os posts.


// ---------- CURTIDAS COM LOCALSTORAGE ---------

// Lê as curtidas salvas
function carregarCurtidasSalvas() {
  const dados = localStorage.getItem('curtidasPosts');
  if (!dados) return {}; //se não tiver nada, retorna objeto vazio
  try {
    return JSON.parse(dados);  // transforma a string JSON em objeto.
  } catch (e) {
    console.error('Erro ao ler curtidas do localStorage', e);
    return {};
  }
}

// Salva o objeto de curtidas no localStorage
function salvarCurtidas(dadosCurtidas) {
  localStorage.setItem('curtidasPosts', JSON.stringify(dadosCurtidas));
}

// Ouve cliques no botão de curtir dentro da área de posts.
if (listaPost) {
  listaPost.addEventListener('click', (event) => {
    // Procura o botão com classe .curtir mais próximo do lugar clicado
    const botao = event.target.closest('.curtir');
    if (!botao) return;

    // Acha o article .post mais próximo
    const article = botao.closest('.post');
    if (!article) return;

    // Lê o id do post no data-id
    const idPost = article.dataset.id;
    if (!idPost) return;

    const curtidasSalvas = carregarCurtidasSalvas();
    // Pega as curtidas salvas no localStorag

    const icone = botao.querySelector('i');
    const spanCurtidas = botao.querySelector('.qtd-curtidas');
    // Converte o texto do span em número
    let qtdAtual = Number(spanCurtidas.textContent) || 0;

    // Verifica se o post já está curtido
    const estaCurtido = curtidasSalvas[idPost]?.curtido ?? false;

    if (!estaCurtido) {
      // Se ainda não estava curtido - curtir agora
      icone.classList.remove('fa-regular');
      icone.classList.add('fa-solid');
      icone.style.color = '#8a2be2';
      qtdAtual++;
    } else {
      // Se já estava curtido - descurtir
      icone.classList.remove('fa-solid');
      icone.classList.add('fa-regular');
      icone.style.color = '';
      qtdAtual = Math.max(0, qtdAtual - 1);  // diminui 1, mas nunca deixa ficar negativo
    }

    // Atualiza o número no HTML
    spanCurtidas.textContent = qtdAtual;

    // Guarda a informação de que esse post foi curtido.
    curtidasSalvas[idPost] = {
      quantidade: qtdAtual,
      curtido: !estaCurtido // inverte o estado
    };

    // Atualiza no localStorage
    salvarCurtidas(curtidasSalvas);
  });
}

// ---------- SALVAR E RETWEET VISUAL (SEM LOCALSTORAGE) ----------

// Ouve os cliques dentro da área dos posts 
if (listaPost) {
  listaPost.addEventListener('click', (event) => {
    // Procura se o clique foi em um botão de salvar ou em algo dentro dele
    const botaoSalvar = event.target.closest('.salvar');
    // Procura se o clique foi em um botão de compartilhar
    const botaoRetweet = event.target.closest('.compartilhar');

    // ---------- LÓGICA DO BOTÃO SALVAR ----------
    if (botaoSalvar) {
      // Pega o ícone dentro do botão de salvar
      const iconeSalvar = botaoSalvar.querySelector('i');

      // Vê se o ícone do "salvo" já está preenchido.
      const estaSalvo = iconeSalvar.classList.contains('fa-solid'); // Se estiver "sólido", já está salvo.

      if (!estaSalvo) {
        // Se AINDA NÃO está salvo, tira o contorno 
        iconeSalvar.classList.remove('fa-regular');
        iconeSalvar.classList.add('fa-solid');  // - adiciona o estilo preenchido
        // - muda a cor para simular que foi salvo
        iconeSalvar.style.color = '#111011ff';
      } else {   // Se JÁ está salvo, volta para o estilo "regular" 
        iconeSalvar.classList.remove('fa-solid');
        iconeSalvar.classList.add('fa-regular');
        // tira a cor e volta ao padrão do CSS
        iconeSalvar.style.color = '';
      }
    }

    // ---------- LÓGICA DO BOTÃO RETWEET ----------

    if (botaoRetweet) {
      // Pega o ícone dentro do botão de retweet
      const iconeRetweet = botaoRetweet.querySelector('i');

      // Verifica se ele já está "ativado"
      const estaAtivo = iconeRetweet.style.color === 'rgb(138, 43, 226)' || iconeRetweet.style.color === '#8a2be2';

      if (!estaAtivo) {
        // Se ainda não está ativo, muda a cor para roxa pra simular que foi selecionado

        iconeRetweet.style.color = '#8a2be2';
      } else {
        // Se JÁ estava ativo, tira a cor
        iconeRetweet.style.color = '';
      }
    }
  });
}



// -------------- MODAL "MINHAS CURTIDAS"  --------------

// Pega elementos do modal de curtidas
const btnMinhasCurtidas = document.getElementById('btn-minhas-curtidas');
const modalCurtidas = document.getElementById('modal-curtidas');
const btnFecharModal = document.getElementById('fechar-modal-curtidas');
const listaCurtidasModal = document.getElementById('lista-curtidas-modal');

// Abre o modal com os posts curtidos
function abrirModalCurtidas() {
  listaCurtidasModal.innerHTML = '';   // Limpa o conteúdo anterior do modal

  // Lê as curtidas salvas no localStorage
  const curtidasSalvas = carregarCurtidasSalvas();
  // Pega só os IDs dos posts que estão curtidos
  const postsCurtidosIds = Object.keys(curtidasSalvas).filter(id => curtidasSalvas[id].curtido);

  if (postsCurtidosIds.length === 0) {
    // Se não tiver nenhum curtido, mostra mensagem
    listaCurtidasModal.innerHTML = '<p>Você ainda não curtiu nenhum post.</p>';
  } else {
    // Filtra o array geral de posts, pegando só os que estão curtidos
    const postsParaMostrar = todosPosts.filter(post =>
      postsCurtidosIds.includes(String(post.id))
    );

    // Para cada post curtido, cria uma cópia simplificada pra mostrar dentro do modal
    postsParaMostrar.forEach(post => {
      const article = document.createElement('article');
      article.classList.add('post');
      article.dataset.id = post.id;

      // Lê a quantidade de curtidas desse post
      const curtidasDoPost = curtidasSalvas[post.id]?.quantidade ?? post.curtidas ?? 0;

      article.innerHTML = `
        <header class="post-headercurtida">
          <img src="${post.avatar || '/imagens/usuario.jpg'}" alt="Foto do usuário" class="foto-usuario">
          <div>
            <h2 class="nome-usuario">${post.usuario || 'Usuário Anônimo'}</h2>
            <span class="tempo">${post.criadoEm || ''}</span>
          </div>
        </header>
        <p class="descricao">${post.texto}</p>
        <footer class="acoes">
          <div class="acoes-esquerda">
            <button class="curtir">
              <i class="fa-solid fa-heart" style="color: #8a2be2;"></i>
              <span class="qtd-curtidas">${curtidasDoPost}</span>
            </button>
            <button class="comentar"><i class="fa-regular fa-comment"></i></button>
          </div>
          <div class="acoes-direita">
            <button class="salvar"><i class="fa-regular fa-bookmark"></i></button>
          </div>
        </footer>
      `;
      listaCurtidasModal.appendChild(article);
    });
  }

  // Mostra o modal tirando a classe .escondido
  modalCurtidas.classList.remove('escondido');
}

// Fecha o modal de curtidas, adiciona a classe escondido
function fecharModalCurtidas() {
  modalCurtidas.classList.add('escondido');
}

// Eventos de abrir & fechar modal de curtidas
if (btnMinhasCurtidas) {
  btnMinhasCurtidas.addEventListener('click', abrirModalCurtidas);
}
if (btnFecharModal) {
  btnFecharModal.addEventListener('click', fecharModalCurtidas);
}

if (modalCurtidas) {
  modalCurtidas.addEventListener('click', (event) => {
    // se clicar fora do conteúdo (no fundo do modal), também fecha
    if (event.target === modalCurtidas) {
      fecharModalCurtidas();
    }
  });
}

//--------- COMENTÁRIOS FALSOS ----------

// Objeto que guarda comentários falsos por ID de post
const comentariosFalsos = {
  '1001': [
    { usuario: '@naosoueu', avatar: '/imagens/menino2.png', texto: 'KAKAKAKAKAKA forças' },
  ],
  '1003': [
    { usuario: '@milliondollarman', avatar: '/imagens/menino2.png', texto: 'Essa foi boa kkkkkk' },
    { usuario: '@maipuper', avatar: '/imagens/menina2.png', texto: 'LANÇOUUU' },
  ],
  '1007': [
    { usuario: '@Vick', avatar: '/imagens/menina2.png', texto: 'Pra mim baby sempre será a mais mais do Justin' },
  ],
  '1010': [
    { usuario: '@leoleoleo', avatar: '/imagens/menino3.png', texto: 'GENIAL AKAKAKAKAK' }
  ],

};


// ---------- MODAL DE COMENTÁRIOS ---------

// Elementos do modal de comentários
const modalComentarios = document.getElementById('modal-comentarios');
const btnFecharModalComentarios = document.getElementById('fechar-modal-comentarios');
const postOriginalContainer = document.getElementById('post-original-modal');
const listaComentariosModal = document.getElementById('lista-comentarios-modal');
const formComentario = document.getElementById('form-comentario');
const inputComentario = document.getElementById('input-comentario');

// Função pra abrir o modal de comentários de um post específico
function abrirModalComentarios(idDoPost) {
  // Encontra o post na lista de todos os posts.
  const post = todosPosts.find(p => String(p.id) === String(idDoPost));
  if (!post) return;

  // Limpa o conteúdo anterior
  postOriginalContainer.innerHTML = '';
  listaComentariosModal.innerHTML = '';

  // Clona o post original que está no feed
  const postClone = document.querySelector(`.post[data-id='${idDoPost}']`).cloneNode(true);
  // Remove a área de ações 
  const acoes = postClone.querySelector('.acoes');
  if (acoes) acoes.remove();
  // Coloca esse clone no topo do modal
  postOriginalContainer.appendChild(postClone);

  // Pega os comentários falsos pro ID informado
  const comentarios = comentariosFalsos[idDoPost] || [];

  if (comentarios.length === 0) {
    // Se não tiver comentários, mostra mensagem
    listaComentariosModal.innerHTML =
      '<p style="text-align: center; padding: 20px; color: #888;">Nenhum comentário ainda.</p>';
  } else {
    // Se tiver, cria um "item" pra cada comentário
    comentarios.forEach(com => {
      const item = document.createElement('div');
      item.className = 'item-comentario';
      item.innerHTML = `
        <img src="${com.avatar}" alt="Avatar de ${com.usuario}" class="avatar-comentario">
        <div class="conteudo-comentario">
          <p><strong>${com.usuario}</strong>${com.texto}</p>
        </div>
      `;
      listaComentariosModal.appendChild(item);
    });
  }

  // Salva o número (ID) do post atual no formulário, pra saber onde colocar o comentário depois.
  formComentario.dataset.postId = idDoPost;

  modalComentarios.classList.remove('escondido');    // Exibe o modal
}

// Fecha o modal de comentários
function fecharModalComentarios() {
  modalComentarios.classList.add('escondido');
  inputComentario.value = '';  //limpa o input do comentário
}

// Clique no botão "comentar" de qualquer post
if (listaPost) {
  listaPost.addEventListener('click', (event) => {
    const botaoComentar = event.target.closest('.comentar'); // procura botão comentar
    if (!botaoComentar) return;

    const postArticle = botaoComentar.closest('.post');  // acha o article
    if (!postArticle) return;

    const idDoPost = postArticle.dataset.id;  // pega o data-id
    abrirModalComentarios(idDoPost);   // abre o modal para esse post
  });
}

// Evento pra fechar o modal pelo botão X
btnFecharModalComentarios.addEventListener('click', fecharModalComentarios);

// Fecha modal se clicar fora do conteúdo
if (modalComentarios) {
  modalComentarios.addEventListener('click', (event) => {
    if (event.target === modalComentarios) {
      fecharModalComentarios();
    }
  });
}

// Enviar novo comentário (simulação)
if (formComentario) {
  formComentario.addEventListener('submit', (event) => {
    event.preventDefault();
    const texto = inputComentario.value;
    if (!texto.trim()) return;  // se estiver vazio, não faz nada

    // Cria um objeto de comentário falso
    const novoComentario = {
      usuario: '@davilla',
      avatar: '/imagens/usuario.png',
      texto: texto
    };

    // Cria o elemento visual para esse comentário novo
    const item = document.createElement('div');
    item.className = 'item-comentario';
    item.innerHTML = `
      <img src="${novoComentario.avatar}" alt="Avatar de ${novoComentario.usuario}" class="avatar-comentario">
      <div class="conteudo-comentario">
        <p><strong>${novoComentario.usuario}</strong>${novoComentario.texto}</p>
      </div>
    `;

    // Se tinha a mensagem "Nenhum comentário ainda", remove
    const pSemComentarios = listaComentariosModal.querySelector('p');
    if (pSemComentarios) pSemComentarios.remove();

    // Adiciona o novo comentário na lista
    listaComentariosModal.appendChild(item);

    inputComentario.value = '';     // Limpa o input
  });
}

// ------------- MODAL SALVOS (Falsos) ------------

// Posts falsos para aparecer em "Salvos"
const salvosFakes = [
  {
    id: 1,
    usuario: '@quemario',
    avatar: '/imagens/menino2.png',
    texto: 'Meta de vida: ter a estabilidade emocional do localStorage (nunca esquece nada).',
    criadoEm: 'há 1h'
  },
  {
    id: 2,
    usuario: '@isaNaobela',
    avatar: '/imagens/menina2.png',
    texto: 'CSS É UMA DESGRAÇA',
    criadoEm: 'há 3h'
  }
];
const btnSalvos = document.getElementById('btn-salvos');
const modalSalvos = document.getElementById('modal-salvos');
const btnFecharModalSalvos = document.getElementById('fechar-modal-salvos');
const listaSalvosModal = document.getElementById('lista-salvos-modal');

// Abre o modal de salvos
function abrirModalSalvos() {
  // Limpa conteúdo anterior
  listaSalvosModal.innerHTML = '';

  if (salvosFakes.length === 0) {
    // Se não tiver posts salvos, mostra mensagem
    listaSalvosModal.innerHTML = '<p>Você ainda não salvou nenhum post.</p>';
  } else {
    // Para cada post falso de salvos, monta um article simples
    salvosFakes.forEach(post => {
      const article = document.createElement('article');
      article.classList.add('post');
      article.dataset.id = post.id;

      article.innerHTML = `
        <header class="post-headersalvos">
          <img src="${post.avatar}" alt="Foto do usuário" class="foto-usuario">
          <div>
            <h2 class="nome-usuario">${post.usuario || 'Usuário Anônimo'}</h2>
            <span class="tempo">${post.criadoEm || ''}</span>
          </div>
        </header>
        <p class="descricao">${post.texto}</p>
        <footer class="acoes">
          <div class="acoes-esquerda">
            <button class="comentar"><i class="fa-regular fa-comment"></i></button>
          </div>
        </footer>
      `;
      listaSalvosModal.appendChild(article);
    });
  }

  // Mostra o modal (remove classe que esconde)
  modalSalvos.classList.remove('escondido');
}

// Fecha o modal de salvos
function fecharModalSalvos() {
  modalSalvos.classList.add('escondido');
}
// Eventos de abrir/fechar modal de salvos
if (btnSalvos) {
  btnSalvos.addEventListener('click', abrirModalSalvos);
}
if (btnFecharModalSalvos) {
  btnFecharModalSalvos.addEventListener('click', fecharModalSalvos);
}

if (modalSalvos) {
  modalSalvos.addEventListener('click', (event) => {
    if (event.target === modalSalvos) {
      fecharModalSalvos();
    }
  });
}



// ---------- MENU LATERAL MOBILE (TOGGLE) ----------

// botão que abre/fecha o menu 
const btnMenu = document.querySelector('.menu-toggle');
const menuLateral = document.querySelector('.menu-lateral');
// um overlay (fundo escuro) que aparece quando o menu está aberto
const overlayMenu = document.getElementById('overlay-menu');

// Só faz o código funcionar se as 3 elementos na página estiverem lá.
if (btnMenu && menuLateral && overlayMenu) {
  // ao clicar no botão do menu
  btnMenu.addEventListener('click', () => {
    // toggle: se tem 'ativo' remove, se não tem adiciona
    const estaAtivo = menuLateral.classList.toggle('ativo');

    // se o menu agora ficou ativo, também mostra o overlay
    if (estaAtivo) {
      overlayMenu.classList.add('ativo');
    } else {
      // se fechou, oculta o overlay
      overlayMenu.classList.remove('ativo');
    }
  });

  // se clicar no overlay (fora do menu), fecha o menu e o overlay
  overlayMenu.addEventListener('click', () => {
    menuLateral.classList.remove('ativo');
    overlayMenu.classList.remove('ativo');
  });
}



// ============ DROPDOWN DE NOTIFICAÇÕES (LATERAL + FOOTER) ============

// Pega o botão de notificação que fica na lateral da página
const btnNotificacaoLateral = document.getElementById('btn-notificacao-lateral');
// Pega o botão de notificação que fica no rodapé 
const btnNotificacaoFooter = document.getElementById('btn-notificacao-footer');
// Pega a caixa (dropdown) que mostra as notificações
const dropdown = document.getElementById('dropdown-notificacao');


const toggleDropdown = (event, botaoClicado) => {
  // Impede que o clique suba para outros elementos da página
  event.stopPropagation();

  // Alterna a classe 'visivel' na caixa de notificações 
  const isVisivel = dropdown.classList.toggle('visivel');

  // Se a caixa ficou visível, ajusta a posição dela
  if (isVisivel) {
    // Se o botão do rodapé foi clicado, posiciona a caixa perto dele 
    if (botaoClicado.id === 'btn-notificacao-footer') {
      dropdown.style.position = 'fixed';
      dropdown.style.bottom = '55px';
      dropdown.style.right = '10px';
      dropdown.style.top = 'auto';
      dropdown.style.left = 'auto';
    } else {  // Senão, posiciona a caixa perto do botão lateral
      dropdown.style.position = 'absolute';
      dropdown.style.top = '100%';
      dropdown.style.left = '0';
      dropdown.style.bottom = 'auto';
      dropdown.style.right = 'auto';
    }
  }
};

// Se o botão lateral e a caixa de notificações existirem, adiciona o clique
if (btnNotificacaoLateral && dropdown) {
  btnNotificacaoLateral.addEventListener('click', (event) =>
    toggleDropdown(event, btnNotificacaoLateral)
  );
}
// Se o botão do rodapé e a caixa de notificações existirem, adiciona o clique
if (btnNotificacaoFooter && dropdown) {
  btnNotificacaoFooter.addEventListener('click', (event) =>
    toggleDropdown(event, btnNotificacaoFooter)
  );
}

// Fecha o dropdown quando clicar em qualquer lugar fora dele
if (dropdown) {
  // Ouve cliques em qualquer lugar do documento
  document.addEventListener('click', (event) => {
    // só fecha se o dropdown estiver visível e o clique NÃO for dentro do próprio dropdown
    if (dropdown.classList.contains('visivel') && !dropdown.contains(event.target)) {
      dropdown.classList.remove('visivel');
    }
  });
}




// ------------ BOTÃO "POSTAR" DO MENU LATERAL ------------

// botão do menu lateral que leva o usuário para o formulário de criação de post
const btnPostarMenu = document.getElementById('btn-postar-menu');

// Se existir o botão e o formPost
if (btnPostarMenu && formPost) {
  btnPostarMenu.addEventListener('click', () => {
    // Garante que a aba posts esteja ativa
    if (feedPosts && feedVideos) {
      feedPosts.classList.add('ativa');
      feedVideos.classList.remove('ativa');

      // Atualiza visualmente os botões de aba
      botoesAbas.forEach(b => {
        const aba = b.dataset.aba;
        if (aba === 'posts') {
          b.classList.add('ativo');
        } else if (aba === 'videos') {
          b.classList.remove('ativo');
        }
      });
    }


    // Dá foco na caixa de texto
    textoPost.focus();
  });
}



// ------------ MODO ESCURO ------------

// pega o body
const body = document.getElementById('body');
//  pega o botão que ativa/desativa o tema
const btnModo = document.getElementById('btn-modo');

// Muda o visual se for 'dark', deixa escuro, senão, volta ao modo claro.
function aplicarTema(tema) {
  if (tema === 'dark') {
    body.classList.add('modo-escuro');
    // troca o icone do botão pra indicar que agora está em modo claro 
    btnModo.innerHTML = '<i class="fa-regular fa-sun"></i>Modo Claro';
  } else {
    body.classList.remove('modo-escuro');
    // botão mostra que pode ativar o modo escuro (ícone de lua)
    btnModo.innerHTML = '<i class="fa-regular fa-moon"></i>Modo Escuro';
  }
}

// tenta recuperar o tema salvo anteriormente no navegador
const temaSalvo = localStorage.getItem('tema');

// se houver tema salvo, aplica ele
if (temaSalvo) {
  aplicarTema(temaSalvo);
} else {
  aplicarTema('light'); //se não, aplica "light" 
}

// ao clicar no botão de tema, alterna entre claro/escuro e salva no localStorage
if (btnModo) {
  btnModo.addEventListener('click', () => {
    const estaEscuro = body.classList.contains('modo-escuro');

    if (estaEscuro) {
      // Se já está escuro - muda pra claro e salva a preferência
      aplicarTema('light');
      localStorage.setItem('tema', 'light');
    } else {
      // Se está claro - muda pra escuro e salva
      aplicarTema('dark');
      localStorage.setItem('tema', 'dark');
    }
  });
}

// -------------  BOTÕES HOME -------------

// Seleciona todos os botões home
const botoesHome = document.querySelectorAll('.btn-home');

// Para cada botão home, impede o comportamento padrão e mostra um alerta
botoesHome.forEach(botao => {
  botao.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Essa funcionalidade ainda está em desenvolvimento, aguarde atualização.');
  });
});

