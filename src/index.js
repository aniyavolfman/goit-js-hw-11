const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css'; 

let gallery = new SimpleLightbox('.gallery a');

const URL_DEFAULT = 'https://pixabay.com/api/?key=32728160-634e7d154d1682a06810c8278';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const divGalleryEl = document.querySelector('.gallery');


formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    getUser(inputEl.value);
    event.currentTarget.reset();
}

async function getUser(keyWord) {
    try {
    const response = await axios.get(`${URL_DEFAULT}&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true`);

    if (response.data.hits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    console.log(response.data.hits)
        renderGallery(response.data.hits);

    } catch (error) {
    console.error(error);
    }
}

function renderGallery (images) {
    const markup = images.map((image) => {
        return `
        <div class="photo-card">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
            <p class="info-item">
            <b>Likes</b>
            ${image.likes}
            </p>
            <p class="info-item">
            <b>Views</b>
            ${image.views}
            </p>
            <p class="info-item">
            <b>Comments</b>
            ${image.comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>
            ${image.downloads}
            </p>
            </div>
        </div>
        `;
    }).join('');
    divGalleryEl.innerHTML = markup;
    gallery.refresh();
}


gallery.on('show.simplelightbox', function () {
    gallery.options.captionsData = 'alt';
    gallery.options.captionDelay = 250;
    gallery.options.scrollZoom = false;
    gallery.options.scrollZoomFactor = 0;
});
    

