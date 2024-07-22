import * as fs from 'node:fs/promises';
import path from 'path';
import axios from 'axios';

const encoding = 'utf-8';

const getOutputFileName = (url) => url
  .replace(/^(https?:|)\/\//, '')
  .replace(/\W/g, '-')
  .concat('.html');

const getOutputFilePath = (outputPath, pageUrl) => path.join(
  outputPath,
  getOutputFileName(pageUrl),
);

const savePage = (outputPath, pageUrl, pageData) => fs
  .writeFile(
    getOutputFilePath(outputPath, pageUrl),
    pageData,
    encoding,
  );

const loadPage = (url) => axios
  .get(url)
  .catch((reason) => { throw reason; })
  .then((response) => response.data);

export {
  getOutputFileName,
  getOutputFilePath,
  savePage,
  loadPage,
};
