"use strict"
import state from "./state";
import render from "./render";

const appEl = document.querySelector("#app");

function updateProductCount(index, delta) {
    const newCount = state.products[index].count + delta;
    state.products[index].count = Math.max(0, newCount); 
}

appEl.addEventListener("click", (e) => {
    let shouldRender = false;

    if (e.target.classList.contains("cartView")) {
        state.viewCart = !state.viewCart;
        shouldRender = true;
    } else if (e.target.classList.contains("addCart") || e.target.classList.contains("addProduct")) {
        updateProductCount(e.target.dataset.index, 1);
        shouldRender = true;
    } else if (e.target.classList.contains("removeProduct")) {
        updateProductCount(e.target.dataset.index, -1);
        shouldRender = true;
    } else if (e.target.classList.contains("checkOut")) {
        state.products.forEach(product => product.count = 0);
        shouldRender = true;
    }

    if (shouldRender) {
        render();
    }
});

render();
