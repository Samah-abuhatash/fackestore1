const limit = 5;
const getCategories = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const displayAllProducts = async (page = 1) => {
  const products = await getAllProducts();
  const skip = (page - 1) * limit;
  const paginatedProducts = products.slice(skip, skip + limit);

  try {
    if (products.length === 0) {
      document.querySelector(".allproudct .row").innerHTML = "<p>No products found...</p>";
      document.querySelector(".loading").classList.add("d-none");
    } else {
      const result = paginatedProducts
        .map((product) => {
          return `
            <div class='proudct12'>
              <h2>${product.title}</h2>
              <div class=""><img src='${product.image}' alt='${product.title}' /></div>
              <p><strong>Price:</strong> $${product.price}</p>
              <a href="./ppp.html?id=${product.id}">Details</a>
            </div>
          `;
        })
        .join("");

      document.querySelector(".allproudct .row").innerHTML = result;

      const numberOfPages = Math.ceil(products.length / limit);
      let paginationButtons = "";

      paginationButtons += `<button onclick="displayAllProducts(${page - 1})" ${page <= 1 ? 'disabled' : ''}>&lt;</button>`;

      for (let i = 1; i <= numberOfPages; i++) {
        paginationButtons += `<button onclick="displayAllProducts(${i})" class="${page === i ? 'active' : ''}">${i}</button>`;
      }

      paginationButtons += `<button onclick="displayAllProducts(${page + 1})" ${page >= numberOfPages ? 'disabled' : ''}>&gt;</button>`;

      document.querySelector('.pagnation').innerHTML = paginationButtons;
    }
  } catch (error) {
    console.error("Error displaying products:", error);
    document.querySelector(".allproudct .row").innerHTML = "<p>Please try again later...</p>";
  } finally {
    document.querySelector(".loading").classList.add("d-none");
  }
};

displayAllProducts();

const displayCategories = async () => {
  const categories = await getCategories();

  try {
    const result = categories
      .map((category) => {
        return `
          <div class='category1'>
            <h2>${category}</h2>
            <a href="./deatils.html?category=${encodeURIComponent(category)}">Details</a>
          </div>`;
      })
      .join("");

    document.querySelector(".catgores .row").innerHTML = result;
  } catch (error) {
    console.error("Error displaying categories:", error);
    document.querySelector(".catgores .row").innerHTML = "<p>Please try again later...</p>";
  } finally {
    document.querySelector(".loading").classList.add("d-none");
  }
};

displayCategories();
