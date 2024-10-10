"use strict"
const state = {

    products: [
        {
            name: 'Frank',
            img: 'http://placekitten.com/150/150?image=1',
            price: 0.99,
            count: 0,
        },

        {
            name: 'ZeruiLi',
            img: 'http://placekitten.com/150/150?image=2',
            price: 3.14,
            count: 0,
        },
        {
            name: 'Brett',
            img: 'http://placekitten.com/150/150?image=3',
            price: 2.73,
            count: 0,
        }
    ],    

viewCart: false,

getTotalCount: function () {
    let totalCount = 0;
    state.products.forEach((product) => {
        totalCount += product.count;
    });
    return totalCount;
},

getProductPrice: function (index) {
    return (state.products[index].count * state.products[index].price).toFixed(2);
},

getTotalPrice: function () {
    let totalPrice = 0;
    state.products.forEach((product) => {
        totalPrice += product.count * product.price;
    });
    return totalPrice.toFixed(2);
},
};

export default state;