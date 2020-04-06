export class NewsApi {
    constructor(options) {
        this.options = options;
        this.getNews = this.getNews.bind(this);
    }

    getNews(phrase, currentDate, weekAgo) {
        return fetch(`${this.options.baseUrl}q=${phrase}&from=${weekAgo}&to=${currentDate}&pageSize=100&language=${this.options.lang}&sortBy=publishedAt&apiKey=${this.options.apiKey}`)
            .then((res) =>  this._getResponseData(res))
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
}