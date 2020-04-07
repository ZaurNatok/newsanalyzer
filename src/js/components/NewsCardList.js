import {findWeekAgoDate, renderLoading, countHeadlines, showHideButtonShowMore} from '../utils/utils.js';
import {container, createNewsCard, search} from '../../index.js';
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
        search.searchInputLock();
        // стираем старые новости в результатах выдачи
        container.textContent = '';
        // запрос к серверу NewsApi
        this.api.getNews(phrase, this.currentDate, this.weekAgoDate)
        .then((news) => {
            // сохраняем искомую фразу в локальном хранилище
            localStorage.setItem('keyword', phrase);
            localStorage.setItem('totalResult', news.totalResults); // сохраняем в локальном хранилище количество новостей для вывода на странице аналитики
            localStorage.setItem('newsCards', JSON.stringify(news)); // сохраняем в локальном хранилище объект в формате JSON с массивом новостей для отрисовки новостей по последнему запросу на главной без запроса к серверу
            countHeadlines(news.articles, phrase); // запускаем функцию подсчета количества вхождений искомой фразы в заголовки для вывода на странице аналитики
            // отрисовываем карточки новостей
            renderLoading(false);
            // если новостей нет - выводим соответствующий блок "Ничего не найдено"
                if(news.articles.length === 0) {
                    document.querySelector('.news__not-found').setAttribute('style', 'display:block');
                    document.querySelector('.news__error').setAttribute('style', 'display:none');
                } else {
                    document.querySelector('.news__not-found').setAttribute('style', 'display:none');
                }
            })
            .then(() => {
                this.renderNews(JSON.parse(localStorage.getItem('newsCards')));
            })

            // если во время запроса произошла ошибка - выводим блок с ошибкой для пользователя
            .catch((err) => {
                document.querySelector('.news__error').setAttribute('style', 'display:block');
                renderLoading(false);
              })
            // разблокируем поле input формы поиска новостей 
            .finally(() => {
				search.searchInputUnlock();
			});
    }

    renderNews(news) {
        for(let i = this.counterShowNewsStart; i < this.counterShowNewsStart + ROW_CARDS_COUNT; i++) {
            if(news.articles[i]) {
                createNewsCard.createCard(news.articles[i].title, news.articles[i].urlToImage, news.articles[i].url, news.articles[i].description, news.articles[i].publishedAt, news.articles[i].source.name);
            }
        }
        showHideButtonShowMore(news.articles.length, this.counterShowNewsStart);
    }

    loadMore(news) {
        this.counterShowNewsStart += ROW_CARDS_COUNT;
        this.renderNews(news);
    }
}