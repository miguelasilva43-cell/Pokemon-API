const TOTAL_POKEMON = 1010; // Para testes, evite 1010
let todosPokemons = [];

// Limpa os cards
function limparPokedex() {
    document.getElementById("pokedex").innerHTML = "";
}

// Cria badge do tipo
function criarBadge(tipo) {
    const span = document.createElement("span");
    span.className = "type-badge type-" + tipo;
    span.textContent = tipo;
    return span;
}

// Cria card do Pokémon
function criarCardPokemon(dados) {
    const container = document.getElementById("pokedex");

    const card = document.createElement("div");
    card.className = "pokemon-card";

    const img = document.createElement("img");
    img.src = dados.sprites.front_default;

    const nome = document.createElement("h6");
    nome.textContent = dados.name;

    const numero = document.createElement("small");
    numero.textContent = "#" + dados.id.toString().padStart(3, '0');

    const tiposDiv = document.createElement("div");
    dados.types.forEach(t => tiposDiv.appendChild(criarBadge(t.type.name)));

    card.append(img, nome, numero, tiposDiv);
    container.appendChild(card);
}

// Busca Pokémon pela API
function buscarPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(dados => {
            todosPokemons.push(dados);
            todosPokemons.sort((a,b) => a.id - b.id);
            limparPokedex();
            todosPokemons.forEach(p => criarCardPokemon(p));
        });
}

// Carrega os Pokémons
function carregarPokemons() {
    for (let i = 1; i <= TOTAL_POKEMON; i++) {
        buscarPokemon(i);
    }
}

// Pesquisa Pokémon
function pesquisarPokemon(valor) {
    const texto = valor.toLowerCase();
    limparPokedex();
    todosPokemons.forEach(p => {
        if (p.name.includes(texto) || p.id.toString().includes(texto)) {
            criarCardPokemon(p);
        }
    });
}

// Carrossel
let imgIndex = 0;
function trocarImagem() {
    const carousel = document.getElementById("top-carousel");
    const imgs = carousel.getElementsByTagName("img");
    for (let img of imgs) img.style.opacity = 0;
    imgs[imgIndex].style.opacity = 1;
    imgIndex = (imgIndex + 1) % imgs.length;
}

// Inicialização
window.onload = function() {
    carregarPokemons();
    trocarImagem();
    setInterval(trocarImagem, 5000);
};