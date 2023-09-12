// Definição de produtos disponíveis na loja
const produtos = [
    {
        id: "1",
        nome: "Informática para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/1.png",
    },
    {
        id: "2",
        nome: "Gestão de conteúdo Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/3.png",  
    }
];

// Função para renderizar todos os produtos na página
function renderizaProdutos(){
    let html = "";
    // Itera sobre a lista de produtos
    for(let i = 0; i < produtos.length; i++){
        // Chama a função criarProduto para gerar a representação HTML de cada produto
        html = html + criarProduto(produtos[i], i);
    }
    // Retorna o HTML completo dos produtos
    return html;
}

// Função para criar a representação HTML de um produto
function criarProduto(produto, index) {
    return `
    <div class = "curso">
    <img class = 'inicio' title="t" src="${produto.imagem}" />
    <div class = "curso-info">
      <h4>${produto.nome}</h4>
      <h4>${produto.prof}</h4>
      <h4>${produto.descricao}</h4>
      </div>
      <div class = "curso-preco">
      <span class="preco-de">R$${produto.preco_de}</span>
      <span class="preco-por">R$${produto.preco_por}</span>
      <!-- Botão "Adicionar ao Carrinho" com um atributo de dados para rastrear o índice do produto -->
      <button class="btncar btn-add" data-index="${index}"></button>
      </div>
      </div>
      `;
}

// Seleciona o elemento HTML com id "container" para exibir os produtos
const container = document.querySelector("#container")

// Define o conteúdo HTML do elemento "container" com a representação dos produtos
container.innerHTML = renderizaProdutos();

// Objeto para rastrear os itens no carrinho de compras
const carrinhoItens = {};

// Função para renderizar os itens do carrinho de compras
function renderizaCarrinho () {
    let html = '';
    // Itera sobre os itens no carrinho
    for (let produtoId in carrinhoItens) {
        // Chama a função criaItemCarrinho para gerar a representação HTML de cada item do carrinho
        html = html + criaItemCarrinho(carrinhoItens[produtoId]);
    }
    // Atualiza o conteúdo do elemento HTML com a classe "carrinho_itens" com a lista de itens do carrinho
    document.querySelector('.carrinho_itens').innerHTML = html;
}

// Função para criar a representação HTML de um item no carrinho de compras
function criaItemCarrinho(produto){
    return  `
    <div class = "carrinho_compra">
    <h4>${produto.nome}</h4>
    <p>Preço unidade: ${produto.preco_por} | Quantidade: ${produto.quantidade}</p>
    <p>Valor: R$: ${produto.preco_por * produto.quantidade}</p>
    <!-- Botão para remover um item do carrinho com um atributo de dados para rastrear o ID do produto -->
    <button data-produto-id="${produto.id}" class="btn-remove"> </button>
    </div>
    `;
}

// Função para calcular o valor total dos itens no carrinho de compras e exibi-lo na página
function criaCarrinhoTotal (){
    let total = 0;
    // Itera sobre os itens no carrinho e calcula o valor total
    for (let produtoId in carrinhoItens) {
        total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade;
    }
    // Atualiza o conteúdo do elemento HTML com a classe "carrinho_total" com o valor total e um link para "Comprar Agora"
    document.querySelector('.carrinho_total').innerHTML = `
    <h4>Total: <strong> R$${total} </strong</h4>
    <a href ="#" target="_blank">
    <ion-icon name="card-outline"></ion-icon>
    <strong>Comprar Agora</strong
    </a>
    `;
}

// Função para adicionar um produto ao carrinho de compras
function adicionaItemNoCarrinho(produto){
    // Verifica se o produto ainda não está no carrinho
    if (!carrinhoItens[produto.id]) {
        // Se não estiver, adiciona o produto ao carrinho
        carrinhoItens[produto.id] = produto;
        // Inicializa a quantidade desse produto como 0
        carrinhoItens[produto.id].quantidade = 0;
    }
    // Incrementa a quantidade desse produto no carrinho
    ++carrinhoItens[produto.id].quantidade;
    // Após adicionar o item ao carrinho, atualiza a exibição do carrinho e o valor total
    renderizaCarrinho();
    criaCarrinhoTotal();
}

// Adiciona um evento de clique ao corpo (document.body) da página
document.body.addEventListener('click' , function (event){
    // Obtém o elemento que foi clicado
    const elemento = event.target;
    
    // Verifica se o elemento clicado tem a classe 'btn-add' (Botão "Adicionar ao Carrinho")
    if(elemento.classList.contains('btn-add')) {
        // Obtém o índice do produto associado a esse botão
        const index = parseInt(elemento.getAttribute('data-index'), 10);
        // Obtém o produto com base no índice
        const produto = produtos[index];
        
        // Chama a função para adicionar esse produto ao carrinho
        adicionaItemNoCarrinho(produto);
    }

    // Verifica se o elemento clicado tem a classe 'btn-remove' (Botão "Remover")
    if (elemento.classList.contains('btn-remove')) {
        // Obtém o ID do produto associado a esse botão
        const produtoId = elemento.getAttribute('data-produto-id');
        
        // Verifica se a quantidade do produto no carrinho é menor ou igual a 1
        if(carrinhoItens[produtoId].quantidade <= 1) {
            // Se for, remove o produto do carrinho
            delete carrinhoItens[produtoId];
        } else {
            // Caso contrário, diminui a quantidade em 1
            --carrinhoItens[produtoId].quantidade;
        }
        
        // Após a remoção ou diminuição da quantidade, atualiza a exibição do carrinho e o valor total
        renderizaCarrinho();
        criaCarrinhoTotal();
    }
});