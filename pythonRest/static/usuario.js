const modalCadastro = new bootstrap.Modal(document.getElementById('modalCadastro'));

function novo() {
    idUsuarioAtual = 0;                                                                                                                                                         
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    modalCadastro.show()
}

function salvar(){
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    let usuario = {
        nome: nome, telefone: telefone, email: email, senha: ""
    }
    let url;
    let metodo;
    if (idUsuarioAtual > 0){
        // alterar
        url = "http://127.0.0.1:5000/usuario/"+idUsuarioAtual;
        metodo = "PUT";
    } else {
        //  insere 
        url = "http://127.0.0.1:5000/usuario";
        metodo = "POST";
    }
    fetch(url, {method: metodo, body: JSON.stringify(usuario), headers: {"Content-Type" : "application/json"}}).then(function (){ listar(); modalCadastro.hide()})
}

function listar(){
    const lista = document.getElementById("lista");
    lista.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";
    
    fetch("http://127.0.0.1:5000/usuario"),{headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}}, then(resp => resp.json()).then(dados => mostrar(dados));
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
    fetch("http://127.0.0.1:5000/usuario/"+idUsuario).then(resp => resp.json()).then(dados =>{
        document.getElementById("nome").value = dados.nome;
        document.getElementById("telefone").value = dados.telefone;
        document.getElementById("email").value = dados.email;
        modalCadastro.show()
    });
}

function excluir(idUsuario){
    fetch("http://127.0.0.1:5000/usuario/"+idUsuario, {method: "DELETE"}).then(function (){listar();});

}