// Cart page

const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartMessage = document.getElementById("cartMessage");
const subTotalEl = document.getElementById("subTotal");
const taxAmountEl = document.getElementById("taxAmount");
const totalAmountEl = document.getElementById("totalAmount");
const confirmBtn = document.getElementById("confirmBtn");


let cart = JSON.parse(localStorage.getItem("cart")) || [];
const taxRate = 0.15;

function updateSummary() {
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subTotal += cart[i].price * cart[i].quantity;
    }

    const tax   = subTotal * taxRate;
    const total = subTotal + tax;
    subTotalEl.textContent  = "$" + subTotal.toFixed(2);
    taxAmountEl.textContent = "$" + tax.toFixed(2);
    totalAmountEl.textContent = "$" + total.toFixed(2);
}


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}




function renderCart() {

    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartMessage.textContent = "Your cart is empty. Add a service first.";
        updateSummary();
        return;
    }

    cartMessage.textContent = "";
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const card = document.createElement("div");
        card.classList.add("cart-items");



        card.innerHTML = `
            <img src="${item.image}" alt="${item.serviceName}" class="cart-item-img" />

            <div class="cart-service-info">
                <p class="cart-service-name">${item.serviceName}</p>
                <p class="cart-service-detail">${item.issueType}</p>
                <p class="cart-service-detail">${item.issueDescription}</p>
                <p class="cart-service-price">$${(item.price * item.quantity).toFixed(2)}</p>

                <div class="cart-control-buttons">
                    <div class="control-buttons">
                        <button class="qty-btn decrease-btn" data-index="${i}">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn increase-btn" data-index="${i}">+</button>
                    </div>
                    <button class="remove-btn" data-index="${i}">Remove</button>
                </div>
            </div>
        `;


        cartItemsContainer.appendChild(card);
    }
    updateSummary();
    attachButtonEvents();
}

function attachButtonEvents() {
    const increaseButtons = document.querySelectorAll(".increase-btn");

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener("click", function () {

            const index = Number(this.getAttribute("data-index"));

            if (cart[index].quantity < 10) {
                cart[index].quantity++;
                cart[index].totalPrice = cart[index].price * cart[index].quantity;
                saveCart();
                renderCart();
            } else {
                cartMessage.textContent =
                    "you reached the maximum quantity, contact us if you want to add more services! ";
            }
        });
        }

    const decreaseButtons = document.querySelectorAll(".decrease-btn");

    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener("click", function () {

            const index = Number(this.getAttribute("data-index"));

            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                cart[index].totalPrice = cart[index].price * cart[index].quantity;
                saveCart();
                renderCart();
            } else {
                cartMessage.textContent =
                    "you reached the minimum quantity, Use the Remove button to delete this service if not needed.";
            }
        });
        }

    const removeButtons = document.querySelectorAll(".remove-btn");

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", function () {
            const index = Number(this.getAttribute("data-index"));
            cart.splice(index, 1);
            saveCart();
            renderCart();
        });
         }
         }

confirmBtn.addEventListener("click", function (event) {

    if (cart.length === 0) {
        event.preventDefault();
        cartMessage.textContent = " To be able to confirm and book, you have to add at least a service";
        }
        });


renderCart();