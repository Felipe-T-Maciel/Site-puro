// Verifica se o documento ainda está carregando
if (document.readyState == 'loading') {
    // Se estiver, adiciona um ouvinte para executar a função ready quando o DOM estiver carregado
    document.addEventListener('DOMContentLoaded', ready)
} else {
    // Se não estiver carregando, executa a função ready imediatamente
    ready()
}

// Declara uma variável global para armazenar o valor total
var valorTotal = ''

// Função executada assim que o DOM estiver pronto
function ready() {
    // Seleciona o ícone do carrinho
    const carrinho = document.querySelector(".carrinho");
    // Seleciona a div que contém o carrinho aberto
    const carrinho_aberto = document.querySelector(".carrinho-aberto");

    // Adiciona um evento de clique no ícone do carrinho para abrir/fechar o carrinho
    carrinho.addEventListener("click", function () {
        carrinho_aberto.classList.toggle("aberto");
    });

    // Seleciona o container onde os produtos serão listados no carrinho
    const cartContainer = document.querySelector(".list");
    // Adiciona um evento de clique para remover produtos do carrinho
    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("cart-remover") || event.target.closest(".cart-remover")) {
            removeProducts(event);
        }
    });

    // Pega todos os elementos com a classe "qtd" e adiciona um evento para validar a quantidade
    const quanittyinputs = document.getElementsByClassName("qtd")
    for (var i = 0; i < quanittyinputs.length; i++) {
        quanittyinputs[i].addEventListener("change", chackInputQauntidade)
    }

    // Pega todos os botões "Adicionar ao carrinho" e adiciona um evento de clique
    const buttonAddCart = document.getElementsByClassName("addCart")
    for (var i = 0; i < buttonAddCart.length; i++) {
        buttonAddCart[i].addEventListener("click", addProduct)
    }

    // Seleciona o botão de finalizar compra e adiciona o evento para finalizar
    const purshasebutton = document.querySelector("body > main > div.finish > button")
    purshasebutton.addEventListener("click", makePurchase)
}

// Garante que, ao clicar em "Finalizar compra", o carrinho seja limpo
document.addEventListener('DOMContentLoaded', () => {
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    const carrinhoLista = document.querySelector('.list');

    finalizarCompraBtn.addEventListener('click', () => {
        // Se o carrinho estiver vazio, não faz nada
        if (carrinhoLista.innerHTML.trim() === '') {
            return;
        } else {
            // Se houver produtos, remove todos e reseta o valor total
            carrinhoLista.innerHTML = '';
            const valorTotalElement = document.querySelector(".finish > div > p");
            if (valorTotalElement) {
                valorTotalElement.innerHTML = 'Valor total: R$0.00';
            }
        }
    });
});

// Função para realizar a compra
function makePurchase() {
    // Se não houver valor total, sai da função
    if (valorTotal == "") {
        return;
    } else {
        valorTotal = '';
    }

    // Tenta limpar os produtos do carrinho (há um erro aqui: getElementsByClassName retorna HTMLCollection)
    document.getElementsByClassName(`list`).innerHTML = ""
    atualiza()
}

// Função para remover um produto do carrinho
function removeProducts(event) {
    const button = event.target;
    // Remove o item do DOM
    button.parentElement.parentElement.remove();
    // Atualiza o total
    atualiza();
}

// Função que atualiza o valor total do carrinho
function atualiza() {
    const precos = document.getElementsByClassName("cart-price");
    const qtd = document.getElementsByClassName("qtd-input");
    let valorTotal = 0;

    // Percorre todos os preços e quantidades para calcular o total
    for (let i = 0; i < precos.length; i++) {
        const pegaValor = parseFloat(precos[i].innerText.replace("R$", "").replace(".", "").replace(",", "."));
        const quantidade = parseInt(qtd[i].value);

        if (quantidade > 0) {
            valorTotal += pegaValor * quantidade;
        }
    }

    // Exibe o valor total formatado
    const valorTotalElement = document.querySelector(".finish > div > p");
    if (valorTotalElement) {
        valorTotalElement.innerHTML = `Valor total: R$${valorTotal.toFixed(2).replace(".", ",")}`;
    }
}

// Função que adiciona um produto ao carrinho
function addProduct(event) {
    const button = event.target;
    const productInfo = button.parentElement.parentElement.parentElement;
    const productImage = productInfo.querySelector(".image-Product").src;
    const productName = productInfo.querySelector(".name-product").innerText;
    const productPrice = productInfo.querySelector(".price-product").innerText;

    // Verifica se o produto já está no carrinho para apenas aumentar a quantidade
    const cartItems = document.querySelectorAll(".cart-name");
    for (let item of cartItems) {
        if (item.innerText === productName) {
            const quantityInput = item.parentElement.parentElement.querySelector(".qtd-input");
            quantityInput.value = parseInt(quantityInput.value) + 1;
            atualiza();
            return;
        }
    }

    // Se não estiver, cria um novo item no carrinho
    const cartList = document.querySelector(".list");
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-product");
    cartItem.innerHTML = `
        <div class="cart-image">
            <img src="${productImage}" class="image-cart" alt="" width="100%" height="auto">
        </div>
        <div>
            <p class="cart-name">${productName}</p>
        </div>
        <div>
            <p class="cart-price">${productPrice}</p>
        </div>
        <div>
            <input type="number" class="qtd-input" value="1" min="1">
        </div>
        <div>
            <button class="cart-remover">Remover</button>
        </div>
    `;
    cartList.appendChild(cartItem);

    // Adiciona eventos aos elementos recém-criados
    cartItem.querySelector(".qtd-input").addEventListener("change", chackInputQauntidade);
    cartItem.querySelector(".cart-remover").addEventListener("click", removeProducts);

    atualiza();
}

// Função que impede a quantidade de produtos de ser menor que 1
function chackInputQauntidade(event) {
    const input = event.target;
    if (input.value < 1) {
        input.value = 1;
    }
    atualiza();
}

// Função que exibe um alerta visual na tela por tempo limitado
function showAlert(message, duration = 3000) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50px';
    alertBox.style.left = '10px';
    alertBox.style.backgroundColor = 'rgba(184, 5, 184, 0.8)';
    alertBox.style.color = 'white';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.zIndex = '99999999';
    alertBox.style.fontFamily = 'Arial, sans-serif';
    alertBox.style.fontSize = '14px';
    alertBox.style.boxShadow = '0 4px 6px rgba(230, 7, 241, 0.2)';
    alertBox.style.opacity = '0';
    alertBox.style.transition = 'opacity 0.3s ease';

    // Adiciona o alerta ao corpo do documento
    document.body.appendChild(alertBox);

    // Mostra o alerta após um pequeno delay
    setTimeout(() => {
        alertBox.style.opacity = '1';
    }, 10);

    // Esconde e remove o alerta após o tempo definido
    setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => {
            alertBox.remove();
        }, 300);
    }, duration);
}
