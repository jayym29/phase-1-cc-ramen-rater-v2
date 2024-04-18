const url = 'http://localhost:3000/ramens';
const ramenDetailNameElem = document.querySelector('.name');
const ramenDetailRestaurantElem = document.querySelector('.restaurant');
const ramenDetailedImageElem = document.querySelector('.detail-image');
const ratingDisplayElem = document.querySelector('#rating-display');
const commentDisplayElem = document.querySelector('#comment-display');
const ramenMenuElem = document.querySelector('#ramen-menu');
const ramenFormElem = document.querySelector('#new-ramen');

function fetchRamens() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.id = ramen.id;
        img.addEventListener('click', handleRamenClick);
        ramenMenuElem.appendChild(img);
      });
    });
}

function handleRamenClick(event) {
  const ramenId = event.target.dataset.id;
  fetch(`${url}/${ramenId}`)
    .then(response => response.json())
    .then(data => {
      displayRamenDetails(data);
    });
}

function displayRamenDetails(ramen) {
  ramenDetailNameElem.textContent = ramen.name;
  ramenDetailRestaurantElem.textContent = ramen.restaurant;
  ratingDisplayElem.textContent = ramen.rating;
  commentDisplayElem.textContent = ramen.comment;
  ramenDetailedImageElem.src = ramen.image;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newRamen = {
    name: formData.get('name'),
    restaurant: formData.get('restaurant'),
    image: formData.get('image'),
    rating: formData.get('rating'),
    comment: formData.get('newComment'),
  };
  saveNewRamen(newRamen);
  e.target.reset(); 
}

async function saveNewRamen(ramen) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ramen),
    });
    const data = await response.json();
    displayNewRamen(data);
  } catch (error) {
    console.error('Error saving new ramen:', error);
  }
}

function displayNewRamen(ramenObj) {
  const img = document.createElement('img');
  img.src = ramenObj.image;
  img.alt = ramenObj.name;
  img.dataset.id = ramenObj.id;
  img.addEventListener('click', handleRamenClick);
  ramenMenuElem.appendChild(img);
}

function startApp() {
  fetchRamens();
  ramenFormElem.addEventListener('submit', handleFormSubmit);
}

window.addEventListener('DOMContentLoaded', startApp);