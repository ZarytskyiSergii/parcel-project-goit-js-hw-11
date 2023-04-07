const Mustache = require('mustache');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photoCardTemplate from '../src/js/markup-template';
import PhotoApiService from '../src/js/photo-api-service';

const photoCards = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

const photoApiService = new PhotoApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onloadMore);

function onSearch(evt) {
  evt.preventDefault();
  clearPhotoCards();
  photoApiService.query = evt.currentTarget.elements.searchQuery.value;
  if (photoApiService.query === '') {
    return Notiflix.Notify.warning('Enter text in the search bar please');
  }
  loadMoreBtn.style.display = 'block';
  photoApiService.resetPage();
  photoApiService.fetchPhotoCards().then(appendPhotoHits);
}

function onloadMore() {
  photoApiService.fetchPhotoCards().then(appendPhotoHits);
}

function appendPhotoHits(data) {
  const renderedCard = Mustache.render(photoCardTemplate, data);
  photoCards.insertAdjacentHTML('beforeend', renderedCard);

  const lightbox = new SimpleLightbox('.gallery a', {
    caption: true,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    swipeClose: true,
    animationSpeed: 300,
  });
  lightbox.refresh();
}

function clearPhotoCards() {
  photoCards.innerHTML = '';
}