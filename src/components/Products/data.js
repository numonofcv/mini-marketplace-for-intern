// data.js
// API manbasi: https://fakestoreapi.com/products

export const fetchProducts = async () => {
  try {
    // API chaqiruvi, faqat dastlabki 50 ta mahsulotni olish uchun cheklash
    const response = await fetch("https://fakestoreapi.com/products?limit=50");

    if (!response.ok) {
      throw new Error(`API xatosi! Holat: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Mahsulotlarni yuklashda xato:", error);
    return []; // Xato bo'lsa bo'sh massiv qaytarish
  }
};

// data.js

// // 1️⃣ FakestoreAPI
// export const fetchFakeStoreProducts = async () => {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products?limit=50");
//     if (!response.ok) throw new Error(`API xatosi! Holat: ${response.status}`);
//     return await response.json();
//   } catch (error) {
//     console.error("FakestoreAPI mahsulot yuklash xatosi:", error);
//     return [];
//   }
// };

// // 2️⃣ DummyJSON API
// export const fetchDummyJSONProducts = async () => {
//   try {
//     const response = await fetch("https://dummyjson.com/products?limit=50");
//     if (!response.ok) throw new Error(`API xatosi! Holat: ${response.status}`);
//     const data = await response.json();
//     return data.products; // DummyJSON data.products ichida bo'ladi
//   } catch (error) {
//     console.error("DummyJSON mahsulot yuklash xatosi:", error);
//     return [];
//   }
// };

// 3️⃣ Platzi Fake Store API (EscuelaJS)
export const fetchPlatziProducts = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products?limit=560");
    if (!response.ok) throw new Error(`API xatosi! Holat: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Platzi API mahsulot yuklash xatosi:", error);
    return [];
  }
};

// 4️⃣ Dummy Products API (Heroku)
// export const fetchDummyProductsAPI = async () => {
//   try {
//     const response = await fetch("https://dummyproducts-api.herokuapp.com/api/v1/products?limit=50");
//     if (!response.ok) throw new Error(`API xatosi! Holat: ${response.status}`);
//     return await response.json();
//   } catch (error) {
//     console.error("DummyProducts API mahsulot yuklash xatosi:", error);
//     return [];
//   }
// };

