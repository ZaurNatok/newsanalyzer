import {findWeekAgoDate, renderLoading, searchInputLock, countHeadlines, searchInputUnlock, showHideButtonShowMore} from '../utils/utils.js';
import {container, createnewscard} from '../../index.js';
import {ROW_CARDS_COUNT} from '../constants/constants.js';


export class NewsCardList {
    constructor(api, phrase, currentDate, weekAgoDate) {
        this.api = api;
        this.phrase = phrase;
        this.currentDate = currentDate;
        this.weekAgoDate = weekAgoDate;
        this.renderNews = this.renderNews.bind(this);
        this.counterShowNewsStart = 0;
    }

    loadNews(phrase) {
        this.counterShowNewsStart = 0;
        document.querySelector('.news__not-found').setAttribute('style', 'display:none');
        document.querySelector('.news__error').setAttribute('style', 'display:none');
        findWeekAgoDate();
        // запускаем лоадер
        renderLoading(true);
        // блокируем поле input формы поиска новостей
        searchInputLock();
        // сохраняем искомую фразу в локальном хранилище
        localStorage.setItem('keyword', phrase);
        // стираем старые новости в результатах выдачи
        container.textContent = '';

        // запрос к серверу NewsApi
        this.api.getNews(phrase, this.currentDate, this.weekAgoDate)
        .then((data) => {
            localStorage.setItem('totalResult', data.totalResults); // сохраняем в локальном хранилище количество новостей для вывода на странице аналитики
            localStorage.setItem('newsCards', JSON.stringify(data)); // сохраняем в локальном хранилище объект в формате JSON с массивом новостей для отрисовки новостей по последнему запросу на главной без запроса к серверу
            countHeadlines(data.articles, phrase); // запускаем функцию подсчета количества вхождений искомой фразы в заголовки для вывода на странице аналитики
            // отрисовываем карточки новостей
            renderLoading(false);
            // если новостей нет - выводим соответствующий блок "Ничего не найдено"
                if(data.articles.length === 0) {
                    document.querySelector('.news__not-found').setAttribute('style', 'display:block');
                    document.querySelector('.news__error').setAttribute('style', 'display:none');
                } else {
                    document.querySelector('.news__not-found').setAttribute('style', 'display:none');
                }
            })

            .then(() => {
                this.renderNews(JSON.parse(localStorage.newsCards));
            })

            // если во время запроса произошла ошибка - выводим блок с ошибкой для пользователя

            // разблокируем поле input формы поиска новостей 
            .finally(() => {
				searchInputUnlock();
			});
    }

    renderNews(data) {
        for(let i = this.counterShowNewsStart; i < this.counterShowNewsStart + ROW_CARDS_COUNT; i++) {
            if(data.articles[i]) {
                createnewscard.createCard(data.articles[i].title, data.articles[i].urlToImage, data.articles[i].url, data.articles[i].description, data.articles[i].publishedAt, data.articles[i].source.name);
            }
        }
        showHideButtonShowMore(data.articles.length, this.counterShowNewsStart);
    }

    loadMore(cards) {
        this.counterShowNewsStart += ROW_CARDS_COUNT;
        this.renderNews(cards);
    }
}