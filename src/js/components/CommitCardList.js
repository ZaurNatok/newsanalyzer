import {createGitCard} from '../../about/index.js';

export class CommitCardList {
    constructor(api) {
        this.api = api;
    }

    loadCommits() {
        document.querySelector('.git__error').setAttribute('style', 'display:none');
        this.api.getCommits()
        .then((commits) => {
            commits.forEach(item => {
                createGitCard.createCard(item.commit.author.name, item.commit.author.date, item.commit.author.email, item.commit.message, 'https://avatars2.githubusercontent.com/u/61757081?v=4');
            });
            createGitCard.createPagination(); 
            })
        .catch((err) => {
            document.querySelector('.git__error').setAttribute('style', 'display:block');
            })
    }
}