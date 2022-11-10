export async function getCategories() {
  const urlCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(urlCategories);
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId === '') {
    const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const requestQuery = await fetch(urlQuery);
    const responseQuery = await requestQuery.json();
    return responseQuery;
  } if (query === '') {
    const urlCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const requestCategory = await fetch(urlCategory);
    const responseCategory = await requestCategory.json();
    return responseCategory;
  }
  const urlProducts = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const request = await fetch(urlProducts);
  const response = await request.json();
  return response;
}

export async function getProductById(productId) {
  const urlID = `https://api.mercadolibre.com/items/${productId}`;
  const request = await fetch(urlID);
  const response = await request.json();
  return response;
}
