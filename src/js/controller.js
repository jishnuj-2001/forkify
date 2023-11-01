
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';




// const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2
//2760f835-c23b-47e7-b1f1-f8d16e848bfe

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function(){
  
  try{
    
    const id = window.location.hash.slice(1)
    // console.log(id)
    if(!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)
    //load recipe
    await model.loadRecipe(id)

    //Rendering the recipe
    recipeView.render(model.state.recipe)
    //TEST

  }catch(err){
    recipeView.renderError()
    console.error(err)
  }
 
}
const controlSearchResults = async function(){
  try{
    
    //get search query
    const query = searchView.getQuery();
    if(!query) return;
    resultsView.renderSpinner()
    //load search results
    await model.loadSearchResults(query);
    console.log(model.state.search.results)
    resultsView.render(model.getSearchResultsPage())
    //Render initial pagination
    paginationView.render(model.state.search)
  }catch(err){
    console.log(err)
  }
}
// controlSearchResults();
const controlPagination = function(goToPage){
  console.log(goToPage)
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage))
  //Render new pagination
  paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  //Update the recipe servings in state
  model.updateServings(newServings)
  //Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function(){
  //Add or Remove a bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)
  console.log(model.state.recipe)
  //Render recipe view
  recipeView.update(model.state.recipe)
  //Render Bookmarks
  bookmarksView.render(model.state.bookmarks)
}
const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){
  try{

    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe)
    recipeView.render(model.state.recipe)
    addRecipeView.renderMessage();
    //Render bookmart view
    bookmarksView.render(model.state.bookmarks)
    //Chnage id in the url
    window.history.pushState(null, '',`#${model.state.recipe.id}`)
    setTimeout( function(){
      addRecipeView.toggleWindow();
    },MODAL_CLOSE_SEC * 1000)
  }catch(err){
   alert(err.message);
  }
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init();
