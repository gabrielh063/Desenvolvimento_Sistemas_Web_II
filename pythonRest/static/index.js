function entrar(){
    let login = document.getElementById("email");
    let senha = document.getElementById("senha")
    
    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, senha: senha}).then(res => {
            if (!res.ok) {
                alert("login invalido");
                return null;
            } else{
                return res.json();       
            }
            })
            .then(dados =>{
                if (dados != null){
                    sessionStorage.setItem("token", dados.token);
                    window.location.href = "usuario.html";
                }
        })
    })
}