// Inicialização de uma lista vazia para armazenar as tarefas
let listaTarefa = [];

// Seleção de elementos pelo ID e atribuição às variáveis
const descricaoInput = document.querySelector('#descricao');
const autorInput = document.querySelector('#autor');
const departamentoInput = document.querySelector('#departamento');
const importanciaInput = document.querySelector('#importancia');
const valorInput = document.querySelector('#valor');
const duracaoInput = document.querySelector('#duracao');
const adicionarButton = document.querySelector('#adicionar');
const tabelaBody = document.querySelector('#tabela tbody');
const tabelaFiltradaBody = document.querySelector('#tabelaFiltrada tbody');
const container = document.querySelector('.container');
const filtrarButton = document.querySelector('#filtrar');



// Evento de clique no botão "Adicionar"
adicionarButton.addEventListener('click', function () {
     // Criação de um objeto 'tarefa' com base nos valores dos campos de entrada
    const tarefa = {
        descricao: descricaoInput.value,
        autor: autorInput.value,
        departamento: departamentoInput.value,
        importancia: parseInt(importanciaInput.value),
         // Verifica se o campo de entrada para o valor da tarefa não está vazio
        // Se não estiver vazio:
        //Converte o valor inserido 
        // Caso contrário:
        //Atribui null à propriedade "valor" da tarefa
        valor: valorInput.value !== '' ? parseFloat(valorInput.value) : null,
        duracao: duracaoInput.value !== '' ? parseInt(duracaoInput.value) : null
    
    };

    // Adição da tarefa à lista
    listaTarefa.push(tarefa);
     // Atualização da tabela principal e limpeza dos campos de entrada
    atualizarTabela();
    limparInputs();

});


// Função para atualizar a tabela principal
function atualizarTabela() {
    // Limpa o conteúdo da tabela
    tabelaBody.innerHTML = '';
     // Itera sobre cada tarefa na lista e cria as linhas da tabela
    listaTarefa.forEach((tarefa, i) => {
        // Criação de elementos para cada célula da linha
        const row = document.createElement('tr');
        const descricaoTarefa = document.createElement('td');
        const autorTarefa = document.createElement('td');
        const departamentoTarefa = document.createElement('td');
        const importanciaTarefa = document.createElement('td');
        const valorTarefa = document.createElement('td');
        const duracaoTarefa = document.createElement('td');
        const excluirTarefa = document.createElement('td');
        const excluirButton = document.createElement('button');

        // Preenchimento dos elementos com os dados da tarefa
        descricaoTarefa.textContent = tarefa.descricao;
        autorTarefa.textContent = tarefa.autor;
        departamentoTarefa.textContent = tarefa.departamento;
        importanciaTarefa.textContent = tarefa.importancia;
        // Verifica se o valor da tarefa não é nulo
        // Se não for nulo:
        //   Atribui o valor da tarefa à célula da tabela
        // Caso contrário:
        //   Exibe um traço "-" na célula para indicar ausência de valor
        valorTarefa.textContent = tarefa.valor !== null ? tarefa.valor : '-';
        duracaoTarefa.textContent = tarefa.duracao !== null ? tarefa.duracao : '-';
        
        // Configuração do botão "Excluir" para remover a tarefa correspondente
        excluirButton.textContent = 'Excluir';
        excluirButton.addEventListener('click', function () {
            apagar(i);
        });
        excluirTarefa.appendChild(excluirButton);

        // Adição dos elementos à linha e da linha à tabela
        row.appendChild(descricaoTarefa);
        row.appendChild(autorTarefa);
        row.appendChild(departamentoTarefa);
        row.appendChild(importanciaTarefa);
        row.appendChild(valorTarefa);
        row.appendChild(duracaoTarefa);
        row.appendChild(excluirTarefa);

        tabelaBody.appendChild(row);
    });
}

// Função para remover uma tarefa da lista
function apagar(i) {
    listaTarefa.splice(i, 1);
    atualizarTabela();
    ordenarSegundaTabelaPorImportancia(); 
}

// Função para limpar os campos de entrada
function limparInputs() {
    descricaoInput.value = '';
    autorInput.value = '';
    departamentoInput.value = '';
    importanciaInput.value = '';
    valorInput.value = '';
    duracaoInput.value = '';
}


// Função para ordenar e exibir a tabela filtrada por importância
function ordenarSegundaTabelaPorImportancia() {
    // Criação de uma cópia da lista de tarefas para ordenação
    const listaOrdenada = [...listaTarefa];
    // Ordena a cópia da lista com base na propriedade "importancia" em ordem decrescente
    listaOrdenada.sort((a, b) => b.importancia - a.importancia);
    tabelaFiltradaBody.innerHTML = '';
    // Itera sobre cada tarefa na lista ordenada e cria as linhas da tabela filtrada
    listaOrdenada.forEach(tarefa => {
        const row = document.createElement('tr');
        const descricaoTarefa = document.createElement('td');
        descricaoTarefa.textContent = tarefa.descricao;
        const importanciaTarefa = document.createElement('td');
        importanciaTarefa.textContent = tarefa.importancia;
        row.appendChild(descricaoTarefa);
        row.appendChild(importanciaTarefa);
        tabelaFiltradaBody.appendChild(row);
    });
}

// Evento de clique no botão "Filtrar"
filtrarButton.addEventListener('click', function () {
    ordenarSegundaTabelaPorImportancia();
});



       

