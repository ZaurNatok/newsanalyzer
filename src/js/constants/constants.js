// Объявление констант - общие элементы интерфейса
export let currentDate = new Date(); // текущая дата

// для главной страницы
export const showMoreButton = document.querySelector('.news__show-more'); // Кнопка "Показать еще"
export const ROW_CARDS_COUNT = 3; // Сколько карточек новостей выводим за 1 раз и сколько подгружаем нажатием кнопки "Показать еще"

// для страницы О проекте

export const gitContainer = document.querySelector('.swiper-wrapper'); // Секция результатов поиска коммитов

// для страницы аналитики
export const analyticsKeyword = document.querySelector('.analytics__keyword'); // Ключевое слово поиска
export const totalResult = document.querySelector('.section__total-result'); // Всего новостей за неделю по заданному ключевому слову
export const totalHeadlineResult = document.querySelector('.section__total-headlines-result'); // Всего упоминаний в заголовках за неделю по заданному ключевому слову
export const graphHeaderMonth = document.querySelector('.analytics-graph__month'); // Текущий месяц, для отображения в header графика