let times = []
const endpointDaAPI = "https://res.cloudinary.com/df9vsxetm/raw/upload/v1677692874/meteu%20essa/times_pglace.json"
const info = document.getElementById("info")
const botoes = document.querySelectorAll('.btn')
botoes.forEach(btn => btn.addEventListener('click', filtrarTimes))

APIResult()

async function APIResult(){
    const res = await fetch(endpointDaAPI)
    times = await res.json()
    mostrarEquipes(times)
}

function mostrarEquipes(time){
    info.innerHTML = " "
    time.forEach( time => {
        info.innerHTML += 
        `<h1>${time.nome}</h1>
        <img src="${time.imagem}" width="10%">
        <p>Títulos: ${time.titulos}</p>
        <p>Fundado em: ${time.Fundado}</p>`
        }
    )
}

function filtrarTimes(){
    const elementoBtn = document.getElementById(this.id)
    const categoria = elementoBtn.value
    let timesFiltrados = filtrarPorGrandeza(categoria)
    mostrarEquipes(timesFiltrados)
}

function filtrarPorGrandeza(categorias){
    return times.filter(time => time.categoria == categorias)
}
