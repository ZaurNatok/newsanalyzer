import "./pages/index.css";
import "./fonts/fonts.css";
import "./vendor/normalize.css";
import {findWeekAgoDate} from './js/utils/utils.js';
import {currentDate, showMoreButton, totalResult} from './js/constants/constants.js';
import {SearchInput} from './js/components/SearchInput.js';
import {NewsCardList} from './js/components/NewsCardList.js';
import {NewsCard} from './js/components/NewsCard.js';
import {NewsApi} from './js/modules/NewsApi.js';
import {formatCurrentDate} from './js/utils/dateFormat.js'

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
export const createNewsCard = new NewsCard(container);
export const cardList = new NewsCardList(api, phrase, formatCurrentDate(currentDate), findWeekAgoDate());
export const search = new SearchInput(phrase);
export const searchButton = document.querySelector('.search__button');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  phrase = document.forms.search.elements.phrase.value;
  search.validateForm(phrase); // проверяем: введена поисковая фраза или нет
});

// Если в локальном хранилище есть ранее загруженные новости - отрисовываем их на главной, без запроса к серверу
window.onload = () => {
  if(localStorage.getItem('newsCards') === null) {
    console.log('хранилище пустое');
    document.querySelector('.news__result').setAttribute('style', 'display:none;');
  }
  else {
    document.querySelector('.news__result').setAttribute('style', 'display:none;');
    cardList.renderNews(JSON.parse(localStorage.getItem('newsCards'))); // если в локальном хранилище есть новости - выводим без обращения к серверу
  }
}

showMoreButton.addEventListener('click', function() {
    cardList.loadMore(JSON.parse(localStorage.getItem('newsCards')));
});

totalResult.textContent = localStorage.getItem('totalResult');