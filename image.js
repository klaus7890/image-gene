const accessKey = "0jbmzVqy-PV9qMG33_Telkt4NqXeaKQVQnXEcwOISQ0";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result"); // Corrected the ID
const showMoreBtn = document.getElementById("show-more-btn"); // Corrected the ID

let keyword = "";
let page = 1;

async function searchImage() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      if(page === 1){
        searchResult.innerHTML = "";
      }

      const results = data.results;

      results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html; // Changed 'Links' to 'links'
        imageLink.target = "_blank";
        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
      });
      showMoreBtn.style.display = "block"//check here
    } else {
      console.error('Error fetching data from the API');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = ""; // Clear previous results
  searchImage();
});
 



showMoreBtn.addEventListener("click", ()=>{ //check here
    page++;
    searchImage();
})