// Issue description validation
const issueInput = document.getElementById("issue-description");
const issueError = document.getElementById("issue-description-error");

function validateIssueDescription() {
    const issueValue = issueInput.value.trim();

    if (issueValue === "") {
        issueError.textContent = "Please describe your issue.";
        issueInput.classList.add("input-error");
        issueInput.classList.remove("input-valid");
        return false;
    } else if (issueValue.length < 10) {
        issueError.textContent = "Description must be at least 10 characters.";
        issueInput.classList.add("input-error");
        issueInput.classList.remove("input-valid");
        return false;
    } else {
        issueError.textContent = "";
        issueInput.classList.remove("input-error");
        issueInput.classList.add("input-valid");
        return true;
    }
}

issueInput.addEventListener("blur", validateIssueDescription);


// Issue type dropdown validation
const issueType = document.getElementById("issue-type");
const issueTypeError = document.getElementById("issue-type-error");

function validateIssueType() {
    if (issueType.value === "") {
        issueTypeError.textContent = "Please select issue type.";
        issueType.classList.add("input-error");
        issueType.classList.remove("input-valid");
        return false;
    } else {
        issueTypeError.textContent = "";
        issueType.classList.remove("input-error");
        issueType.classList.add("input-valid");
        return true;
    }
}

issueType.addEventListener("change", validateIssueType);


// Quantity and price update
const decreaseQuantity = document.getElementById("decrease-quantity");
const increaseQuantity = document.getElementById("increase-quantity");
const quantityValue = document.getElementById("quantity-value");
const totalPrice = document.getElementById("total-price");

const servicePrice = 20.75;
let quantity = 1;

function updatePrice() {
    const finalPrice = servicePrice * quantity;
    totalPrice.textContent = "$" + finalPrice.toFixed(2);
}

increaseQuantity.addEventListener("click", function () {
    if (quantity < 10) {
        quantity++;
        quantityValue.textContent = quantity;
        updatePrice();
    }
});

decreaseQuantity.addEventListener("click", function () {
    if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
        updatePrice();
    }
});


// Add to cart and localStorage
const cartButton = document.getElementById("cart-button");

const serviceName = document.getElementById("service-name").textContent;

const serviceImage = document.getElementById("service-image").getAttribute("src");

cartButton.addEventListener("click", function () {

    const isIssueValid = validateIssueDescription();

    const isTypeValid = validateIssueType();

    if (isIssueValid && isTypeValid) {

        const cartItem = {
            serviceName: serviceName,
            issueDescription: issueInput.value.trim(),
            issueType: issueType.value,
            quantity: quantity,
            price: servicePrice,
            totalPrice: servicePrice * quantity,
            image: serviceImage
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(cartItem);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Service added to cart successfully!");
    }
});