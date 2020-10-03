import $ from 'jquery';
import './mains.css';

import obj from './store';
import api from './api';
import events from './events';
import store from './store';


// User sees initially form where Bookmarks live
function generateBookmarksPage(){
  return `<div class="bookmark-container">
  <div class="add-filter-section">
    <button name="add-bookmark-btn" type="button" id="add-bookmark-btn">Add</button>
      <form action="">
        
            <select name="filter-by-ratings" id="filter-by-ratings" aria-placeholder="Filter By">
// on('change', '.className', function)
                <option class="filtered-by" value disabled selected hidden>Filter By</option>
                <option class="filtered-by" value="0">All</option>
                <option class="filtered-by" value="1">1+ Ratings</option>
                <option class="filtered-by" value="2">2+ Ratings</option>
                <option class="filtered-by" value="3">3+ Ratings</option>
                <option class="filtered-by" value="4">4+ Ratings</option>
            </select>
      </form> ${generateBookmarks()}`;
}


function generateBookmarks(){
  let bookmarkPage = '';
  for (let i = 0; i < obj.store.bookmarks.length; i++){
    console.log(i);
    if (obj.store.bookmarks[i].rating >= obj.store.filter){
      bookmarkPage += `
        <section class="expand-collapse js-expand-collapse">
            <button type="button" class="collapsible js-collapsible">${obj.store.bookmarks[i].title}   
            Rating:${obj.store.bookmarks[i].rating}</button>
                <div class="bookmark-btn-content expandable bookmark-btn-content-hidden">
                  <h4 class="btn-to-link js-btn-to-link"><a href="${obj.store.bookmarks[i].url}" title="Go to bookmark">Visit Site</a></h4>
                        <p class="rating">Rating: ${obj.store.bookmarks[i].rating}</p>
                        <p>${obj.store.bookmarks[i].desc}</p>
                  <button type="button" class="btn-to-edit"></button>
                </div>
        </section>
        `;
    }
  }
  return `<div>${bookmarkPage}</div>`;
}


// // User can [ADD] bookmarks to Bookmarks list
function generateAddBookmark(){
  let addBookmark = `
    <div class="add-bookmark-form">
            <form action="" class="new-bookmark-form" method="post" id="js-add-bookmark">
                
              <div class="bookmark-link">
                <label class="bookmark-url" for="bookmark-url">URL:</label>
                <input class="js-bookmark-url" id="bookmark-url" type="url" name="url" required>
              </div>
                <br>
              <div class="bookmark-title">
                <label class="bookmark-name" for="bookmark-name">Title:</label>
                <input class="js-bookmark-name" id="bookmark-name" type="text" name="name" required>
              </div>
              
            
            <div class="star-rating-icons">
                <p>Rating</p>
              <select name="bookmark-rating" class="js-bookmark-rating bookmark-rating" id="js-bookmark-rating" aria-placeholder="Rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
                
              <div class="bookmark-desc">
                <label for="bookmark-description"></label>
                <textarea class="js-bookmark-description" id="bookmark-description" name="description" required maxlength="65" rows="4" cols="50" placeholder="Bookmark Description"></textarea>
              </div>
              <br>
                <button type="reset" class="btn-to-cancel">Cancel</button>
                <button type="submit" class="btn-to-submit">ADD</button>

            </form>
        </div> `;
  return addBookmark;
}

function generateEditBookmark(){
  let editBookmark = `
    <div class="edit-bookmark-form">
            <form action="" method="post">
                
                <label for="bookmark-name">Edit Bookmark:</label>
                <input id="bookmark-name" type="text" name="name" required>
              
            
            <div class="star-rating-icons">
                <p>Rate Bookmark:</p>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </div>
                
                <label for="bookmark-description"></label>
                <textarea id="bookmark-description" name="description" required maxlength="200" placeholder="Add Bookmark Description">${obj.store.bookmarks.description}</textarea>

                <button type="button" class="btn-to-cancel">Cancel</button>
                <button type="submit" class="btn-to-submit">Submit</button>

            </form>
        </div> `;
}

function render(){
  let page = '';
  if(!obj.store.adding){
    page += generateBookmarksPage();
  } else {
    page += generateAddBookmark();
  } 

  $('main').html(page);
}


function main() {
  events.bindEventListeners();
  api.getBookmarks()
    .then(response => response.json())
    .then(responseJson => {
      responseJson.forEach(function(bookmark){
        store.addBookmark(bookmark);
      });
      render();
    }
    );
}

export default{
  render
};

$(main);