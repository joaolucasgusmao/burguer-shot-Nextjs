const fetchProducts = async () => {
  const response = await fetch(
    "https://products-api-k9wk.onrender.com/api/products"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
};

export default fetchProducts;
