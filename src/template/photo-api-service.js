import axios from 'axios';
import Notiflix from 'notiflix';
const loadMoreBtn = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35183230-5628575ab7ac6e17ab56e8c48';

export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPhotoCards() {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: this.page,
        },
      });
      const data = response.data;
      if (data.hits.length === 0) {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        this.incrementPage();
        const totalHits = data.totalHits;
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}