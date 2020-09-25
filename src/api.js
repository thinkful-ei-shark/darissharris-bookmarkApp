const BASE_URL = 'https://thinkful-list-api.herokuapp.com/dariss';

const getBookmarks = () => {
  return fetch(`${BASE_URL}/bookmarks`);
};

function createBookmark(title, url, desc, rating) {
//   console.log(title, url, desc, rating);
  fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, url, desc, rating})
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
}



export default{
  createBookmark,
  getBookmarks
};