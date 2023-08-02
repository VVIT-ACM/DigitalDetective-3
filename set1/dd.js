let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: 'https://drive.google.com/uc?export=view&id=1m9k5ZeJwG-EuFfdkO_3qDCseg8H51g81',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: "https://drive.google.com/uc?export=view&id=18qM5jdFOX_7URhKomtiZm1QcHvEpN2Jw",
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: "https://drive.google.com/uc?export=view&id=1hHLJ0JWtCqf6ONoMAn74XCcyjphXmZCq",
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: "https://drive.google.com/uc?export=view&id=124cCee8KMDlY_W23XcbAVGG9adcUpRV5",
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: "https://drive.google.com/uc?export=view&id=1bQSyN0Hhm5Mqqnrr6piTd6Z6AekyZZiU",
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: "https://drive.google.com/uc?export=view&id=1MQNHaQMDhun6PN6cCIn-WqDXVkbb9BkL",
        price: 120000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button "addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}