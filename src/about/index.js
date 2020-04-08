import {GithubApi} from '../js/modules/GithubApi.js'
import {CommitCardList} from '../js/components/CommitCardList.js'
import {CommitCard} from '../js/components/CommitCard.js';
import {gitContainer} from '../js/constants/constants.js';

const apiGit = new GithubApi({
  baseUrl: 'https://api.github.com',
  gitname: 'ZaurNatok',
  repository: 'newsanalyzer'
  });

const getCommits = new CommitCardList(apiGit);
export const createGitCard = new CommitCard(gitContainer);

getCommits.loadCommits();