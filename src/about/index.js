import {GithubApi} from '../js/modules/GithubApi.js'
import {CommitCardList} from '../js/components/CommitCardList.js'
import {CommitCard} from '../js/components/CommitCard.js';
import {gitContainer} from '../js/constants/constants.js';

const apigit = new GithubApi({
  baseUrl: 'https://api.github.com',
  gitname: 'ZaurNatok',
  repository: 'newsanalyzer'
  });

const getcommits = new CommitCardList(apigit);
export const creategitcard = new CommitCard(gitContainer);

getcommits.loadCommits();