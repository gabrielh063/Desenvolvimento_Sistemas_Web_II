const modalCadastro = new bootstrap.Modal(document.getElementById('modalCadastro'));

function novo() {
    idCidadeAtual = 0;                                                                                                                                                         
    document.getElementById("nomeCidade").value = "";
    document.getElementById("uf").value = "";
    document.getElementById("populacao").value = "";
    document.getElementById("anoFundacao").value = "";
    modalCadastro.show()
}

function salvar(){
    let nomeCidade = document.getElementById("nomeCidade").value;
    let uf = document.getElementById("uf").value;
    let populacao = document.getElementById("populacao").value;
    let anoFundacao = document.getElementById("anoFundacao").value;
    let cidade = {
        nomeCidade: nomeCidade, uf: uf, populacao: populacao, anoFundacao: anoFundacao
    }
    let url;
    let metodo;
    if (idCidadeAtual > 0){
        url = "http://127.0.0.1:3333/cidade/"+idCidadeAtual;
        metodo = "PUT";
    } else { 
        url = "http://127.0.0.1:3333/cidade";
        metodo = "POST";
    }
    fetch(url, {method: metodo, body: JSON.stringify(cidade), headers: {"Content-Type" : "application/json"}}).then(function (){ listar(); modalCadastro.hide()})
}

function listar(){
    const lista = document.getElementById("lista");
    lista.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";
    
    fetch("http://127.0.0.1:3333/cidade").then(resp => resp.json()).then(dados => mostrar(dados));
}
function mostrar(dados){
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let i in dados){
        lista.innerHTML += "<tr>" 
        + "<td>" + dados[i].idCidade +"</td>" 
        + "<td>" + dados[i].nomeCidade +"</td>" 
        + "<td>" + dados[i].uf +"</td>" 
        + "<td>" + dados[i].populacao +"</td>" 
        + "<td>" + dados[i].anoFundacao +"</td>" 
        + "<td>"
        + "<button type='button' class='btn btn-primary' onclick='alterar("+dados[i].idCidade+")'>Alterar</button>" 
        + "<button type='button' class='btn btn-danger' onclick='excluir("+dados[i].idCidade+")'>Excluir</button>"
        + "</td>" 
        + "</tr>";
    }
}

var idCidadeAtual;

function alterar(idCidade){
    idCidadeAtual = idCidade;
    fetch("http://127.0.0.1:3333/cidade/"+idCidade).then(resp => resp.json()).then(dados =>{
        document.getElementById("nomeCidade").value = dados.nomeCidade;
        document.getElementById("uf").value = dados.uf;
        document.getElementById("populacao").value = dados.populacao;
        document.getElementById("anoFundacao").value = dados.anoFundacao;
        modalCadastro.show()
    });
}

function excluir(idCidade){
    fetch("http://127.0.0.1:3333/cidade/"+idCidade, {method: "DELETE"}).then(function (){listar();});

}