const getproudct = async () => {

try {const urlParams = new URLSearchParams(window.location.search);
  console.log(window.location);

  const categoryName = decodeURIComponent(urlParams.get("category"));
  console.log(window.location);

  const { data } = await axios.get(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(
      categoryName
    )}`
  );
  return data;}
   catch (e) {return [];}
  //console.log(data);
  
};

//getcategoryes();

const displayproudct = async () => {
  const proudct = await getproudct();
try{console.log(proudct);
  const result = proudct
    .map(function (category) {
      return `<div class="category">

   
        <div class="imgproudct">  <img src="${category.image}" alt="${category.title}" /></div>
          <p>Price: $${category.price}</p>
          <a href="./ppp.html?id=${category.id}"> deatils_for_proudct</a>
          </div>`;
    })
    .join("");
  
  console.log(proudct);
  document.querySelector(".proudct .countainers .row").innerHTML = result;}
  catch(err){   
    document.querySelector(".proudct .countainers .row ").innerHTML = "<p> pleasy try again later..</P>";
  }
  finally{ document.querySelector(".loading ").classList.add("d-none");}
};

displayproudct();  