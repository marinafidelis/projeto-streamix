const API = {
  
    getProfile: async () => {
        await delay(800);
        return {
            username: 'Usuario',
            occupation: '🎵 Músico',
            location: '📍 Pernambuco',
            description: 'Criando experiências digitais incríveis',
            avatar: './Avatar.png',
            stats: {
                posts: 3,
                followers: '25k',
                following: 300,
                reposts: 2
            }
        };
    },

    
    getPosts: async () => {
        await delay(1000);
        return [
            {
                id: 1,
                type: 'text',
                caption: 'Novo projeto musical chegando! 🎵✨',
                likes: 450,
                comments: 28
            },
            {
                id: 2,
                type: 'text',
                caption: 'Nos bastidores do show de ontem 🎸🔥',
                likes: 892,
                comments: 64
            },
            {
                id: 3,
                type: 'text',
                caption: 'Ensaio de hoje foi incrível! ❤️🎶',
                likes: 621,
                comments: 41
            }
        ];
    },

    
    getReposts: async () => {
        await delay(1200);
        return [
            {
                id: 1,
                type: 'text',
                caption: 'A musica tem o poder de transformar✨',
                likes: 1200,
                comments: 750,
                
            },
         
            {
                id: 2,
                type: 'text',
                caption: 'Cada acorde conta uma historia❤️🎶',
                likes: 700,
                comments: 258,           
                
                
            }
        ];
    }
};


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
};



const createPostCard = (post, isRepost = false) => {
    const card = document.createElement('div');
    card.className = 'post-card';

    let content = '';

   
    if (isRepost) {
        content += `
            <div class="repost-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M17 1L21 5L17 9M3 11V9C3 6 5 5 7 5H21M7 23L3 19L7 15M21 13V15C21 18 19 19 17 19H3" 
                          stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Republicado
            </div>
        `;
    }

    
    if (post.type === 'youtube') {
        content += `
            <div class="post-media">
                <iframe 
                    src="${post.videoUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                ${post.duration ? `<div class="duration-badge">${post.duration}</div>` : ''}
            </div>
            <div class="post-content">
                <div class="post-caption">${post.caption}</div>
            </div>
        `;
    } else if (post.type === 'video') {
        content += `
            <div class="post-media">
                <video controls>
                    <source src="${post.videoUrl}" type="video/mp4">
                    Seu navegador não suporta vídeo.
                </video>
                ${post.duration ? `<div class="duration-badge">${post.duration}</div>` : ''}
            </div>
            <div class="post-content">
                <div class="post-caption">${post.caption}</div>
            </div>
        `;
    } else if (post.type === 'image') {
        content += `
            <div class="post-media">
                <img src="${post.imageUrl}" alt="${post.caption}">
            </div>
            <div class="post-content">
                <div class="post-caption">${post.caption}</div>
            </div>
        `;
    } else if (post.type === 'text') {
        card.classList.add('text-only');
        content += `
            <div class="post-caption">${post.caption}</div>
        `;
    }

    
    content += `
        <div class="post-stats">
            <div class="stat-item">
                <span>❤️</span>
                <span>${formatNumber(post.likes)}</span>
            </div>
            <div class="stat-item">
                <span>💬</span>
                <span>${formatNumber(post.comments)}</span>
            </div>
        </div>
    `;

    card.innerHTML = content;
    return card;
};

const createEmptyState = (message) => {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>${message}</p>
    `;
    return empty;
};


const loadProfile = async () => {
    try {
        const profile = await API.getProfile();
        
        document.getElementById('posts-count').textContent = formatNumber(profile.stats.posts);
        document.getElementById('followers-count').textContent = formatNumber(profile.stats.followers);
        document.getElementById('following-count').textContent = formatNumber(profile.stats.following);
        document.getElementById('reposts-count').textContent = formatNumber(profile.stats.reposts);
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
};

const loadPosts = async () => {
    const container = document.getElementById('grid-publicacoes');
    const loading = document.querySelector('#publicacoes .loading');

    try {
        const posts = await API.getPosts();
        loading.classList.add('hidden');

        if (posts.length === 0) {
            container.appendChild(createEmptyState('Nenhuma publicação ainda'));
        } else {
            posts.forEach(post => {
                container.appendChild(createPostCard(post, false));
            });
        }
    } catch (error) {
        console.error('Erro ao carregar publicações:', error);
        loading.innerHTML = '<p style="color: #e74c3c;">Erro ao carregar publicações</p>';
    }
};

const loadReposts = async () => {
    const container = document.getElementById('grid-republicados');
    const loading = document.querySelector('#republicados .loading');

    try {
        const reposts = await API.getReposts();
        loading.classList.add('hidden');

        if (reposts.length === 0) {
            container.appendChild(createEmptyState('Nenhum republicado ainda'));
        } else {
            reposts.forEach(post => {
                container.appendChild(createPostCard(post, true));
            });
        }
    } catch (error) {
        console.error('Erro ao carregar republicados:', error);
        loading.innerHTML = '<p style="color: #e74c3c;">Erro ao carregar republicados</p>';
    }
};


const initTabs = () => {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            
            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
};


let allPosts = [];
let allReposts = [];

const initSearch = () => {
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        
        if (query) {
            clearBtn.classList.add('visible');
        } else {
            clearBtn.classList.remove('visible');
        }

        performSearch(query);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.remove('visible');
        performSearch('');
        searchInput.focus();
    });
};

const performSearch = (query) => {
    const activeTab = document.querySelector('.tab.active').dataset.tab;
    const grid = document.getElementById(`grid-${activeTab}`);
    const cards = grid.querySelectorAll('.post-card');
    
    let visibleCount = 0;

    cards.forEach(card => {
        const caption = card.querySelector('.post-caption')?.textContent.toLowerCase() || '';
        
        if (!query || caption.includes(query)) {
            card.classList.remove('hidden');
            if (query) {
                card.classList.add('highlight');
                setTimeout(() => card.classList.remove('highlight'), 600);
            }
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    
    const oldInfo = grid.querySelector('.search-results-info');
    if (oldInfo) oldInfo.remove();

    
    if (query) {
        const info = document.createElement('div');
        info.className = 'search-results-info';
        info.textContent = visibleCount === 0 
            ? `Nenhum resultado encontrado para "${query}"`
            : `${visibleCount} resultado(s) encontrado(s)`;
        grid.insertBefore(info, grid.firstChild);
    }
};



const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


const initStatsInteraction = () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('click', () => {
            const label = stat.querySelector('.stat-label').textContent;
            console.log(`Clicou em: ${label}`);
            
        });
    });
};


const initLazyLoad = () => {
    const iframes = document.querySelectorAll('iframe');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    observer.unobserve(iframe);
                }
            }
        });
    });

    iframes.forEach(iframe => observer.observe(iframe));
};


const animateCardsOnScroll = () => {
    const cards = document.querySelectorAll('.post-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Streamix iniciado!');
    
    
    initTabs();
    
    
    loadProfile();
    loadPosts();
    loadReposts();
    
    setTimeout(() => {
        initStatsInteraction();
        initLazyLoad();
        animateCardsOnScroll();
        initSearch();
    }, 1500);
    
    console.log('✅ Todos os dados foram carregados!');
});