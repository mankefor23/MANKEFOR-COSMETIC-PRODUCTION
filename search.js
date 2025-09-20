let products = [
  {
    title: "procious Liquid soap",
    image: "./images/liquid1.webp",
    keyWords: ["soap", "liquid"],
    description:
      "Gentle on hands, tough on dirt Perfect for everyday cleaning with a refreshing scent and lasting freshness.",
  },
  {
    title: "Precious Essence",
    image: "./images/perfume7.jpg",
    keyWords: ["essence", "precious", "perfume", "fragance"],
    description:
      "Precious Essence - a timless fragrance crafted for elegance, confidence, and unforgettable presence.",
  },
  {
    title: "Precious bath Glow",
    image: "./images/bathing4.jpg",
    keyWords: ["bath", "glow", "skin"],
    description:
      "Nourish your skin with every wash.Gentle, radiant, and refreshing - for the glow you were born to shine.",
  },
  {
    title: "Precious Power Wash",
    image: "./images/power2.webp",
    keyWords: ["power", "wash"],
    description:
      "Engineered on stains, made for families.Precious Power Wash is your trusted solution for tough stains - powerful, safe, and perfect for both home and industrial use.",
  },
  {
    title: "Precious Pure Bleach",
    image: "./images/javel1.webp",
    keyWords: ["pure", "bleach"],
    description:
      "Gentle on fabrics, tough on dirt.Precious Pur Wash delivers a pure, powerful clean that's safe for your family and strong enough for heavy-duty use. .",
  },
];

let search = document.getElementById("search");
let button = document.getElementById("searchb");

button.addEventListener("click", () => {
  let replace = document.getElementById("replace");
  let html = "";
  products.forEach((item) => {
    if (item.keyWords.includes(search.value)) {
      html += `
          <div class="tile">
                    <div class="tile-left">
                        <img width="500" height="390" img src=${item.image} data-aos="fade-down" data-aos-delay="900">
                    </div>
                    <div class="tile-right">
                        <h1 class="tile-header" data-aos="flip-left"><i >${item.title}</i></h1>
                        <p class="tile-paragraph" data-aos="flip-left"><i>${item.description}</i></p>
                        <p class="tile-paragraph"data-aos="flip-left"><i>"Perfect for everyday cleaning with a refreshing scent and lasting freshness."</i></p>
                        <br>
                      <a href="precious liquid.html"><button class="tile-btn" data-aos="flip-left">Learn more</button></a>
                    </div>
            </div>
      `;
    }
  });

  replace.innerHTML = html;
  console.log(replace);
});

// function renderPage() {}
// Page();
