class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    // Verifica se as senhas coincidem
    verificaSenha(confirmacaoSenha) {
        return this.senha === confirmacaoSenha;
    }

    // Registra o usuário no localStorage
    registrar(tipoUsuario) {
        let registroEmail = JSON.parse(localStorage.getItem(`registroEmail${tipoUsuario}`)) || [];
        let registroSenha = JSON.parse(localStorage.getItem(`registroSenha${tipoUsuario}`)) || [];
        let registroNome = JSON.parse(localStorage.getItem(`registroNome${tipoUsuario}`)) || [];

        if (registroEmail.includes(this.email)) {
            alert(`${tipoUsuario} já está cadastrado`);
            return false;
        }

        registroEmail.push(this.email);
        registroSenha.push(this.senha);
        registroNome.push(this.nome);

        localStorage.setItem(`registroEmail${tipoUsuario}`, JSON.stringify(registroEmail));
        localStorage.setItem(`registroSenha${tipoUsuario}`, JSON.stringify(registroSenha));
        localStorage.setItem(`registroNome${tipoUsuario}`, JSON.stringify(registroNome));

        if (tipoUsuario === 'Cuidador') {
            alert('Sua conta foi mandada para análise.');
        } else if (tipoUsuario === 'Tutor') {
            alert(`${tipoUsuario} cadastrado com sucesso!`);
        }
    }

    // Método de login
    // Método de login
    login(tipoUsuario) {
        let registroEmail = JSON.parse(localStorage.getItem(`registroEmail${tipoUsuario}`)) || [];
        let registroSenha = JSON.parse(localStorage.getItem(`registroSenha${tipoUsuario}`)) || [];

        // Verifica se o email e a senha existem e estão na mesma posição
        let posicaoEmail = registroEmail.indexOf(this.email);
        let posicaoSenha = registroSenha.indexOf(this.senha);

        if (posicaoEmail !== -1 && posicaoEmail === posicaoSenha) {
            // Armazena o email do usuário logado para ser utilizado depois
            localStorage.setItem('usuarioLogadoEmail', this.email);
            
            alert(`Login realizado com sucesso! Bem-vindo ${tipoUsuario}`);
            window.location.href = tipoUsuario === 'Tutor' ? 'home.html' : 'homeCuidador.html';
            return true;
        } else {
            alert("Email ou senha incorretos");
            return false;
        }
    }

}

// -------------------FIM DE PESSOA-----------------------------

// Função de cadastro para tutor
function registrarTutor() {
    let nomeTutor = document.getElementById("nomeTutor").value;
    let emailTutor = document.getElementById("emailTutor").value;
    let senhaTutor = document.getElementById("senhaTutor").value;
    let conSenhaTutor = document.getElementById("conSenhaTutor").value;

    let tutor = new Usuario(nomeTutor, emailTutor, senhaTutor);
    if (tutor.verificaSenha(conSenhaTutor)) {
        tutor.registrar('Tutor');
    } else {
        alert('As senhas não coincidem!');
    }
}

// Função de cadastro para cuidador
function registrarCuidador() {
    let nomeCuidador = document.getElementById("nomeCuidador").value;
    let emailCuidador = document.getElementById("emailCuidador").value;
    let senhaCuidador = document.getElementById("senhaCuidador").value;
    let conSenhaCuidador = document.getElementById("conSenhaCuidador").value;
    let imagemInput = document.getElementById("imagemCuidador").files[0]; // Obtém o arquivo da imagem

    let cuidador = new Usuario(nomeCuidador, emailCuidador, senhaCuidador);

    if (cuidador.verificaSenha(conSenhaCuidador)) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let imagemBase64 = e.target.result;
            localStorage.setItem(`registroImagemCuidador_${emailCuidador}`, imagemBase64); // Salva a imagem associada ao email
            cuidador.registrar('Cuidador');
        };
        reader.readAsDataURL(imagemInput); // Converte a imagem em base64
    } else {
        alert('As senhas não coincidem!');
    }
}



// Função de login para tutor
function loginTutor() {
    let emailTutor = document.getElementById("emailInsirido").value;
    let senhaTutor = document.getElementById("senhaInsirida").value;

    let tutor = new Usuario(null, emailTutor, senhaTutor);
    tutor.login('Tutor');
}

// Função de login para cuidador
function loginCuidador() {
    let emailCuidador = document.getElementById("emailCuidadorInsirido").value;
    let senhaCuidador = document.getElementById("senhaCuidadorInsirida").value;

    let cuidador = new Usuario(null, emailCuidador, senhaCuidador);
    cuidador.login('Cuidador');
}

function mostrarLoginsESenhas() {
    let registroEmailTutor = JSON.parse(localStorage.getItem('registroEmailTutor')) || [];
    let registroSenhaTutor = JSON.parse(localStorage.getItem('registroSenhaTutor')) || [];

    let registroEmailCuidador = JSON.parse(localStorage.getItem('registroEmailCuidador')) || [];
    let registroSenhaCuidador = JSON.parse(localStorage.getItem('registroSenhaCuidador')) || [];

    console.log("Logins e Senhas de Tutores:");
    registroEmailTutor.forEach((email, index) => {
        console.log(`Email: ${email}, Senha: ${registroSenhaTutor[index]}`);
    });

    console.log("Logins e Senhas de Cuidadores:");
    registroEmailCuidador.forEach((email, index) => {
        console.log(`Email: ${email}, Senha: ${registroSenhaCuidador[index]}`);
    });
}

function logout() {
    localStorage.removeItem('usuarioLogadoEmail');
    window.location.href = 'index.html'; // Redireciona para a página de login
}


// ---------------------- Funções do site do cuidador -------------------
//PURO GPT - NÃO


function exibirDadosUsuario(idNome, idEmail, idImagem) {
    let emailLogado = localStorage.getItem('usuarioLogadoEmail');

    if (emailLogado) {
        let nomeLogado = JSON.parse(localStorage.getItem('registroNomeCuidador')) || [];
        let registroEmail = JSON.parse(localStorage.getItem('registroEmailCuidador')) || [];
        let posicaoEmail = registroEmail.indexOf(emailLogado);
        let nomeUsuario = nomeLogado[posicaoEmail];
        
        // Carregar a imagem associada ao email do cuidador
        let imagemBase64 = localStorage.getItem(`registroImagemCuidador_${emailLogado}`);

        if (nomeUsuario && imagemBase64) {
            // Atualizar os campos fornecidos
            if (idNome) {
                document.getElementById(idNome).textContent = nomeUsuario;
            }
            if (idEmail) {
                document.getElementById(idEmail).textContent = emailLogado;
            }
            if (idImagem) {
                document.getElementById(idImagem).src = imagemBase64;
            }
        }
    } else {
        console.error("Nenhum usuário logado encontrado!");
    }
}

function exibirCuidadores() {
    let registroNomeCuidador = JSON.parse(localStorage.getItem('registroNomeCuidador')) || [];
    let registroEmailCuidador = JSON.parse(localStorage.getItem('registroEmailCuidador')) || [];
    let containerCuidadores = document.getElementById("listaCuidadores");

    // Limpa o conteúdo do container antes de exibir os cuidadores
    containerCuidadores.innerHTML = '';

    // Verificar se existem cuidadores registrados
    if (registroNomeCuidador.length === 0 || registroEmailCuidador.length === 0) {
        containerCuidadores.innerHTML = '<p>Nenhum cuidador registrado</p>';
        return;
    }

    // Informações genéricas
    const descricaoGenerica = "Cuidador experiente, oferecendo cuidado de qualidade para seu pet.";
    const distanciaGenerica = "5 km de distância";
    const servicosOferecidos = ["PetSitting", "Passeio", "Banho"];

    // Exibe os cuidadores
    registroEmailCuidador.forEach((email, index) => {
        let nome = registroNomeCuidador[index];
        let imagemBase64 = localStorage.getItem(`registroImagemCuidador_${email}`);

        // Criar o HTML para cada cuidador (imagem, nome, descrição, distância e serviços)
        let cuidadorDiv = document.createElement('div');
        cuidadorDiv.className = 'cuidador';

        // Adicionar imagem
        let img = document.createElement('img');
        img.src = imagemBase64 ? imagemBase64 : 'default-profile-image.png'; // Caso a imagem não exista
        img.alt = `Imagem de ${nome}`;
        img.className = 'imagem-cuidador'; // Classe para estilizar a imagem

        // Adicionar nome
        let nomeCuidador = document.createElement('p');
        nomeCuidador.textContent = nome;
        nomeCuidador.className = 'nome-cuidador'; // Classe para estilizar o nome

        // Adicionar descrição genérica
        let descricaoCuidador = document.createElement('p');
        descricaoCuidador.textContent = descricaoGenerica;
        descricaoCuidador.className = 'descricao-cuidador';

        // Adicionar distância genérica
        let distanciaCuidador = document.createElement('p');
        distanciaCuidador.textContent = distanciaGenerica;
        distanciaCuidador.className = 'distancia-cuidador';

        // Adicionar serviços oferecidos
        let servicosCuidador = document.createElement('p');
        servicosCuidador.textContent = `Serviços: ${servicosOferecidos.join(', ')}`;
        servicosCuidador.className = 'servicos-cuidador';

        // Inserir tudo no container do cuidador
        cuidadorDiv.appendChild(img);
        cuidadorDiv.appendChild(nomeCuidador);
        cuidadorDiv.appendChild(descricaoCuidador);
        cuidadorDiv.appendChild(distanciaCuidador);
        cuidadorDiv.appendChild(servicosCuidador);

        // Inserir o cuidador na lista
        containerCuidadores.appendChild(cuidadorDiv);
    });
}

// Chamar essa função ao carregar a página de tutores
window.onload = function() {
    exibirCuidadores();
};


//Teste

exibirDadosUsuario('nomeUsuario', 'emailUsuario', 'imagemPerfilDashboard');
exibirDadosUsuario('NomePerfilMini', null, 'imagemPerfilMini'); 

// Chamar essa função quando necessário, por exemplo, ao carregar a página de administração
mostrarLoginsESenhas();
