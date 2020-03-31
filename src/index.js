import "./pages/index.css";
import "./fonts/fonts.css";
import "./vendor/normalize.css";
import "./vendor/swiper/js/swiper.min.js";

var swiper = new Swiper('.swiper-container', {
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