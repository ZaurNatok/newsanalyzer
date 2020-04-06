export function dateFormat(date) {
    let articleDate = new Date(date);
    let month = articleDate.getMonth();
    
    switch (month)
    {
      case 0: month="января"; break;
      case 1: month="февраля"; break;
      case 2: month="марта"; break;
      case 3: month="апреля"; break;
      case 4: month="мае"; break;
      case 5: month="июня"; break;
      case 6: month="июля"; break;
      case 7: month="августа"; break;
      case 8: month="сентября"; break;
      case 9: month="октября"; break;
      case 10: month="ноября"; break;
      case 11: month="декабря"; break;
    }
    let res = articleDate.getDate() + ' ' + (month) + ', ' + articleDate.getFullYear();
    return res;
}

// функция форматирования даты для графика аналитики

export function dateAnalyticsFormat(date) {
  let analyticsDate = new Date(date);
  let day = analyticsDate.getDay();
  
  switch (day)
  {
    case 1: day="пн"; break;
    case 2: day="вт"; break;
    case 3: day="ср"; break;
    case 4: day="чт"; break;
    case 5: day="пт"; break;
    case 6: day="сб"; break;
    case 0: day="вс"; break;
  }
  let res = analyticsDate.getDate() + ', ' + (day);
  return res;
}

// функция форматирования даты для header графика аналитики

export function dateAnalyticsGraphHeaderFormat(date) {
  let analyticsDate = new Date(date);
  let month = analyticsDate.getMonth() + 1;
  
  switch (month)
  {
    case 0: month="Январь"; break;
    case 1: month="Февраль"; break;
    case 2: month="Март"; break;
    case 3: month="Апрель"; break;
    case 4: month="Май"; break;
    case 5: month="Июнь"; break;
    case 6: month="Июль"; break;
    case 7: month="Август"; break;
    case 8: month="Сентябрь"; break;
    case 9: month="Октябрь"; break;
    case 10: month="Ноябрь"; break;
    case 11: month="Декабрь"; break;
  }
  let res = (month);
  return res;
}