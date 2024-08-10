document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");
    const mensagemDiv = document.getElementById("mensagem");
    const visualizarBtn = document.getElementById("visualizar-btn");
    const editarBtn = document.getElementById("editar-btn");
    const excluirBtn = document.getElementById("excluir-btn");

    let usuarios = [];

    // Função para validar o CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CPF
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) { // Verifica se o CPF tem 11 dígitos e se não possui todos os dígitos iguais
            return false;  // Retorna falso se o CPF for inválido
        }
        let soma = 0;  // Variável para somar os dígitos do CPF
        let resto;  // Variável para armazenar o resto da divisão

        // Calcula o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) resto = 0; // Se o resto for 10 ou 11, ajusta para 0
        if (resto !== parseInt(cpf.substring(9, 10))) return false; // Verifica se o primeiro dígito verificador é válido

        soma = 0;  // Reinicia a soma para o segundo dígito verificador
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) resto = 0; // Ajusta para 0 se o resto for 10 ou 11
        if (resto !== parseInt(cpf.substring(10, 11))) return false; // Verifica se o segundo dígito verificador é válido

        return true;  // Retorna verdadeiro se o CPF for válido
    }

    // Função para validar o formato do email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para verificar o formato do email
        return re.test(email); // Retorna verdadeiro se o email estiver no formato correto
    }

    // Função para mostrar mensagens na interface
    function mostrarMensagem(mensagem, tipo = 'info') {
        mensagemDiv.textContent = mensagem;
        mensagemDiv.className = `mensagem ${tipo}`;
    }

    // Função para cadastrar um novo usuário
    function cadastrarUsuario(event) {
        event.preventDefault();

        const nome = form.nome.value.trim();
        const idade = parseInt(form.idade.value);
        const cpf = form.cpf.value.trim();
        const email = form.email.value.trim();

        if (!validarCPF(cpf)) {
            mostrarMensagem("CPF inválido. Tente novamente.", 'erro');
            return;
        }

        if (!validarEmail(email)) {
            mostrarMensagem("Email inválido. Tente novamente.", 'erro');
            return;
        }

        usuarios.push({ nome, idade, cpf, email });
        mostrarMensagem("Usuário cadastrado com sucesso!", 'sucesso');
        form.reset();
    }

    // Função para visualizar os usuários cadastrados
    function visualizarUsuarios() {
        if (usuarios.length === 0) {
            mostrarMensagem("Ainda não existem usuários cadastrados", 'info');
            return;
        }

        let usuariosList = usuarios.map((usuario, index) => `
            Usuário ${index + 1}:
            Nome: ${usuario.nome}
            Idade: ${usuario.idade}
            CPF: ${usuario.cpf}
            Email: ${usuario.email}
            ---
        `).join("\n");

        mostrarMensagem(`Usuários cadastrados:\n${usuariosList}`, 'info');
    }

    // Função para editar um usuário
    function editarUsuario() {
        if (usuarios.length === 0) {
            mostrarMensagem("Ainda não existem usuários cadastrados", 'info');
            return;
        }

        visualizarUsuarios(); // Mostra a lista de usuários para seleção

        const indice = parseInt(prompt("Digite o número do usuário: ")) - 1;

        if (indice < 0 || indice >= usuarios.length) {
            mostrarMensagem("Índice inválido.", 'erro');
            return;
        }

        const usuario = usuarios[indice];
        const novoNome = prompt(`Novo nome (atual: ${usuario.nome}): `) || usuario.nome;
        const novaIdade = parseInt(prompt(`Nova idade (atual: ${usuario.idade}): `)) || usuario.idade;
        const novoCPF = prompt(`Novo CPF (atual: ${usuario.cpf}): `) || usuario.cpf;
        const novoEmail = prompt(`Novo email (atual: ${usuario.email}): `) || usuario.email;

        if (!validarCPF(novoCPF)) {
            mostrarMensagem("CPF inválido. Tente novamente.", 'erro');
            return;
        }

        if (!validarEmail(novoEmail)) {
            mostrarMensagem("Email inválido. Tente novamente.", 'erro');
            return;
        }

        usuarios[indice] = { nome: novoNome, idade: novaIdade, cpf: novoCPF, email: novoEmail };
        mostrarMensagem("Usuário atualizado com sucesso!", 'sucesso');
    }

    // Função para excluir um usuário
    function excluirUsuario() {
        if (usuarios.length === 0) {
            mostrarMensagem("Ainda não existem usuários cadastrados", 'info');
            return;
        }

        visualizarUsuarios(); // Mostra a lista de usuários para seleção

        const indice = parseInt(prompt("Digite o número do usuário que deseja excluir: ")) - 1;

        if (indice < 0 || indice >= usuarios.length) {
            mostrarMensagem("Índice inválido.", 'erro');
            return;
        }

        usuarios.splice(indice, 1);
        mostrarMensagem("Usuário excluído com sucesso!", 'sucesso');
    }

    // Adiciona os eventos aos botões
    form.addEventListener("submit", cadastrarUsuario);
    visualizarBtn.addEventListener("click", visualizarUsuarios);
    editarBtn.addEventListener("click", editarUsuario);
    excluirBtn.addEventListener("click", excluirUsuario);
});
