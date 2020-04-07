import {cardList, phrase, searchInput, searchButton} from '../../index.js';

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
            cardList.loadNews(phrase); // отправляем запрос на сервер новостей
          }
    }

    searchInputLock() {
      searchInput.setAttribute('disabled', true);
      searchButton.setAttribute('disabled', true);
    }

    searchInputUnlock() {
      searchInput.removeAttribute('disabled');
      searchButton.removeAttribute('disabled');
    }
}