// controlling navigation menu

const nav = document.querySelector("nav");

const openNav = document.getElementById("nav-open");
const closeNav = document.getElementById("nav-close");

openNav.addEventListener("click", () => {
    nav.style.display = "block";
});

closeNav.addEventListener("click", () => {
    nav.style.display = "none";
});

const mediaQuery = window.matchMedia("(min-width: 780px)");
handleNavChange(mediaQuery);
mediaQuery.addListener(handleNavChange);

function handleNavChange(mediaQuery) {
    if (mediaQuery.matches) {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
    }
}

// controlling main carousel

// popping carousel
const mainImg = document.getElementById("picture-in-display");
const carouselOverlay = document.querySelector("section.overlay-carousel");
const cancelCarousel = document.querySelector(".cancel-carousel");

// mainImg.addEventListener("click", showMainCarousel);

function showMainCarousel() {
    carouselOverlay.style.display = "flex";
}

const mediaQuery2 = window.matchMedia("(max-width: 600px)");
handleCarouselShow(mediaQuery2);
mediaQuery2.addListener(handleCarouselShow);

function handleCarouselShow(mediaQuery2) {
    if (mediaQuery2.matches) {
        mainImg.removeEventListener("click", showMainCarousel);
        mainImg.style.cursor = "default";
    } else {
        mainImg.addEventListener("click", showMainCarousel);
        mainImg.style.cursor = "pointer";
    }
}

cancelCarousel.addEventListener("click", () => {
    carouselOverlay.style.display = "none";
});

// sliding effect on main carousel

let presentImg = 0;
const imgAddresses = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
];

const mainCarouselImg = document.getElementById("picture-in-display-overlay");
const mainCarouselPrevBtn = document.getElementById("main-carousel-icon-prev");
const mainCarouselNextBtn = document.getElementById("main-carousel-icon-next");
const mainCarouselImgGallery = document.querySelectorAll(
    ".main-product-image-gallery-item"
);

mainCarouselPrevBtn.addEventListener("click", () => {
    sliderMain(-1);
});
mainCarouselNextBtn.addEventListener("click", () => {
    sliderMain(1);
});

mainCarouselImgGallery.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        mainCarouselImgGallery.forEach((element) => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
        mainCarouselImg.src = imgAddresses[index];
    });
});

function sliderMain(x) {
    presentImg = (presentImg + x) % 4;
    if (presentImg < 0) {
        presentImg += 4;
    }
    mainCarouselImg.src = imgAddresses[presentImg];
    mainCarouselImgGallery.forEach((item, index) => {
        item.classList.remove("active");
        if (index === presentImg) {
            item.classList.add("active");
        }
    });
}

// sliding effect on simple carousel

const carouselImg = document.getElementById("picture-in-display");
const carouselPrevBtn = document.getElementById("carousel-icon-prev");
const carouselNextBtn = document.getElementById("carousel-icon-next");
const carouselImgGallery = document.querySelectorAll(
    ".product-image-gallery-item"
);

carouselPrevBtn.addEventListener("click", () => {
    slider(-1);
});

carouselNextBtn.addEventListener("click", () => {
    slider(1);
});

carouselImgGallery.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        carouselImgGallery.forEach((element) => {
            element.classList.remove("active");
        });
        item.classList.add("active");
        mainCarouselImgGallery.forEach((element, ind) => {
            element.classList.remove("active");
            if (ind === index) {
                element.classList.add("active");
            }
        });
        carouselImg.src = imgAddresses[index];
        mainCarouselImg.src = imgAddresses[index];
    });
});

function slider(x) {
    presentImg = (presentImg + x) % 4;
    if (presentImg < 0) {
        presentImg += 4;
    }
    carouselImg.src = imgAddresses[presentImg];
    mainCarouselImg.src = imgAddresses[presentImg];
    carouselImgGallery.forEach((item, index) => {
        item.classList.remove("active");
        if (index === presentImg) {
            item.classList.add("active");
        }
    });
    mainCarouselImgGallery.forEach((item, index) => {
        item.classList.remove("active");
        if (index === presentImg) {
            item.classList.add("active");
        }
    });
}

// items to cart

const cart = [];
const item = {
    _id: "01",
    title: "Fall Limited Edition Sneakers",
    price: "$125.00",
    quantity: 0,
    itemTotal: function () {
        const newPrice = parseFloat(this.price.slice(1));
        return "$" + this.quantity * newPrice;
    },
};
const counterDisplay = document.querySelector(".counter-display");

function checkCartItem() {
    if (cart.length === 0) {
        document.querySelector(".cart-empty").style.display = "flex";
        document.querySelector(".cart-items-badge").style.display = "none";
        document.querySelector(".cart-body").style.display = "none";
        counterDisplay.textContent = item.quantity;
    } else {
        document.querySelector(".cart-empty").style.display = "none";
        document.querySelector(".cart-items-badge").style.display = "block";
        document.querySelector(".cart-items-badge").textContent =
            cart[0].quantity;
        document.querySelector(".cart-body").style.display = "block";
        document.querySelector(".cart-body-price").innerHTML = `${
            cart[0].price
        } x ${cart[0].quantity} <b> ${cart[0].itemTotal()} </b>`;
    }
}

checkCartItem();

document.querySelector(".cart-logo").addEventListener("click", () => {
    document.querySelector(".cart-modal").classList.toggle("hide");
});

document
    .getElementById("add-to-cart-btn")
    .addEventListener("click", addItemCart);

document
    .querySelector(".cart-body-delete")
    .addEventListener("click", removeItemCart);

document
    .getElementById("decrement-btn")
    .addEventListener("click", decrementItem);

document
    .getElementById("increment-btn")
    .addEventListener("click", incrementItem);

function addItemCart() {
    if (item.quantity > 0 && cart.length == 0) {
        cart.push(item);
    } else if (item.quantity > 0 && cart.length > 0) {
        cart[0].quantity = item.quantity;
    }
    checkCartItem();
}

function incrementItem() {
    item.quantity += 1;
    counterDisplay.textContent = item.quantity;
}

function decrementItem() {
    if (item.quantity > 0) {
        item.quantity -= 1;
        counterDisplay.textContent = item.quantity;
    }
}

function removeItemCart() {
    cart.pop();
    item.quantity = 0;
    checkCartItem();
}
