import {dateFormat} from '../utils/dateFormat.js';
import "../../vendor/swiper/js/swiper.min.js";

export class CommitCard {
    constructor(container, sliderContainer) {
        this.container = container;
        this.sliderContainer = sliderContainer;
    }

    createCard(name, date, email, text, avatar) {
        const slideItem = document.createElement('div');
        const slideItemDate = document.createElement('p');
        const slideAuthor = document.createElement('div');
        const slideImage = document.createElement('img');
        const slideAuthorInfo = document.createElement('div');
        const slideAuthororName = document.createElement('p');
        const slideAuthorEmail = document.createElement('p');
        const slideDescription = document.createElement('p');
        
        slideItem.classList.add('slider__item');
        slideItem.classList.add('swiper-slide');
        slideItem.setAttribute('style', 'width: 400px; margin-right: 16px;');
        slideItemDate.classList.add('slider__item-date');
        slideAuthor.classList.add('slider__author');
        slideImage.classList.add('slider__item-image');
        slideAuthorInfo.classList.add('slider__author-info');
        slideAuthororName.classList.add('slider__author-name');
        slideAuthorEmail.classList.add('slider__autor-email');
        slideDescription.classList.add('slider__description');

        this.container.appendChild(slideItem);
        slideItem.appendChild(slideItemDate);
        slideItem.appendChild(slideAuthor);
        slideAuthor.appendChild(slideImage);
        slideAuthor.appendChild(slideAuthorInfo);
        slideAuthorInfo.appendChild(slideAuthororName);
        slideAuthorInfo.appendChild(slideAuthorEmail);
        slideItem.appendChild(slideDescription);

        slideImage.setAttribute('style', 'background-image:url(' + avatar + ')');
        slideAuthororName.textContent = name;
        slideItemDate.textContent = dateFormat(date);
        slideAuthorEmail.textContent = email;
        slideDescription.textContent = text;
    }

    createPagination() {
        let swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 16,
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
            breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 8
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 16
            }             
        },
            
            navigation: {
            nextEl: '.slider__control-button-next',
            prevEl: '.slider__control-button-prev',
            },
            
        });

    }
}