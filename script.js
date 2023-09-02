
//function for fetching 3 different APIs data
async function fetchProducts(url) {
  try {
    //fetch method is used for fetching the different apis or make the request
    const response = await fetch(url);
    console.log(response);

    //check if url is successful
    if (!response.ok) {
      throw new Error("Response is not OK");
    }

    //parse the response body as Json
    return await response.json();
  } catch (error) {
    //throw error if any occured
    throw new Error("Error fetching the data due to poor Internet connection:" + error.message);
  }
}

//function to display the fetched data
async function Display() {
  try {
    const Jewellery = fetchProducts(
      "https://fakestoreapi.com/products/category/jewelery"
    );
    const Electronics = fetchProducts(
      "https://fakestoreapi.com/products/category/electronics"
    );
    const Clothing = fetchProducts(
      "https://fakestoreapi.com/products/category/women's clothing"
    );

    //wait for all data be fetched
    const [data1, data2, data3] = await Promise.all([
      Jewellery,
      Electronics,
      Clothing,
    ]);

    //limit each category to 18 items
    const jewelleryDataLimited = data1.slice(0, 18);
    const electronicsDataLimited = data2.slice(0, 18);
    const clothingDataLimited = data3.slice(0, 18);

    //access the elements where we want to display the data
    const product1 = document.getElementById("jewellery_data");
    const product2 = document.getElementById("electronics_data");
    const product3 = document.getElementById("clothing_data");

    //create the html elements and populate with data
    const jewelleryDiv = createProductList(jewelleryDataLimited);
    const electronicsDiv = createProductList(electronicsDataLimited);
    const clothingDiv = createProductList(clothingDataLimited);

    //append the elements to data display
    product1.appendChild(jewelleryDiv);
    product2.appendChild(electronicsDiv);
    product3.appendChild(clothingDiv);
  } 
  catch (error) {
    //handle the data and display it in ui
    const errDisplay = document.getElementById("errorDisplay");
    errDisplay.textContent = "Error:" + error.message;
    console.error(error);
  }

  //helper function to create and populate with data
  function createProductList(products) {
    const divele = document.createElement("div");

    divele.className='data'   //for styling
    products.map((items) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.innerHTML = `<img src=${items.image} alt=${items.title} id='dispImg'/>
        <div class='styling'>
        <h3 id='tit'>${items.title}</h3>
        <p id='pri'>${'Price: $'+items.price}</p>
        <button class='add-to-cart' id='but'>Add to cart</button>
        </div>`
        
        //add event listener for 'add to cart' buttons
        const addToCartButton=cardDiv.querySelector('.add-to-cart')
        addToCartButton.addEventListener('click',()=>handleAddToCart(items))  //pass this items to the add to cart
     divele.appendChild(cardDiv)



      // cart count increases on click add to cart button
      var button = document.getElementById("click_me");
      count = 0;
      addToCartButton.addEventListener('click',()=>handler(items))
      function handler() {
      count += 1;
      button.innerHTML = count
      }

      

    })
    return divele
  }
  function handleAddToCart(item){
    // cart handling logic
    addToCart(item)
    console.log('Add to cart',item)
  }


  //cart items array to  store the added products
  const cartItems=[]
  const T=[]

  //function to add the product to the cart
  function addToCart(product){
    const existingItem=cartItems.find(item=>item.id===product.id)
    T.push({...product})
    if(existingItem){
      
      //if the product is already in the cart, increase the quantity
      existingItem.quantity++
    }
    else{
      //if the product is not in the cart , add it with quantity 1
      cartItems.push({...product,quantity:1})
    }
    updateCart()
  }


  //Function to display the cart item in the UI
  function updateCart(){
    //clear the list before displaying the updated items
    const cartList=document.getElementById('cartList')
    
    cartList.innerHTML=''

    //display each item in the cart
    cartItems.forEach(item=>{
      displayCartItem(item)
    })
//update the cart total
updateCartTotal()


  //function to display the cart item in the UI
    function displayCartItem(product){
      const cartList=document.getElementById('cartList')
      const cartItems=document.createElement('div')
      //styling the cartItems
      cartItems.className='cart-item'
      cartItems.innerHTML=`
      <img src=${product.image} alt=${product.title} id='cartImg'/>
      <div class='content'>
        <h3>${product.title}</h3>
        <p>Quantity:${product.quantity}</p>
        <p>Total:$${(product.price*product.quantity).toFixed(2)}</p>
        <button class='remove-button'>Remove</button>
      </div> `
      //add event listener for "Remove" button
      const removeButton=cartItems.querySelector('.remove-button')
      removeButton.addEventListener('click',()=>handleRemoveFromCart(product))
      cartList.appendChild(cartItems)



      // cart count decreases on clicking remove button
      removeButton.addEventListener("click",()=>handler1(product))
      const button1=document.getElementById('click_me');
      function handler1(){
          
          count=count-1;
          button1.textContent=count;


      }
    }

    //function to remove the items from the cart
    // function handleRemoveFromCart(item){
    //   //find the index of the item in the cartItems array
    //   const index=cartItems.findIndex(cartItems=>cartItems.id===item.id)

    //   if(index!==-1){
    //     //if the item is found in the cartItems array,remove it
    //     cartItems.splice(index,1)
    //     updateCart()//update the cart display after removal
    //   }
    // }

    //function to remove
    function handleRemoveFromCart(item) {
      // Find the index of the item in the cartItems array
      const index = cartItems.findIndex(cartItem => cartItem.id === item.id);

      if (index !== -1) {
        const existingItem = cartItems[index];

        // If the item quantity is greater than 1, reduce the quantity
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          // If the item quantity is 1 or less, remove it from the cartItems array
          cartItems.splice(index, 1);
        }

        updateCart(); // Update the cart display after removal or quantity reduction
      }
}

    //function to update the cart total
    function updateCartTotal(){
      const totalElement=document.getElementById('total')
      const total=cartItems.reduce((sum,item)=>sum+(item.price)*(item.quantity),0)
      totalElement.textContent=`Total:$${total.toFixed(2)}`
      
      // to display the quantity beside cart logo
      // const quant=document.getElementById('cartTotal')
      // quant.textContent=`${T.length}`
    }
  }
}
Display();





//code for slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); 
  // Change image every 3 seconds
}



