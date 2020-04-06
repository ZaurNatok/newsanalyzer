import {dateFormat} from '../utils/dateFormat.js';

export class NewCard {
    constructor(container) {
        this.container = container;
    }

    createCard(title, image, link, subtitle, date, source) {
        document.querySelector('.news__result').setAttribute('style', 'display:block;')

        const cardLink = document.createElement('a');
        const cardContent = document.createElement('div');
        const cardImage = document.createElement('div');
        const cardDescription = document.createElement('div');
        const cardDate = document.createElement('p');
        const cardTitle = document.createElement('h2');
        const cardText = document.createElement('p');
        const cardSource= document.createElement('p');

        cardLink.classList.add('news__item_link');
        cardContent.classList.add('news__item');
        cardImage.classList.add('item__image');
        cardDescription.classList.add('item__description');
        cardDate.classList.add('item__date');
        cardTitle.classList.add('item__title');
        cardText.classList.add('item__text');
        cardSource.classList.add('item__link');

        this.container.appendChild(cardLink);
        cardLink.appendChild(cardContent);
        cardContent.appendChild(cardImage);
        cardContent.appendChild(cardDescription);
        cardDescription.appendChild(cardDate);
        cardDescription.appendChild(cardTitle);
        cardDescription.appendChild(cardText);
        cardDescription.appendChild(cardSource);

        cardImage.setAttribute('style', 'background-image:url(' + image + ')');

        cardLink.setAttribute('href', link);
        cardLink.setAttribute('target', '_blank');
        cardTitle.textContent = title;
        cardText.textContent = subtitle;
        cardSource.textContent = source;

        cardDate.textContent = dateFormat(date);

        return cardLink;
    }
}