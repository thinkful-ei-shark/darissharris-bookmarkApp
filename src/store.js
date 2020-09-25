const store = {
  bookmarks: [
    
  ],
  adding: false,
  error: null,
  filter: 0
};

function addBookmark(bookmark){
  store.bookmarks.push(bookmark);
}

export default{
  store,
  addBookmark
};