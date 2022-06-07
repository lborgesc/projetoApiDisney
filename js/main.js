function novoElemento ( tagName, className ) {
    const elem = document.createElement(tagName)
    elem.className = className;
    return elem
}

function Card (img, nome, filme, tvShow) {

    const li = novoElemento ('li', 'card')

    li.innerHTML += `
        <img src="${img}" alt="">

        <h4>Nome:</h4>
            <span>${nome}</span>
        <h4>Filmes:</h4>
            <span>
                ${filme}
            </span>

        <h4>Tv Shows:</h4>
            <span>
            ${tvShow}
            </span>
    `

    document.querySelector('ul').appendChild(li)    
}

async function fetchApi ( url ) {
    try {
        const resp = await fetch(url)
        const json = await resp.json()
        return json.data
    } catch (error) {
        console.log(error);
    }
}


function DisneyAPi ( ) {
    const api = new Promise( resolve => resolve (fetchApi( "https://api.disneyapi.dev/characters" )))
    let contador = 10;

    document.querySelector('button').addEventListener('click',( ) => {
        contador = contador + 10;
        api.then(r => atualizarPagina(r, contador))
    })

    api.then(r => atualizarPagina(r))
}

function atualizarPagina ( array, contador = 10 ) {
    limpartema()
    array.map(( card, index ) => {
        if (index < contador) {
            new Card ( card.imageUrl, card.name, card.films[0], card.tvShows[0] )
        }
    })
}

function limpartema ( ) {
    const todoList = document.querySelector('ul');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

new DisneyAPi()