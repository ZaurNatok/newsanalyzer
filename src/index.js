import "./pages/index.css";
import "./fonts/fonts.css";
import "./vendor/normalize.css";
import {findWeekAgoDate} from './js/utils/utils.js';
import {currentDate, showMoreButton} from './js/constants/constants.js';
import {SearchInput} from './js/components/SearchInput.js';
import {NewsCardList} from './js/components/NewsCardList.js';
import {NewCard} from './js/components/NewCard.js';
import {NewsApi} from './js/modules/NewsApi.js';

const api = new NewsApi({
  baseUrl: 'https://newsapi.org/v2/everything?',
  apiKey: 'e0d4edaf7bc24c56befea2a3b9e45f82',
  lang: 'ru'
  })

const searchForm = document.forms.search; // Форма поиска новостей
document.forms.search.elements.phrase.value = localStorage.getItem('keyword');
export const container = document.querySelector('.news__items'); // Секция результатов поиска новостей
export const searchInput = document.forms.search.elements.phrase;
export let phrase = document.forms.search.elements.phrase.value;
export const createnewscard = new NewCard(container);
export const cardlist = new NewsCardList(api, phrase, currentDate, findWeekAgoDate());
const search = new SearchInput(phrase);

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  phrase = document.forms.search.elements.phrase.value;
  search.validateForm(phrase); // проверяем: введена поисковая фраза или нет
});

// Если в локальном хранилище есть ранее загруженные новости - отрисовываем их на главной, без запроса к серверу
window.onload = () => {
  if(localStorage.getItem('newsCards') === null) {
    console.log('хранилище пустое');
  }
  else {
    cardlist.renderNews(JSON.parse(localStorage.newsCards)); // если в локальном хранилище есть новости - выводим без обращения к серверу
  }
}

showMoreButton.addEventListener('click', function() {
    cardlist.loadMore(JSON.parse(localStorage.newsCards));
});