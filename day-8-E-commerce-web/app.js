const wrapper =document.querySelector(".sliderWrapper")

const menuItems = document.querySelectorAll(".menuItem");
const productDescription =document.querySelector(".productDesc");

const products = [
    {
      id: 1,
      title: "Air Force",
      price: 119,
      desc : "Elevate your style with our exclusive Jordan Air force, combining unparalleled design, comfort, and a touch of basketball history." ,
      colors: [
        {
          code: "black",
          img: "./images/third.png",
        },
        {
          code: "darkblue",
          img: "./images/air2.png",
        },
      ],
    },
    {
      id: 2,
      title: "Air Jordan",
      price: 149,
      desc : "Elevate your style with our exclusive Air Jordan, combining unparalleled design, comfort, and a touch of basketball history." ,
      colors: [
        {
          code: "lightgray",
          img: "./images/second.png",
        },
        {
          code: "green",
          img: "./images/jordan2.png",
        },
      ],
    },
    {
      id: 3,
      title: "Blazer",
      price: 109,
      desc : "Elevate your style with our exclusive Jordan Blazer , combining unparalleled design, comfort, and a touch of basketball history." ,
      colors: [
        {
          code: "lightgray",
          img: "./images/fifth.png",
        },
        {
          code: "green",
          img: "./images/blazer2.png",
        },
      ],
    },
    {
      id: 4,
      title: "Crater",
      price: 129,
      desc : "Elevate your style with our exclusive Jordan crater, combining unparalleled design, comfort, and a touch of basketball history." ,
      colors: [
        {
          code: "black",
          img: "./images/fourth.png",
        },
        {
          code: "lightgray",
          img: "./images/crater2.png",
        },
      ],
    },
    {
      id: 5,
      title: "Hippie",
      price: 99,
      desc : "Elevate your style with our exclusive Jordan hippie, combining unparalleled design, comfort, and a touch of basketball history." ,
      colors: [
        {
          code: "gray",
          img: "./images/first.png",
        },
        {
          code: "black",
          img: "./images/hippie2.png",
        },
      ],
    },
  ];

  let choosenProduct=products[0]

  
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");


menuItems.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        wrapper.style.transform=`translateX(${-100 * index}vw)`;  // for the slides

        choosenProduct=products[index]
        currentProductTitle.textContent=choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
        productDescription.textContent=choosenProduct.desc;
        // productDescription.textContent=choosenProduct.desc.$("our").text(choosenProduct.title);
    });
});

currentProductSizes.forEach((size,index)=>{
    size.addEventListener("click",()=>{
        currentProductSizes.forEach((size)=>{
            size.style.backgroundColor="white"
        size.style.color="black";
        })
        size.style.backgroundColor="black"
        size.style.color="white";
    });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
