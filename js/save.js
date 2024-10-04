let registroEmailTutor = JSON.parse(localStorage.getItem('registroEmailTutor')) || ['EmailAdmin'];
let registroSenhaTutor = JSON.parse(localStorage.getItem('registroSenhaTutor')) || ['SenhaAdmin'];
let posicaoSenha = 0;
let posicaoEmail = 0;
console.log(registroEmailTutor)
console.log(registroSenhaTutor)

// Função que verifica se as senhas coincidem no cadastro
function verificaSenha() {
    let senhaTutor = document.getElementById("senhaTutor").value;
    let conSenhaTutor = document.getElementById("conSenhaTutor").value;

    if (senhaTutor == conSenhaTutor && senhaTutor != "" && conSenhaTutor != "") {
        registroSenhaTutor.push(senhaTutor);
        
        // Salva o array atualizado no localStorage
        localStorage.setItem('registroSenhaTutor', JSON.stringify(registroSenhaTutor));

        console.log(registroSenhaTutor);
        return true;
    } else {
        document.getElementById("senhaTutor").value = "";
        document.getElementById("conSenhaTutor").value = "";
        alert("Senha não condiz ou estão vazias");
        return false;
    }
}

// Função que obtém a posição do email no array
function posicaoEmailD() {
    let emailDigitado = document.getElementById("emailInsirido").value;
    if (registroEmailTutor.includes(emailDigitado)) {
        posicaoEmail = registroEmailTutor.indexOf(emailDigitado);
        console.log(posicaoEmail);
        return posicaoEmail;
    } else {
        document.getElementById("emailInsirido").value = "";
        alert("Email não está no sistema");
    }
}

// Função que obtém a posição da senha no array
function posicaoSenhaD() {
    let senhaDigitada = document.getElementById("senhaInsirida").value;
    if (registroSenhaTutor.includes(senhaDigitada)) {
        posicaoSenha = registroSenhaTutor.indexOf(senhaDigitada);
        console.log(posicaoSenha);
        return posicaoEmail;
    } else {
        document.getElementById("senhaInsirida").value = "";
        alert("Senha não encontrada no sistema");
    }
}

// Função que armazena o email e senha no array e no localStorage
function registroLoginTutor() {
    if (!verificaSenha()) {
        return false;
    }

    let emailTutor = document.getElementById("emailTutor").value;
    registroEmailTutor.push(emailTutor);

    // Salva o array atualizado no localStorage
    localStorage.setItem('registroEmailTutor', JSON.stringify(registroEmailTutor));

    console.log(registroEmailTutor);
    alert("Cadastro salvo com sucesso (lembrar de direcionar a outra página)");
    return false;
}

// Função que realiza o login
function loginTutor() {
    posicaoEmailD();
    posicaoSenhaD();
    if (posicaoEmail == 0 && posicaoSenha == 0){
        window.location.href = "temp/prof.html";
    }
    else if (posicaoEmail == posicaoSenha) {
            window.location.href = "home.html"; 
            alert("Bem-vindo/a");
            console.log("Redirecionando para home.html");
                       
    } else {
        alert("Email/Senhas errados");
    }
}


// Função para carregar os dados do localStorage ao carregar a página de login
function carregarDados() {
    let emails = localStorage.getItem('registroEmailTutor');
    let senhas = localStorage.getItem('registroSenhaTutor');

    if (emails && senhas) {
        registroEmailTutor = JSON.parse(emails);
        registroSenhaTutor = JSON.parse(senhas);
    } else {
        console.log("Nenhum dado encontrado.");
    }
}

// Carrega os dados ao iniciar a página de login
window.onload = carregarDados;
