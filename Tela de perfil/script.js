// Mock API - Simulação de dados da API
const mockAPI = {
    getUserProfile: async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            username: 'Felipe',
            fullName: 'Felipe Silva',
            bio: 'Músico',
            location: 'Pernambuco',
            description: 'Criando experiências digitais incríveis',
            avatar: './Avatar.png',
            stats: {
                posts: 2,
                followers: '25k',
                following: 300,
                reposts: 2
            }
        };
    },
    
    getPosts: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [
            {
                id: 1,
                image: '/imagens/foto1.png',
                caption: 'Music❤️🔥',
                likes: 321,
                comments: 32
            },
            {
                id: 2,
                image: '/imagens/foto2.png',
                caption: 'Curtindo uma prainha☀️',
                likes: 1000,
                comments: 155
            }
        ];
    },
    
    getReposts: async () => {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return [
            {
                id: 1,
                image: '/imagens/republicado1.png',
                caption: 'Show incrível ontem! 🎸',
                likes: 850,
                comments: 67
            },
            {
                id: 2,
                image: '/imagens/republicado2.png',
                caption: 'Momentos únicos ☀️',
                likes: 642,
                comments: 48
            }
        ];
    }
};

// Função para formatar números
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
}

// Função para criar card de post
function createPostCard(post, isRepost = false) {
    const card = document.createElement('div');
    card.className = 'galeria-intem';
    
    let repostBadge = '';
    if (isRepost) {
        repostBadge = `
            <div class="repost-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1L21 5L17 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 23L3 19L7 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Republicado
            </div>
        `;
    }
    
    card.innerHTML = `
        ${repostBadge}
        <img src="${post.image}" alt="${post.caption}" onerror="this.src='https://via.placeholder.com/500x300?text=Imagem'">
        <p>${post.caption}</p>
        <div class="overlay">
            <span>${formatNumber(post.likes)} ❤️</span>
            <span>${post.comments} 💬</span>
        </div>
    `;
    
    return card;
}

// Carregar dados do perfil
async function loadProfile() {
    try {
        const profile = await mockAPI.getUserProfile();
        document.getElementById('posts-count').textContent = profile.stats.posts;
        document.getElementById('followers-count').textContent = profile.stats.followers;
        document.getElementById('following-count').textContent = profile.stats.following;
        document.getElementById('reposts-count').textContent = profile.stats.reposts;
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
}

// Carregar publicações
async function loadPosts() {
    const container = document.getElementById('galeria-publicacoes');
    const loading = document.querySelector('#publicacoes .loading');
    
    try {
        const posts = await mockAPI.getPosts();
        loading.style.display = 'none';
        
        posts.forEach(post => {
            container.appendChild(createPostCard(post, false));
        });
    } catch (error) {
        console.error('Erro ao carregar publicações:', error);
        loading.textContent = 'Erro ao carregar publicações';
    }
}

// Carregar republicados
async function loadReposts() {
    const container = document.getElementById('galeria-republicados');
    const loading = document.querySelector('#republicados .loading');
    
    try {
        const reposts = await mockAPI.getReposts();
        loading.style.display = 'none';
        
        reposts.forEach(post => {
            container.appendChild(createPostCard(post, true));
        });
    } catch (error) {
        console.error('Erro ao carregar republicados:', error);
        loading.textContent = 'Erro ao carregar republicados';
    }
}

// Sistema de abas
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.content-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadPosts();
    loadReposts();
});