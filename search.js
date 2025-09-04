let products = [
  {
    title: "procious Liquid soap",
    image: "./images/liquid1.webp",
    keyWords: ["soap", "liquid"],
    description:
      "Gentle on hands, tough on dirt Perfect for everyday cleaning with a refreshing scent and lasting freshness.",
  },
  {},
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
});

function renderPage() {}
