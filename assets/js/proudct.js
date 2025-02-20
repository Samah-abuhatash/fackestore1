const getproducts= async(page)=>{
const skip=(page-1)*10;
const {data} = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);

return data;
} 

    const displayProducts = async (page=1) => {
        const data  = await getproducts(page);
        const  numberofpages= Math.ceil(data.total/10);
        console.log(numberofpages);
        //console.log(products);
        const result = data.products
       .map(function (product) {
return `<div class="proudct">
            <h1>${product.title}</h1>
            <img src="${product.thumbnail} " class='proudct-img'/>
            </div>`
    }).join('');
    document.querySelector('.proudcts .row ').innerHTML = result;
   custom_mymodel();
   let pagnationlink=``;
   if(page>1){
    pagnationlink=`<li><button onclick=displayProducts(${page-1}) >&lt;</button></li>`;
   }
   else{
    pagnationlink=`<li><button disabled >&lt;</button></li>`;
   }
   for(let i=1;i<=numberofpages;i++){
       pagnationlink+=` <li><button onclick=displayProducts(${i})>${i} <button/></li>`;
   }
   if(page<numberofpages){
    pagnationlink+=`<li><button onclick=displayProducts(${parseInt(page) + 1})>&gt;</button></li>`;
   }
   else{
    pagnationlink+=`<li><button disabled>&gt;</button></li>`;
   }
  // pagnationlink += `<li><button onclick="displayProducts(${parseInt(page) + 1})">&gt;</button></li>`;

  console.log(pagnationlink);
  document.querySelector('.pagnation').innerHTML = pagnationlink;
}

 displayProducts();
  function custom_mymodel(){
    const moadel=document.querySelector(".my_moadel");
    const left =moadel.querySelector(".l-button");
    const right=moadel.querySelector(".r-button");
    const close=document.querySelector(".x-button");
const images=  Array.from(document.querySelectorAll(".proudct-img")); 
 let curent_index=0;
// Array.from تحول الى اريز 
console.log (images);
// e. taarget تعطمي معلمومات عن العنصر الي كبستىعلي

images.forEach(function(img){
    img.addEventListener('click',(e)=>{
        moadel.classList.remove('d-none1');
        moadel.querySelector('img').setAttribute ( "src",e.target.src);
        const curent_img=e.target;
         curent_index=images.indexOf(curent_img);
        console.log(curent_index);

    });

});

/*for(let i=0;i<images.length;i++)
{
images[i].onclick=(e)=>{
    console.log(e.target);
}
}*/
close.addEventListener("click",(e)=>{
    
    moadel.classList.add('d-none1');});

    right.addEventListener("click",(e)=>{
        curent_index++;
        if(curent_index>=images.length){curent_index=0;}
        const src =images[curent_index].getAttribute("src");
        moadel.querySelector('img').setAttribute ( "src",src);
        console.log(src);
     
    
    });
    left.addEventListener("click",(e)=>{
        curent_index--;
        if(curent_index<=0){curent_index=images.length-1;}
        const src =images[curent_index].getAttribute("src");
        moadel.querySelector('img').setAttribute ( "src",src);
        console.log(src);
     
    
    });
    //key board 
    document.addEventListener("keydown",(e)=>{
        if(e.code==="ArrowRight"){
            curent_index++;
            if(curent_index>=images.length){curent_index=0;}
            const src =images[curent_index].getAttribute("src");
            moadel.querySelector('img').setAttribute ( "src",src);
            console.log(src);
         
        }
        if(e.code==="ArrowLeft"){
            curent_index++;
            if(curent_index>=images.length){curent_index=0;}
            const src =images[curent_index].getAttribute("src");
            moadel.querySelector('img').setAttribute ( "src",src);
            console.log(src);
         
        }
        if(e.code==="Escape"){
            moadel.classList.add('d-none1');         
        }
});

  }