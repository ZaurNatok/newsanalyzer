export function dateFormat(date) {
    let articleDate = new Date(date);
    let month = articleDate.getMonth();
    
    switch (month)
    {
      case 0: month="января"; break;
      case 1: month="февраля"; break;
      case 2: month="марта"; break;
      case 3: month="апреля"; break;
      case 4: month="мая"; break;
      case 5: month="июня"; break;
      case 6: month="июля"; break;
      case 7: month="августа"; break;
      case 8: month="сентября"; break;
      case 9: month="октября"; break;
      case 10: month="ноября"; break;
      case 11: month="декабря"; break;
    }
    const res = articleDate.getDate() + ' ' + (month) + ', ' + articleDate.getFullYear();
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
  const res = analyticsDate.getDate() + ', ' + (day);
  return res;
}

// функция форматирования даты для header графика аналитики

export function dateAnalyticsGraphHeaderFormat(date) {

  let analyticsDate = new Date(date);
  let month = analyticsDate.getMonth() + 1;

  if(month === 0) {
    return 'ЯНВАРЬ';
  } if (month === 1) {
    return 'ФЕВРАЛЬ';
  } if (month === 2) {
    return 'МАРТ';
  } if (month === 3) {
    return 'АПРЕЛЬ';
  } if (month === 4) {
    return 'МАЙ';
  } if (month === 5) {
    return 'ИЮНЬ';
  } if (month === 6) {
    return 'ИЮЛЬ';
  } if (month === 7) {
    return 'АВГУСТ';
  } if (month === 8) {
    return 'СЕНТЯБРЬ';
  } if (month === 9) {
    return 'ОКТЯБРЬ';
  } if (month === 10) {
    return 'НОЯБРЬ';
  } if (month === 11) {
    return 'ДЕКАБРЬ';
  }
}

// форматируем дату для корректного запроса на сервер newsapi

export function formatCurrentDate(date) {
  let formattedCurrentDate = date.getFullYear()+'-'+ (parseInt(date.getMonth()+1) < 10 ? '0' + parseInt(date.getMonth()+1) : parseInt(date.getMonth()+1)) +'-'+date.getDate();
  return formattedCurrentDate;
}