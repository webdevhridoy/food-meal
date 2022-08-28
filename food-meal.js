const loadMeals = (searchMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = "";
  meals.forEach((meal) => {
    console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
      <div class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">Title: ${meal.strMeal}</h5>
              <p class="card-text">Category: ${meal.strCategory}</p>
              <button onclick="viewDetails(${meal.idMeal})" class="btn btn-outline-secondary">View details</button>
          </div>
      </div>
      
      `;
    mealContainer.appendChild(mealDiv);
  });
};

const findMeals = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadMeals(searchText);
};

const viewDetails = (idMeal) => {
  console.log(idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayViewDetails(data.meals[0]));
};

const displayViewDetails = (meal) => {
  //   console.log(meal);
  const mealModalContainer = document.getElementById("meal-modal");
  mealModalContainer.innerHTML = "";
  const mealModal = document.createElement("div");
  mealModal.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"> ${meal.strMeal}</h5>
      <p class="${meal.strCategory}</p>
    </div>
  </div>
      
      `;
  mealModalContainer.appendChild(mealModal);
};

viewDetails();

loadMeals("chicken");
