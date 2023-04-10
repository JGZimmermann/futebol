let times = []
let comentario = JSON.parse(localStorage.getItem('comentario') || '[]')
localStorage.setItem('comentario',JSON.stringify(comentario))
let timeProfile = ""
let escudo = ""
let senha = ""
let usuario = localStorage.getItem("sessionUser")
const endpointDaAPI = "https://res.cloudinary.com/df9vsxetm/raw/upload/v1678121235/meteu%20essa/times_qbbkfp.json"
let users = JSON.parse(localStorage.getItem('usuarios') || '[]')
localStorage.setItem('usuarios',JSON.stringify(users))
apiResult()

async function apiResult(){
    const res = await fetch(endpointDaAPI)
    times = await res.json()
}

function verifyLogon(){
    if(localStorage.getItem("logged") != "Yes") {
        document.body.innerHTML = "Você não está logado, favor voltar para a home"
        setTimeout(backHome, 3000)
    }
}

function buildHome(){
    let bodyHome = document.getElementById("bodyPart")
    if(localStorage.getItem("logged") != "Yes") {
        bodyHome.innerHTML = 
        `
        <h1 class="center">Login</h1>
            <div class="row">
                <form class="col s12">
                <div class="input-field col s6 offset-s3">
                    <input id="name" type="text" class="validate">
                    <label for="name">Login</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input id="password" type="text" class="validate">
                    <label for="password">Senha</label>
                    <a class="waves-effect waves-light btn transparent grey-text" href="alterarsenha.html">Esqueceu sua senha?</a>
                </div>
                <a class="waves-effect waves-light btn black col s2 offset-s5" onclick="logIn()">Login</a>
            </div>
            <p class="center" style="margin-top: 6em;">Ainda não possui login, faça cadastro no nosso site</p>
            <div class="center">
            <a class="btn black" href="cadastro.html">Cadastre-se</a>
            </div>
        `
    } else {
        bodyHome.innerHTML = 
        `

        `
    }
}

function buildFormSignUp(){
    let signUpForm = document.getElementById('signUpForm')
    times.forEach(time => 
        signUpForm.innerHTML += 
        `
        <div class="row">
        <form action="#" class="col s4 offset-s3">
            <p>
            <label>
                <input class="with-gap" name="group1" type="radio"  value="${time.nome}"/>
                <span><img src="${time.imagem}" width="25px"> &nbsp${time.nome}</span>
            </label>
            </p>
        `
    )
    signUpForm.innerHTML += 
    `
    <div class="row">
        <a class="waves-effect waves-light btn black col s2 offset-s5" onclick="signUp()">Cadastro</a><br>
        <p class="col s5 offset-s3">*Ao escolher mais de um time ele irá selecionar o ultimo time na ordem da lista</p>
    </div>
    `
}

function signUp(){
    let verifyUsers = []
    let time = ""
    let nameInput = document.getElementById("name").value
    let passwordInput = document.getElementById("password").value
    let checkbox = document.getElementsByName("group1")

    checkbox.forEach(marked =>{
        console.log(marked.value)
            if(marked.checked){
                time = marked.value
            }
            }
        )

    let user = {
        nome : nameInput,
        senha: passwordInput,
        time: time
    }

    if(users.length != 0 && user.nome != "" && user.senha != ""){
        users.forEach(time => 
                verifyUsers.push(time.nome)
            )
        if(verifyUsers.includes(user.nome) == false){
            users.push(user)
            localStorage.setItem("usuarios", JSON.stringify(users))
            alert("Usuário cadastrado!")
            window.location.href = "home.html";

        } else {
            alert("Usuário já cadastrado ou inválido")
        }
    } else{
        if(user.nome != "" && user.senha != ""){
            users.push(user)
            localStorage.setItem("usuarios", JSON.stringify(users))
            alert("Usuário cadastrado!")
            window.location.href = "home.html";
        }
    }
    
}

function logIn() {
    let nameInput = document.getElementById("name").value
    let passwordInput = document.getElementById("password").value

    users.forEach(usuario => 
            {
                if (usuario.nome == nameInput && usuario.senha == passwordInput) {
                    localStorage.setItem("logged", "Yes")
                    localStorage.setItem("sessionUser", nameInput)
                    location.reload()
                }
            }
        )
        if(localStorage.getItem("logged") != "Yes") {
            alert("Login ou senha incorreta")
        }
}

function changePassword(){
    let sessionUser = document.getElementById("sessionUser").value
    let sessionPassword = document.getElementById("sessionPassword").value
    if(localStorage.getItem("logged") == "Yes"){
        users.forEach(usuario =>
                {
                    if(usuario.nome == localStorage.getItem("sessionUser") && sessionPassword != ""){
                        let index = users.indexOf(usuario)
                        users[index].senha = sessionPassword
                        localStorage.setItem("usuarios", JSON.stringify(users))
                        alert("Senha alterada com sucesso!")
                    }
                }
            )
    } else {
        users.forEach(usuario => 
                {
                    if(usuario.nome == sessionUser && sessionUser != "" && sessionPassword != ""){
                        let index = users.indexOf(usuario)
                        users[index].senha = sessionPassword
                        localStorage.setItem("usuarios", JSON.stringify(users))
                        alert("Senha alterada com sucesso!")
                    }
                }
            )
    }
}

function fillInput(){
    let sessionUser = document.getElementById("sessionUser")
    if(localStorage.getItem("logged") == "Yes"){
        sessionUser.value = localStorage.getItem("sessionUser")
    }
}

function backHome() {
    window.location.href = "home.html";
}

function buildTeams() {
    const info = document.getElementById("info")
    const botoes = document.querySelectorAll('.btn')
    botoes.forEach(btn => btn.addEventListener('click', filterTeams))
    showTeams(times)
}

function showTeams(time){
    info.innerHTML = `
        <div class="row">
            <p class="center-align col s3" style="font-weight: bolder;">Escudo</p>
            <p class="center-align col s3" style="font-weight: bolder;">Time</p>
            <p class="center-align col s3" style="font-weight: bolder;">Títulos</p>
            <p class="center-align col s3" style="font-weight: bolder;">Fundado</p>
        </div>
    `
    time.forEach( time => {
        info.innerHTML += 
        `
        <div class="row">
            <div class="center-align col s3">
                <img width="50px" src="${time.imagem}">
            </div>
            <p class="center-align col s3">${time.nome}</p>
            <p class="center-align col s3">${time.titulos}</p>
            <p class="center-align col s3">${time.Fundado}</p>
        </div>
          `
        }
    )
}

function filterTeams(){
    const elementoBtn = document.getElementById(this.id)
    const categoria = elementoBtn.value
    let timesFiltrados = filterByCategory(categoria)
    showTeams(timesFiltrados)
}

function filterByCategory(categorias){
    return times.filter(time => time.categoria == categorias)
}

function buildProfile(){
    verifyLogon()
    searchUser()
    let profile = document.getElementById("profile")
    profile.innerHTML = 
    `
    <div class="container" style="margin-top: 7em;">
        <img src="${escudo}" width="20%">
        <div class="right">
          <h4>Nome</h4>
          <p>${usuario}</p>
          <h4>Senha</h4>
          <p>${senha}</p>
          <h4>Time</h4>
          <p>${timeProfile}</p>
        </div>
        <br>
        <a class="waves-effect waves-light btn black" href="alterarsenha.html"><i class="material-icons right">password</i>Alterar senha</a>
        <br>
        <a class="waves-effect waves-light btn red" onclick="logOut()"><i class="material-icons right">logout</i>Sair</a>
      </div> 
    `

}

function logOut() {
    localStorage.removeItem("sessionUser")
    localStorage.removeItem("logged")
    location.reload()
}

function createTable(){
    verifyLogon()
    let table = document.getElementById("table")
    let i = 1
    let points = 114

    table.innerHTML = `
        <div class="row">
        <p class="center-align col s3" style="font-weight: bolder;">Colocação</p>
            <p class="center-align col s3" style="font-weight: bolder;">Escudo</p>
            <p class="center-align col s3" style="font-weight: bolder;">Time</p>
            <p class="center-align col s3" style="font-weight: bolder;">Pontos</p>
        </div>
    `
    times.forEach( time => {
        table.innerHTML += 
        `
        <div class="row">
            <p class="center-align col s3">${i}</p>
            <div class="center-align col s3">
                <img width="50px" src="${time.imagem}">
            </div>
            <p class="center-align col s3">${time.nome}</p>
            <p class="center-align col s3">${points}</p>
        </div>
          `
          i++
          points -= 6
        }
    )
    table.innerHTML += 
    `
    <a class="btn-floating btn-large waves-effect waves-light black" href="times.html"><i class="material-icons"><span class="material-symbols-outlined">
    open_in_new
    </span></i></a>
    `
}

function searchUser(){
    users.forEach(usuarios => 
        {
            if(usuario == usuarios.nome){
                timeProfile = usuarios.time
                senha = usuarios.senha
            }
        }
    )
    times.forEach(time => {
        if(time.nome == timeProfile){
            escudo = time.imagem
        }
    })

    return escudo,timeProfile,senha
}

function buildComment(){
    searchUser()
    let commentText = document.getElementById('commentText').value

    if(commentText != ""){
        if(confirm("Ao clicar em Sim está concordando que irá ser responsabilizado por toda fala que for publicada de sua autoria") == true){
            showComment(escudo,usuario,commentText)
            let comment = {
                nome : usuario,
                foto : escudo,
                comentario : commentText
            }
            comentario.push(comment)
            localStorage.setItem('comentario',JSON.stringify(comentario))
        } else{
            alert("É necessário concordar com os termos de uso dos comentários!")
        }
    } else{
        alert("O campo de comentário precisa ser preenchido!")
    }
}

function showComment(foto,nome,comentario){
    let comments = document.getElementById('comments')
    comments.innerHTML += 
        `
        <div class="row">
        <div class="col s4 offset-s2">
        <div class="card grey lighten-2">
            <div class="card-content">
                <img src="${foto}" alt="escudo" class="left circle" style="margin-right: 1em;" width="12%">
                <span class="card-title">${nome}:</span>
                <p>${comentario}</p>
            </div>
        </div>
        </div>
        </div>
    `
}

function getLocalStorageComments(){
    verifyLogon()
    console.log(comentario)
    comentario.forEach(comentario =>
        {
            showComment(comentario.foto,comentario.nome,comentario.comentario)
        }
        )
}