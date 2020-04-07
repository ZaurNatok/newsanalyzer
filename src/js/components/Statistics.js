import {currentDate, totalResult, analyticsKeyword, totalHeadlineResult, graphHeaderMonth} from '../constants/constants.js';
import {dateAnalyticsFormat, dateFormat, dateAnalyticsGraphHeaderFormat} from '../utils/dateFormat.js';

export class Statistics {
    constructor(localNews) {
        this.localNews = JSON.parse(localNews);
        this.findWeekDates();
        this.localStorages();
    }

    // Функция построения данных для графика аналитики
    findWeekDates() {
        for(let i = 0; i < 7; i++) {
            let weekDates = currentDate;
            const newsCount = this._countHeadlinesByDay(this.localNews.articles, localStorage.getItem('keyword'), weekDates);
            const newsPercent = (newsCount * 100 / localStorage.getItem('headlinesResult'));
            this._makeGraph(weekDates, newsCount, newsPercent);
            weekDates = currentDate.setDate(currentDate.getDate() - 1)
        }
      }

    // Функция создания HTML разметки графика аналитики
    _makeGraph(day, newsCount, percent) {
        const graphContainerY = document.querySelector('.analytics-graph__y');
        const graphContainerX = document.querySelector('.analytics-graph__x');

        const dayColumnY = document.createElement('p');
        const dataColumnX = document.createElement('p');

        dayColumnY.classList.add('analytics-graph__column-y');
        dataColumnX.classList.add('analytics-graph__column-x');

        graphContainerY.appendChild(dayColumnY);
        graphContainerX.appendChild(dataColumnX);

        dayColumnY.textContent = dateAnalyticsFormat(day);
        dataColumnX.textContent = newsCount;
        if(isNaN(percent)) {
            dataColumnX.setAttribute('style', 'width:1.2%;')
        } else {
            dataColumnX.setAttribute('style', 'width:' + percent + '%' + ';')
        }
        
    }

    // считаем количество совпадений искомой фразы в заголовках новостей за неделю по дням
    _countHeadlinesByDay(news, phrase, date) {
        const regexp = new RegExp(`${phrase}`, `gi`);
        const byDate = news.map(item => ((dateFormat(item.publishedAt) == dateFormat(date))) && item.title.match(regexp));
        const resultByDate = byDate.filter(function(x) {
        return x !== false && x !== null; 
        });
    return resultByDate.length;
    }

    // Заполняем данными аналитику из локального хранилища
    localStorages() {
        totalResult.textContent = localStorage.getItem('totalResult'); // количество новостей за неделю всего
        analyticsKeyword.textContent = localStorage.getItem('keyword'); // ключевое слово
        totalHeadlineResult.textContent = localStorage.getItem('headlinesResult'); // количество вхождений ключевого слова в заголовках новостей
        graphHeaderMonth.textContent = dateAnalyticsGraphHeaderFormat(currentDate); // форматирование текущего месяца для вывода в header графика
    }
}