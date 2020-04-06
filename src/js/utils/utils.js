import {createnewscard} from '../../index.js';
import {cardlist} from '../../index.js';
import {searchInput} from '../../index.js';
import {showMoreButton} from '../constants/constants.js';

// // функция форматирования даты для графика аналитики

// export function dateAnalyticsFormat(date) {
//   let analyticsDate = new Date(date);
//   let day = analyticsDate.getDay();
  
//   switch (day)
//   {
//     case 1: fDay="пн"; break;
//     case 2: fDay="вт"; break;
//     case 3: fDay="ср"; break;
//     case 4: fDay="чт"; break;
//     case 5: fDay="пт"; break;
//     case 6: fDay="сб"; break;
//     case 0: fDay="вс"; break;
//   }
//   let res = analyticsDate.getDate() + ', ' + (fDay);
//   return res;
// }

// функция форматирования даты для header графика аналитики

// export function dateAnalyticsGraphHeaderFormat(date) {
//   let analyticsDate = new Date(date);
//   let month = analyticsDate.getMonth() + 1;
  
//   switch (month)
//   {
//     case 0: fMonth="Январь"; break;
//     case 1: fMonth="Февраль"; break;
//     case 2: fMonth="Март"; break;
//     case 3: fMonth="Апрель"; break;
//     case 4: fMonth="Май"; break;
//     case 5: fMonth="Июнь"; break;
//     case 6: fMonth="Июль"; break;
//     case 7: fMonth="Август"; break;
//     case 8: fMonth="Сентябрь"; break;
//     case 9: fMonth="Октябрь"; break;
//     case 10: fMonth="Ноябрь"; break;
//     case 11: fMonth="Декабрь"; break;
//   }
//   let res = (fMonth);
//   return res;
// }

// доп. функция форматирования даты - добавляем нолик перед номером месяца если он меньше 10 для корректного отображения

export function addZero(number) {
    if(number<10) {
      return '0' + number
    }
    else {
      return number;
    }
  }

// Лоадер

export function renderLoading(isLoading) {
    if(isLoading) {
      document.querySelector('.loading').setAttribute('style', 'display:block');
      document.querySelector('.news__result').setAttribute('style', 'display:none');
    }
    else {
      document.querySelector('.loading').setAttribute('style', 'display:none');
    }
  }

  // Функция отсчета даты на неделю назад от текущей



  export function findWeekAgoDate() {
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6);
    weekAgoDate = weekAgo.getFullYear()+'-'+ addZero(parseInt(weekAgo.getMonth()+1)) +'-'+weekAgo.getDate();
    return weekAgoDate;
  }

  export let weekAgoDate = findWeekAgoDate();

  // считаем количество совпадений искомой фразы в заголовках новостей за неделю

  export function countHeadlines(headlines, phrase) {
    let regexp = new RegExp(`${phrase}`, `gi`);    
    let result = headlines.map(item => item.title.match(regexp));


    localStorage.setItem('headlinesResult', result.filter(function(x) {
      return x !== undefined && x !== null; 
  }).length);
  }

  // блокирова поля ввода input на время запроса к серверу и его разблокировка после получения ответа

  export function searchInputLock() {
    searchInput.setAttribute('disabled', true);
  }

  export function searchInputUnlock() {
    searchInput.removeAttribute('disabled');
  }

    // постепенная подгрузка новостей
   export let counterShowNewsStart = 0;
   export let counterShowNewsEnd = 3;
  
  export function loadMore(cards) {
    counterShowNewsStart += 3;
    counterShowNewsEnd += 3;
    cardlist.renderNews(cards);
  }

  // показываем/скрываем кнопу "Показать еще"
  export function showHideButtonShowMore(cards) {
    if(counterShowNewsEnd >= (cards)) {
      showMoreButton.setAttribute('style', 'display:none');
    } else {
      showMoreButton.removeAttribute('style');  
    }
  }

  // Вывод новостей из локального хранилища
  
  export function localCardsLoad() {
    let localCards = JSON.parse(localStorage.newsCards); // массив новостей из локального хранилища
    for(let i = counterShowNewsStart; i < counterShowNewsEnd; i++) {
      if(localCards.articles[i]) {
        createnewscard.createCard(localCards.articles[i].title, localCards.articles[i].urlToImage, localCards.articles[i].url, localCards.articles[i].description, localCards.articles[i].publishedAt, localCards.articles[i].source.name)
      } 
    }
    showHideButtonShowMore(localCards.articles.length);
  }
