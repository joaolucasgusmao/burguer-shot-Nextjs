const fetchProducts = async () => {
  const response = await fetch("https://hamburgueria-kenzie-json-serve.herokuapp.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
};
