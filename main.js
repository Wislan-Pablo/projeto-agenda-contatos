const formulario = document.getElementById('form-contato');
const btnSubmit = document.getElementById('submit');
// Cria nova linha
let novaLinha = document.createElement('tr');
// contador para o campo ID
let id = 0;
let linhaEditando = null;

formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // desabilita o comportamento de recarregar a página

    // obtem a entrada com valor dos campos de nome e telefone
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (!nome || !telefone) return;

    // Atualizar linha já existente
    if (linhaEditando) {
        // função children remove os espaços em branco das laterais do texto, se houver
        linhaEditando.children[1].textContent = nome;
        linhaEditando.children[2].textContent = telefone;

        linhaEditando = null;
        formulario.reset();
        document.getElementById('nome').focus();

        exibeMensagemDaAcao(); // mostra a msg de sucesso quando o formulário é resetado

        // troca o texto do botão submit quando estiver alterando os dados
        btnSubmit.innerHTML = 'Cadastrar novo contato';

        return;
    }

    id++ // incrementa o ID 

    const novaLinha = document.createElement('tr'); // cria o elemento <tr> na tabela

    // insere uma nova linha de cadastro na tabela
    novaLinha.innerHTML = `
    <td>${id}</td>
    <td>${nome}</td>
    <td>${telefone}</td>
    <td><button class="btn-alterar">Alterar</button></td>
    <td><button class="btn-excluir">Excluir</button></td>
`;

    let tabela = document.getElementById('lista-contatos');
    tabela.appendChild(novaLinha); // adicona a linha <tr> com as <td> na tabela 

    exibeMensagemDaAcao(); // mostra a mensagem de sucesso quando cadastra 
    // ----------------------------------------------------------

    // Eventos dos botões
    const btnAlterar = novaLinha.querySelector('.btn-alterar');
    const btnExcluir = novaLinha.querySelector('.btn-excluir');

    // Esta função mostra uma mensagem de sucesso para a Ação Alterar e Excluir acima da tabela
    function exibeMensagemDaAcao() {
        const divRetornoMensagem = document.querySelector('#retorno-mensagem');
        if (divRetornoMensagem) {
            divRetornoMensagem.classList.add('msg-return-success-action');
            divRetornoMensagem.innerHTML = '<span>Ação concluída com sucesso!</span>';
        }

        //Adiciona um timer de 3s para a mensagem de sucesso desaparecer
        setTimeout(() => {
            divRetornoMensagem.classList.remove('msg-return-success-action');
            divRetornoMensagem.innerHTML = '';
        }, 5000);
    }

    btnAlterar.addEventListener('click', function () {
        // Coloca os dados da linha no formulário
        document.getElementById('nome').value = novaLinha.children[1].textContent;
        document.getElementById('telefone').value = novaLinha.children[2].textContent;

        // Define a linha que está sendo editada
        linhaEditando = novaLinha;
        document.getElementById('nome').focus();

        //muda o texto do botão quando o usuário clica no botão Alterar
        btnSubmit.innerHTML = 'Salvar Alterações';
    })

    // Função que Exclui a linha pelo seu ID
    btnExcluir.addEventListener('click', function () {
        // dispara um popup um alert para confirmação do usuário 
        const resposta = confirm("Deseja realmente excluir este contato?");

        // verifica a resposta de confirmação e executa ou não a remoção
        if (resposta) {
            novaLinha.remove(); // remove a linha
            if (linhaEditando === novaLinha) {
                linhaEditando = null;
                formulario.reset();
            }
            exibeMensagemDaAcao(); // mostra a msg de sucesso quando clica em Excluir
        }
    });

    // reseta os campos do formulário e coloca o nome em foco
    formulario.reset();
    document.getElementById('nome').focus();
});