import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a');

const URL_DEFAULT =
  'https://pixabay.com/api/?key=32728160-634e7d154d1682a06810c8278';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const divGalleryEl = document.querySelector('.gallery');
const buttonMoreEl = document.querySelector('.load-more');
const alertEl = document.querySelector('.text');

let page = 1;
let keyValue = '';
let totalPages = 0;

formEl.addEventListener('submit', onFormSubmit);
buttonMoreEl.addEventListener('click', onButtonClick);

getRandomImg();

function onFormSubmit(event) {
  event.preventDefault();

  keyValue = inputEl.value;

  resetPage();
  divGalleryEl.innerHTML = '';
  alertEl.classList.add('hidden');

  if (keyValue.trim() === '') {
    Notify.info('Oops! Please, enter smth to search.');
    buttonMoreEl.classList.add('hidden');
    return;
  }

  getImg(keyValue);

  event.currentTarget.reset();
}

function onButtonClick() {
  getImg(keyValue);
}

async function getRandomImg() {
  try {
    const response = await axios.get(
      `${URL_DEFAULT}&editors_choice=true&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
    );
    renderGallery(response.data.hits);
  } catch (error) {
    console.log(error);
  }
}

async function getImg(keyWord) {
  try {
    const response = await axios.get(
      `${URL_DEFAULT}&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );

    if (response.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      buttonMoreEl.classList.add('hidden');
      alertEl.classList.add('hidden');
      return;
    }

    if (page === 1) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }

    buttonMoreEl.classList.remove('hidden');
    totalPages = Math.ceil(response.data.totalHits / 40);

    renderGallery(response.data.hits);
    page += 1;

    if (page > totalPages) {
      return toogleAlertMarkup();
    }
  } catch (error) {
    console.error(error);
  }
}

function renderGallery(images) {
  const markup = images
    .map(image => {
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
    })
    .join('');
  divGalleryEl.insertAdjacentHTML('beforeend', markup);

  if (page > 1) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  gallery.refresh();
}

gallery.on('show.simplelightbox', function () {
  gallery.options.captionsData = 'alt';
  gallery.options.captionDelay = 250;
  gallery.options.scrollZoom = false;
  gallery.options.scrollZoomFactor = 0;
});

function resetPage() {
  page = 1;
}

function toogleAlertMarkup() {
  alertEl.classList.remove('hidden');
  buttonMoreEl.classList.add('hidden');
}
