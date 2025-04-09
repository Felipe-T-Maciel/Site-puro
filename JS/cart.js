if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var valorTotal = ''

function ready() {
    const carrinho = document.querySelector(".carrinho");
    const carrinho_aberto = document.querySelector(".carrinho-aberto");

    carrinho.addEventListener("click", function () {
        carrinho_aberto.classList.toggle("aberto");
    });

    const cartContainer = document.querySelector(".list");
    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("cart-remover") || event.target.closest(".cart-remover")) {
            removeProducts(event);
        }
    });

    const quanittyinputs = document.getElementsByClassName("qtd")
    for (var i = 0; i < quanittyinputs.length; i++) {
        quanittyinputs[i].addEventListener("change", chackInputQauntidade)
    }

    const buttonAddCart = document.getElementsByClassName("addCart")
    for (var i = 0; i < buttonAddCart.length; i++) {
        buttonAddCart[i].addEventListener("click", addProduct)
    }

    const purshasebutton = document.querySelector("body > main > div.finish > button")
    purshasebutton.addEventListener("click", makePurchase)
}

document.addEventListener('DOMContentLoaded', () => {
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    const carrinhoLista = document.querySelector('.list');

    finalizarCompraBtn.addEventListener('click', () => {
        if (carrinhoLista.innerHTML.trim() === '') {
            return;
        } else {
            carrinhoLista.innerHTML = '';
            const valorTotalElement = document.querySelector(".finish > div > p");
            if (valorTotalElement) {
                valorTotalElement.innerHTML = 'Valor total: R$0.00';
            }
        }
    });
});

function makePurchase() {
    if (valorTotal == "") {
        return;
    } else {
        valorTotal = '';
    }

    document.getElementsByClassName(`list`).innerHTML = ""
    atualiza()
}

function removeProducts(event) {
    const button = event.target;
    button.parentElement.parentElement.remove();
    atualiza();
}

function atualiza() {
    const precos = document.getElementsByClassName("cart-price");
    const qtd = document.getElementsByClassName("qtd-input");
    let valorTotal = 0;

    for (let i = 0; i < precos.length; i++) {
        const pegaValor = parseFloat(precos[i].innerText.replace("R$", "").replace(".", "").replace(",", "."));
        const quantidade = parseInt(qtd[i].value);

        if (quantidade > 0) {
            valorTotal += pegaValor * quantidade;
        }
    }

    const valorTotalElement = document.querySelector(".finish > div > p");
    if (valorTotalElement) {
        valorTotalElement.innerHTML = `Valor total: R$${valorTotal.toFixed(2).replace(".", ",")}`;
    }
}

function addProduct(event) {
    const button = event.target;
    const productInfo = button.parentElement.parentElement.parentElement;
    const productImage = productInfo.querySelector(".image-Product").src;
    const productName = productInfo.querySelector(".name-product").innerText;
    const productPrice = productInfo.querySelector(".price-product").innerText;

    const cartItems = document.querySelectorAll(".cart-name");
    for (let item of cartItems) {
        if (item.innerText === productName) {
            const quantityInput = item.parentElement.parentElement.querySelector(".qtd-input");
            quantityInput.value = parseInt(quantityInput.value) + 1;
            atualiza();
            return;
        }
    }

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

    cartItem.querySelector(".qtd-input").addEventListener("change", chackInputQauntidade);
    cartItem.querySelector(".cart-remover").addEventListener("click", removeProducts);

    atualiza();
}

function chackInputQauntidade(event) {
    const input = event.target;
    if (input.value < 1) {
        input.value = 1;
    }
    atualiza();
}

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

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => {
            alertBox.remove();
        }, 300);
    }, duration);
}

