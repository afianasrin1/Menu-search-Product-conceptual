const loadAllProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

// dynaminc vabe menu
const setAllMenu = async () => {
  const data = await loadAllProducts();
  const menu = document.getElementById("menu_all");
  const uniqueArray = [];
  for (const product of data) {
    // console.log(product.category);
    if (uniqueArray.indexOf(product.category) === -1) {
      uniqueArray.push(product.category);
      const li = document.createElement("li");
      li.innerHTML = `<a>${product.category}</a>`;
      menu.appendChild(li);
    }
  }
};

setAllMenu();

const searchField = document.getElementById("search-field");
const spinner = document.getElementById("spinner");
spinner.classList.remove("hidden");

searchField.addEventListener("keypress", async (event) => {
  // console.log(event.key);
  if (event.key === "Enter") {
    // console.log(searchField.value);
    const searchValue = searchField.value;
    // console.log(searchValue);
    const allProducts = await loadAllProducts();
    spinner.classList.add("hidden");
    // console.log(allProducts);

    const foundProducts = allProducts.filter((product) =>
      product.category.includes(searchValue)
    );
    // console.log(foundProducts);
    const productsContainer = document.getElementById("product-container");
    const notFound = document.getElementById("no-found");
    productsContainer.textContent = "";
    notFound.textContent = "";

    if (foundProducts.length === 0) {
      console.log("not found");
      notFound.innerHTML = `<h2 class="text-2xl text-center text-orange-500"> not found</h2>`;
      return;
    }

    foundProducts.forEach((product) => {
      // console.log(product);
      const { category, image, title, description } = product;
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src="${image}" alt="Shoes" class="h-60 w-full" /></figure>
  <div class="card-body">
    <h2 class="card-title">${category}</h2>
    <p>${title.length > 20 ? title.slice(0, 20) + "..." : title}</p>
    <div class="card-actions justify-end">
      
      <label for="my-modal-3" onclick="showModal('${description}','${image}')" class="btn modal-button btn-primary">Show Details</label>
    </div>
  </div>
</div>`;
      productsContainer.appendChild(div);
    });
  }
});
const showModal = (description, image) => {
  // console.log(description, image)
  const modalBody = document.getElementById("modal-body");
  modalBody.textContent = "";
  modalBody.innerHTML = `
  <p class="py-4">
  ${description}
  </p>
 
  <img src="${image}"/>
  `;
};
