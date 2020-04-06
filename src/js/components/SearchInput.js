import {cardlist, phrase} from '../../index.js';

export class SearchInput {
    constructor(phrase) {
        this.phrase = phrase;
    }

    validateForm (keyword) {
        if(keyword.length === 0) {
            document.querySelector('.search__error').setAttribute('style', 'display:block'); // если поисковая фраза не введена - отображаем ошибку, новости с сервера не грузим
          }
          else {
            document.querySelector('.search__error').setAttribute('style', 'display:none'); // песли поискова яфраза есть - скрываем ошибку
            cardlist.loadNews(phrase); // отправляем запрос на сервер новостей
          }
    }
}