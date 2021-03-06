import $ from 'jquery';
import obj from './store';
import api from './api';
import index from './index';

// user can expand and collapse bookmark info on main page
function expandCollapse(){
  $('main').on('click', '.js-collapsible', function(evt){
    evt.preventDefault();
    $(this).siblings('div').toggleClass('bookmark-btn-content-hidden');
  });
}

// when clicked from main page button will display generateAddBookmark template
function addNewBtn(){
  $('main').on('click', '#add-bookmark-btn', function(evt){
    evt.preventDefault();
    obj.store.adding = !obj.store.adding;
    //toggle value of adding on the store
    index.render(); //call render function   
  });
}

// will push bookmark 
function pushBookmark(){}

// handles user's submit from [ADD] bookmark button
function addNewBtnSubmit(){
  $('main').on('submit', '#js-add-bookmark', function(event){
    event.preventDefault();
    let data = {};
    let title = $('.js-bookmark-name').val(); //get value from input elements
    let desc = $('.js-bookmark-description').val();
    let rating = $('.js-bookmark-rating').val();
    let site = $('.js-bookmark-url').val();
    //console.log(title, site, desc, rating);
    //pass values into API call
    api.createBookmark(title, site, desc, rating);
    data.title = title;
    data.desc = desc;
    data.rating = rating;
    data.url = site;
    obj.store.bookmarks.push(data);
    //set adding to false
    obj.store.adding = !obj.store.adding;
    //render api.createBookmark();
    index.render();
  });
}

function cancelNewBtn(){
  $('main').on('click', '.btn-to-cancel' ,function(evt){
    evt.preventDefault();
    $('.add-bookmark-form').hide();
    obj.store.adding = !obj.store.adding;
    index.render();
  });
}


// user can edit/update an existing bookmark
function editBookmark(){}

// user can delete active bookamrk from bookmark list
function deleteBookmark(){}

// user can cancel editing/adding new bookmark and return to prior state
function cancelBtn(){}


// user can add new/updated bookmark info on submit button will append new bookmark to main page bookmark list
function submitBookmark(){}

// will alert user if input criterior is not met
function submitError(){}

// user can select input for bookmark's rating 
function addRating(){}

// user can select filter to display appropriate bookmarks
function filterBy(){
  $('main').on('change', '#filter-by-ratings', function(evt){
    evt.preventDefault();
  });
}

function bindEventListeners(){
  addNewBtn();
  addNewBtnSubmit();
  expandCollapse();
  cancelNewBtn();
  filterBy();
    
}

export default{
  bindEventListeners
};

