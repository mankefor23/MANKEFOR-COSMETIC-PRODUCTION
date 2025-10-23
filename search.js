let products = [
  {
    title: "Precious Liquid Soap",
    image: "./images/liquid1.webp",
    keyWords: ["soap", "liquid"],
    description:
      "Gentle on hands, tough on dirt. Perfect for everyday cleaning with a refreshing scent and lasting freshness.",
  },
  {
    title: "Precious Essence",
    image: "./images/perfume 7.jpg",
    keyWords: ["essence", "precious", "perfume", "fragrance"],
    description:
      "A timeless fragrance crafted for elegance, confidence, and unforgettable presence.",
  },
  {
    title: "Precious Bath Glow",
    image: "./images/bathing 4.jpg",
    keyWords: ["bath", "glow", "skin"],
    description:
      "Nourish your skin with every wash. Gentle, radiant, and refreshing — for the glow you were born to shine.",
  },
  {
    title: "Precious Power Wash",
    image: "./images/power 2.webp",
    keyWords: ["power", "wash"],
    description:
      "Engineered for stains, made for families. Powerful, safe, and perfect for home or industrial use.",
  },
  {
    title: "Precious Pure Bleach",
    image: "./images/javel1.webp",
    keyWords: ["pure", "bleach"],
    description:
      "Gentle on fabrics, tough on dirt. Provides a pure, powerful clean that’s safe for your family and strong enough for heavy-duty use.",
  },
];

let search = document.getElementById("search");
let button = document.getElementById("searchb");

button.addEventListener("click", () => {
  let container = document.getElementsByClassName("search-section")[0];
  let html = "";
  let query = search.value.toLowerCase();

  products.forEach((item) => {
    if (
      item.keyWords.some((keyword) => keyword.toLowerCase().includes(query))
    ) {
      html += `
        <div class="product-card">
          <img src="${item.image}" data-aos="flip-right"  data-aos-duration="1900">
          <p data-aos="flip-right"  data-aos-duration="1900">${item.title}</p>
          <p data-aos="flip-right"  data-aos-duration="1900">${item.description}</p>
          <a href="payment.html"><button data-aos="flip-right"  data-aos-duration="1900">Buy Now</button></a>
        </div>
      `;
    }
  });

  // Handle no results
  if (html === "") {
    html = `<p style="text-align:center; color:red;">No products found. Try searching for "soap", "essence", or "bleach".</p>`;
  }

  container.innerHTML = html;
});
