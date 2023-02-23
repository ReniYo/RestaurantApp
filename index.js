import { menuArray } from "/data.js"; 

let purchasedItemsArray = []
let purchasedItems = ``
let totalPrice = 0

document.addEventListener("click", function(e){
    if(e.target.dataset.purchase){
        purchaseItems(e.target.dataset.purchase)
    }
    else if(e.target.dataset.remove){
        removeItems(e.target.dataset.remove)
    }
    else if(e.target.id === "complete-order-btn"){
        if(purchasedItemsArray.length === 0){
            disableOrderBtn()
            document.getElementById("error-msg").style.display = "inline"
        }
        else{
            completeOrderModal()
        }
        
    }
    else if(e.target.id === "modal-close-btn"){
        modal.style.display = 'none'
    }
    else if(e.target.id === "confirm-order-msg"){
        document.getElementById("confirm-order-msg").style.display = "none"
        renderListMenu()
    }
})


function purchaseItems(itemId) {
    const targetMenuObj = menuArray.filter(function(menuObj){
        return menuObj.id.toString() === itemId
        })[0]
       purchasedItemsArray.push(targetMenuObj)
       renderOrderList()   
}
   
function removeItems(itemId) {
    const targetMenuObj = menuArray.filter(function(menuObj){
        return menuObj.id.toString() === itemId
        })[0]
        
     const indexOf = purchasedItemsArray.indexOf(targetMenuObj)   
     purchasedItemsArray.splice(indexOf,1)
        renderOrderList()
}

function disableOrderBtn(){
    document.getElementById("complete-order-btn").disabled = true
}

function completeOrderModal(){
    modal.style.display = "inline"
    
    const paymentForm = document.getElementById("payment-form")
    
    paymentForm.addEventListener("submit", function(e){
        e.preventDefault()
        const modalFormData = new FormData(paymentForm)
        const fullName = modalFormData.get("fullName")
        modal.style.display = "none"
        document.getElementById("purchase").innerHTML = `
        <h4 id="confirm-order-msg" class="confirm-order-msg">Thanks, ${fullName}! Your order is on its way!</h4>
        `
    })
     purchasedItemsArray = []
     purchasedItems = ``
     totalPrice = 0
    
   
    
     
}


function renderOrderList() {
    purchasedItemsArray.forEach(function(item){
           totalPrice += item.price
            purchasedItems += `
                           <div class="purchase-list">
                                <p class="item-name">${item.name}</p>
                                <p class="remove-btn" data-remove="${item.id}">remove</p>
                                <p class="item-price purchase-price">$${item.price}</p>
                             </div>
                        ` 
       }) 
   renderOrder() 
   purchasedItems = ``
   totalPrice = 0
}   

function getOrder(){
    
    let orderHtml = `
        <div class="purchase-container">
                    <div class="inner-information">
                        <h3>Your Order</h3>
                        <div >
                            ${purchasedItems}
                        </div>
                        <div class="purchase-border"></div>
                        <div class="total-info">
                            <p class="total-price-title">Total price:</p>
                            <p class="total-price">$${totalPrice}</p>
                        </div>
                        <div id="error-msg" class="error-msg">
                            <p>Please, choose a product.</p>
                        </div> 
                        <button id="complete-order-btn" class="style-btn">Complete order</button>
                    </div>
                </div>
    `
    
    
    return orderHtml
    
}

function renderOrder() {
    document.getElementById("purchase").innerHTML = getOrder()
}



function getListMenu() {
    let listMenuHtml = ``
    menuArray.forEach(function(item){
        listMenuHtml += `
        <div class="menu-item">
             <div class="inner-menu-item">
               <div class="menu-item-left">
                    <div class="menu-item-emoji-container">
                            <p class="menu-item-emoji">${item.emoji}</p>
                      </div>
                     <div class="item-menu-info">
                          <p class="item-name">${item.name}</p>
                          <p class="item-ingredients">${item.ingredients}</p>
                          <p class="item-price">$${item.price}</p>
                      </div>
                  </div>
                  <span class="purchase-btn">
                      <i class="fa-solid fa-circle-plus" data-purchase="${item.id}"></i>
                  </span>               
              </div>
          </div>
        `
    })
    return listMenuHtml
}

function renderListMenu(){
    document.getElementById("list-menu").innerHTML = getListMenu()
}

renderListMenu()

