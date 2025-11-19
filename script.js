// ==UserScript==
// @name         (ROYTVS) Return old YouTube video sidelist
// @namespace    https://github.com/DmitrMarch/return-old-youtube-video-sidelist
// @version      0.2
// @description  Script for the return of the old sidelist design for YouTube videos
// @author       DmitrMarch
// @match        https://www.youtube.com/watch*
// @icon         https://www.youtube.com/s/desktop/9c0f82da/img/favicon.ico
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    // селектор карточек видео из бокового списка (sidelist)
    const CARD_SELECTOR = '.yt-lockup-view-model--vertical';

    // изменить ориентацию карточки
    function changeCard(card) {

        if (card.dataset.changed) return;

        card.dataset.changed = "1";

        // метаданные и первью карточки
        const metadata = card.querySelector('.yt-lockup-metadata-view-model--vertical');
        const img = card.querySelector('.yt-lockup-view-model__content-image');

        if (metadata) {

            metadata.classList.remove('yt-lockup-metadata-view-model--vertical');
            metadata.classList.add('yt-lockup-metadata-view-model--horizontal');
        }

        if (img) {

            img.style.width = "168px";
        }

        card.classList.remove('yt-lockup-view-model--vertical');
        card.classList.add('yt-lockup-view-model--horizontal');
    }

    // изменить ориентацию всех загруженных карточек
    function changeAll() {

        // карточки из sidelist
        const cards = document.querySelectorAll(CARD_SELECTOR);

        if (cards) {

            cards.forEach(changeCard);
            console.log("(ROYTVS): ", "loaded sidelist cards have been changed")
        }
    }

    // на случай, если sidelist уже загружен
    changeAll();

    // на случай, если sidelist загружается позже самой страницы
    const observer = new MutationObserver(() => {

        changeAll();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();