
 let products = [
    {
        image:"https://shorturl.at/gtvAD",
        name: "Earphone",
        price:" ks 10,000",
    },
    {
        image:"https://shorturl.at/ilvBE",
        name: "Headphone",
        price:" ks 30,000",
    },
    {
        image:"https://shorturl.at/cyJKQ",
        name: "Bluetooth",
        price:" ks 20,000",
    },
    {
        image:"https://shorturl.at/fruz6",
        name: "Bluetooth Speaker",
        price:" ks 25,000",
    },
    {
        image:"https://shorturl.at/kBDEN",
        name: "Shoe",
        price:" ks 35,000",
    },
    {
        image:"https://shorturl.at/txFQ7",
        name: "T shirt",
        price:" ks 14,000",
    },
    {
        image:"https://shorturl.at/ACER0",
        name: "Trouser",
        price:" ks 25,000",
    },
    {
        image:"https://shorturl.at/crJO0",
        name: "Short",
        price:" ks 15,000",
    },
    {
        image:"https://shorturl.at/ghxJV",
        name: "Backpack",
        price:" ks 30,000",
    },
    {
        image:"https://shorturl.at/JLVX2",
        name: "Head-cap",
        price:" ks 9,000",
    },
    {
        image:"https://shorturl.at/louCS",           
        name: "Purse",
        price:" ks 25,000",
    },
    {
        image:"https://shorturl.at/PQTV5",
        name: "Jarkin",
        price:" ks 30,000",
    },
 ]
    
 let shoppingCartContainer = document.querySelector(".shopping-cart-container");
products.forEach(createChild);
function createChild(products){
    let shoppingCartBox = document.createElement("div");
    shoppingCartBox.innerHTML = `<img class="material-image" src="${products.image}" />
    <span class="material-category">${products.name}</span>
    <p class="price">${products.price}</p>`
    shoppingCartBox.classList.add("shopping-cart-box");
    shoppingCartContainer.appendChild(shoppingCartBox);
}



if(document.readyState = "loading"){
    document.addEventListener("DOMContentLoaded", ready());
}else{
    ready();
}
function ready(){
    //remove order cart from orderdetails
    var orderListRemove = document.getElementsByClassName("order-remove");
    for(i = 0; i < orderListRemove.length; i++){
        var orderRemoveButton = orderListRemove[i];
        orderRemoveButton.addEventListener("click",removeOrderList);
    };

    // order add cart to click shopping-cart-box
    var shoppingCartBox=document.getElementsByClassName("shopping-cart-box"); 
    for(i=0; i< shoppingCartBox.length;i++){
        var cartBox= shoppingCartBox[i];
        cartBox.addEventListener("click",addOrder);
        
    };
    
}


//order remove fuction
function removeOrderList(event){
    orderRemoveButtonClicked = event.target;
    orderRemoveButtonClicked.parentElement.remove();
    updateTotal();  
};

// add order-list in shopping-cart-box
function addOrder(event){
     cartBoxAdd = event.target;
    
    var cartBoxAddClicked= cartBoxAdd.parentElement;

    var categoryName = cartBoxAddClicked.children[1].innerText;
    var categoryPrice = cartBoxAddClicked.children[2].innerText;
    var categoryImage = cartBoxAddClicked.children[0].src;
    addOrderCart(categoryImage,categoryName,categoryPrice);
}


function addOrderCart(categoryImage,categoryName,categoryPrice){
    var orderMaterial = document.createElement("div");
    orderMaterial.classList.add("order-material");
    var orderBoxContainer = document.getElementsByClassName("order-box-container")[0];
    var orderMaterialNames = orderBoxContainer.getElementsByClassName("order-material-name");
    for(i = 0; i < orderMaterialNames.length; i++){
        if(orderMaterialNames[i].innerText == categoryName){
            alert("you have already add this item to cart");
            return ;
        };
    };
    
    var orderMaterialContent = `<img src="${categoryImage}" alt="" class="order-image">
    <div class="order-name-quantity">
        <p class="order-material-name">${categoryName}</p>
        <div class="order-quantity-price">
            <div class="quantity-box">
                <li class="minus">-</li>
                <li class="quantity" >1</li>
                <li class="plus">+</li>
            </div>
            <div class="material-price">${categoryPrice}</div>
        </div>
    </div> 
    <i class="fa-solid fa-xmark order-remove"></i>`;
    orderMaterial.innerHTML = orderMaterialContent;
    orderBoxContainer.append(orderMaterial);

    orderMaterial.getElementsByClassName("order-remove")[0].addEventListener("click",removeOrderList);
     updateTotal();

    var orderQuantityBox = orderMaterial.getElementsByClassName("quantity-box");
    for(i = 0; i< orderQuantityBox.length; i++){
        orderBox = orderQuantityBox[i];
        var quantity = orderBox.children[1];
        let n = 1;
         orderBox.children[0].addEventListener("click",function(){
            if( n < 2){
                return ;
            }
            n--;
            quantity.innerHTML= n;
            
            
             updateTotal()
        })
         orderBox.children[2].addEventListener("click",function(){
            n++;
            quantity.innerHTML= n;
            
             updateTotal()
        })
    }

}

        
    
function updateTotal (){
    var orderBoxContainer = document.getElementsByClassName("order-box-container")[0];
    var materialBox = orderBoxContainer.getElementsByClassName("order-material");
    var total =  0;
    for ( i = 0; i< materialBox.length; i++){
            var orderBox = materialBox[i];
            var cartQuantity = orderBox.getElementsByClassName("quantity")[0];
            var materialPrice = orderBox.getElementsByClassName("material-price")[0];
            var price = parseFloat(materialPrice.innerText.replace("ks",""));
            var quantity = cartQuantity.innerHTML;
            total = total  + (quantity * price );
    }
            subTotal = Math.round(total * 1000);
            document.getElementsByClassName("subtotal-price")[0].innerText= "ks" + " " + subTotal;
            
            taxiPrice = Math.round((subTotal*5)/100)
            document.getElementsByClassName("taxi-price")[0].innerText =  "ks" + " " + taxiPrice;

            totalPrice = subTotal + taxiPrice;
            document.getElementsByClassName("total-price")[0].innerText = "ks" + " " + totalPrice;
        
};
