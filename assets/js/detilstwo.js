const getProduct = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");
//        if (!productId) throw new Error("No product ID in URL");

        const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        return data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};

const displayProduct = async () => {
    try {
        const product = await getProduct();
  ///      if (!product) throw new Error("Product not found");

        const result = `
            <div class="product-card">
                <h2>${product.title}</h2>
                <img src="${product.image}" alt="${product.title}" />
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Rating:</strong> ⭐ ${product.rating.rate} (based on ${product.rating.count} reviews)</p>
            </div>
        `;
console.log(result);
        document.querySelector(".product .container .row").innerHTML = result;
    } catch (err) {
        console.error("Error displaying product:", err);
        document.querySelector(".product .container .row").innerHTML = "<p>Please try again later...</p>";
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }
};

displayProduct();
