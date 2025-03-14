const modalCadastro = new bootstrap.Modal(document.getElementById('modalCadastro'));

function novo() {
    idUsuarioAtual = 0;                                                                                                                                                         
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    modalCadastro.show()
}

function salvar(){
    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let usuario = {
        nome: nome, telefone: telefone, email: email
    }
    let url;
    let metodo;
    if (idUsuarioAtual > 0){
        // alterar
        url = "http://127.0.0.1:3333/usuario/"+idUsuarioAtual;
        metodo = "PUT";
    } else {
        //  insere 
        url = "http://127.0.0.1:3333/usuario";
        metodo = "POST";
    }
    fetch(url, {method: metodo, body: JSON.stringify(usuario), headers: {"Content-Type" : "application/json"}}).then(function (){ listar(); modalCadastro.hide()})
}

function listar(){
    const lista = document.getElementById("lista");
    lista.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";
    
    fetch("http://127.0.0.1:3333/usuario").then(resp => resp.json()).then(dados => mostrar(dados));
}
function mostrar(dados){
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let i in dados){
        lista.innerHTML += "<tr>" 
        + "<td>" + dados[i].idusuario +"</td>" 
        + "<td>" + dados[i].nome +"</td>" 
        + "<td>" + dados[i].telefone +"</td>" 
        + "<td>" + dados[i].email +"</td>" 
        + "<td>"
        + "<button type='button' class='btn btn-primary' onclick='alterar("+dados[i].idusuario+")'>Alterar</button>" 
        + "<button type='button' class='btn btn-danger' onclick='excluir("+dados[i].idusuario+")'>Excluir</button>"
        + "</td>" 
        + "</tr>";
    }
}

var idUsuarioAtual;

function alterar(idUsuario){
    idUsuarioAtual = idUsuario;
    fetch("http://127.0.0.1:3333/usuario/"+idUsuario).then(resp => resp.json()).then(dados =>{
        document.getElementById("nome").value = dados.nome;
        document.getElementById("telefone").value = dados.telefone;
        document.getElementById("email").value = dados.email;
        modalCadastro.show()
    });
}

function excluir(idUsuario){
    fetch("http://127.0.0.1:3333/usuario/"+idUsuario, {method: "DELETE"}).then(function (){listar();});

}