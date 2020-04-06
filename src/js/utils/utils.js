import {searchInput} from '../../index.js';
import {showMoreButton} from '../constants/constants.js';

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

// показываем/скрываем кнопу "Показать еще"
export function showHideButtonShowMore(cards, counter) {
  if(counter + 3 >= (cards)) {
    showMoreButton.setAttribute('style', 'display:none');
  } else {
    showMoreButton.removeAttribute('style');  
  }
}