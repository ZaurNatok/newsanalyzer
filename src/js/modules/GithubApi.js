export class GithubApi {
    constructor(options) {
        this.options = options;
    }

    getCommits() {
        return fetch(`${this.options.baseUrl}/repos/${this.options.gitname}/${this.options.repository}/commits`)
            .then((res) =>  this.getResponseData(res))    
            .then((data) => {
                    return data;
                })
    }

    getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
}