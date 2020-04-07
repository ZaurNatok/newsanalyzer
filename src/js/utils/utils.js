import {showMoreButton} from '../constants/constants.js';

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
  weekAgoDate = weekAgo.getFullYear()+'-'+ (parseInt(weekAgo.getMonth()+1) < 10 ? '0' + parseInt(weekAgo.getMonth()+1) : parseInt(weekAgo.getMonth()+1)) +'-'+weekAgo.getDate();
  return weekAgoDate;
}

export let weekAgoDate = findWeekAgoDate();

// считаем количество совпадений искомой фразы в заголовках новостей за неделю

export function countHeadlines(headlines, phrase) {
  const regexp = new RegExp(`${phrase}`, `gi`);    
  const result = headlines.map(item => item.title.match(regexp));
  localStorage.setItem('headlinesResult', result.filter(function(x) {
    return x !== undefined && x !== null; 
}).length);
}

// показываем/скрываем кнопу "Показать еще"
export function showHideButtonShowMore(cards, counter) {
  if(counter + 3 >= (cards)) {
    showMoreButton.setAttribute('style', 'display:none');
  } else {
    showMoreButton.removeAttribute('style');  
  }
}