export class GithubApi {
    constructor(options) {
        this.options = options;
    }

    getCommits() {
        return fetch(`${this.options.baseUrl}/repos/${this.options.gitname}/${this.options.repository}/commits`)
            .then((res) =>  this._getResponseData(res))    
            .then((commits) => {
                    return commits;
                })
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
}