$(document).ready(function () {
  var searchresult = $(".content__search-result");
  var container = $(".container");
  var app_id = "08703528";
  var app_key = "b02c044df3eaf1d3e7ba48d8af88bc23";

  $(".form").submit((event) => {
    event.preventDefault();

    var search = $(".input-data").val();
    console.log(search);

    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${search}&app_id=${app_id}&app_key=${app_key}&to=21`
        );
        const data = await response.json();
        htmlcodes(data.hits);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

    function htmlcodes(results) {
      let htmlgen = "";
      results.map((data) => {
        let ingrid = data.recipe.ingredientLines;
        let ingredients = "";
        let i;
        for (i = 0; i <= ingrid.length; i++) {
          ingredients += ingrid[i] + ",";
        }
        console.log(ingredients);
        htmlgen += `<div class="item">
        <img src="${data.recipe.image}" />
        <div class="flex-container">
          <div class="flex-container__title">
            <h1>${data.recipe.label}</h1>
          </div>
          <div class="flex-container__button">
          <a href="${
            data.recipe.url
          }"><button class="button">view Recipe</button></a>
          </div>
        </div>

        <div class="recipeinfo">
        <p><b>Cuisine Type:</b>${data.recipe.cuisineType}</p>
          <p><b>Colories:</b>${data.recipe.calories.toFixed(2)}</p>
          <p><b>Ingredients:</b>${ingredients}</p>
        </div>
      </div>`;
      });
      searchresult.html(htmlgen);
    }
  });
});
