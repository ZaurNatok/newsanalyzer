import {creategitcard} from '../../about/index.js';

export class CommitCardList {
    constructor(api) {
        this.api = api;
    }

    loadCommits() {
        document.querySelector('.git__error').setAttribute('style', 'display:none');
        this.api.getCommits()
        .then((data) => {
            for(let i = 0; i < data.length; i++) {
                creategitcard.createCard(data[i].commit.author.name, data[i].commit.author.date, data[i].commit.author.email, data[i].commit.message, 'https://avatars2.githubusercontent.com/u/61757081?v=4');
                }
            creategitcard.createPagination(); 
            })

    }
}

