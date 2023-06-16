import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) module.hot.accept(); //parcel - hot module reload

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 1. Mark selected result as active
    ////////////////////////////////////
    resultsView.update(model.getSearchResultsPage());
    // 2. Updating bookmarks view
    //////////////////////////////
    bookmarksView.update(model.state.bookmarks);

    // 3. Loading Recipe
    ////////////////////
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 4. Rendering recipe
    //////////////////////
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1. Get search query
    //////////////////////
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    /////////////////////////
    await model.loadSearchResults(query);
    // resultsView.render(model.state.search.results); // no page control

    // 3. Rendering results
    ///////////////////////
    resultsView.render(model.getSearchResultsPage());

    // 3. Rendering initial pagination buttons
    //////////////////////////////////////////
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  // 1. Rendering new results
  ///////////////////////////
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 3. Rendering new pagination button
  /////////////////////////////////////
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1. Update recipe servings (in state)
  ///////////////////////////////////////
  model.updateServings(newServings);

  // 2. Update recipe view
  ////////////////////////
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/remove bookmark
  /////////////////////////
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update recipe view
  ////////////////////////
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  //////////////////////
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // 0. Show loading spinner
    //////////////////////////
    addRecipeView.renderSpinner();

    // 1. Upload the new recipe data
    ////////////////////////////////
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // 2. Render recipe
    ///////////////////
    recipeView.render(model.state.recipe);

    // 3. Success message
    /////////////////////
    addRecipeView.renderMessage();

    // 4. Render bookmark view
    //////////////////////////
    bookmarksView.render(model.state.bookmarks);

    // 5. Change ID in the URL
    //////////////////////////
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // 4. Close form window
    ///////////////////////
    setTimeout(() => addRecipeView.toggleWindow(), MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
