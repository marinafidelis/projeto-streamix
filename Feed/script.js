//----------------- Troca de abas (videos/posts) -------------

const botoes = document.querySelectorAll('.btn-aba, .btn-aba-footer');   // pega os botões do header e do footer

// pega os feeds
const feedVideos = document.getElementById('feed-videos');
const feedPosts = document.getElementById('feed-posts');

// estado inicial: vídeos visíveis
feedVideos.classList.add('ativa');
feedPosts.classList.remove('ativa');

botoes.forEach(btn => {
  btn.addEventListener('click', () => {
    // tira "ativo" de todos os botões
    botoes.forEach(b => b.classList.remove('ativo'));
    // coloca "ativo" no botão clicado
    btn.classList.add('ativo');

    // / Pega a aba correta do Data-aba
    const aba = btn.dataset.aba;  // videos ou posts

    if (aba === 'videos') {
      feedVideos.classList.add('ativa');
      feedPosts.classList.remove('ativa');
    } else if (aba === 'posts') {
      feedPosts.classList.add('ativa');
      feedVideos.classList.remove('ativa');
    }
  });
});