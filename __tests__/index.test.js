import nock from 'nock';
import * as fs from 'node:fs/promises';
import url from 'url';
import path from 'path';
import os from 'os';

import {
  getOutputFileName,
  getOutputFilePath,
  loadPage,
  savePage,
} from '../src/index.js';

nock.disableNetConnect();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const pageURL = 'http://www.ya.ru';
const outputFileName = 'www-ya-ru.html';
const outputFilePath = (outputPath) => path.join(outputPath, outputFileName);

const sandbox = {};

beforeAll(async () => {
  sandbox.responseData = await fs.readFile(
    path.join(__dirname, '..', '__fixtures__', 'testPage.txt'),
    'utf-8',
  );

  sandbox.scope = nock(pageURL)
    .get('/')
    .reply(200, sandbox.responseData);
});

beforeEach(async () => {
  sandbox.tmpFolderPath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

test('Test getOutputFileName', () => {
  expect(getOutputFileName(pageURL)).toBe(outputFileName);
});

test('Test getOutputFilePath', () => {
  const outputPath = sandbox.tmpFolderPath;

  expect(getOutputFilePath(outputPath, pageURL)).toBe(outputFilePath(outputPath));
});

test('Test loadPage', async () => {
  const responseData = await loadPage(pageURL);

  expect(responseData).toBe(sandbox.responseData);
});

test('Test savePage', async () => {
  const outputPath = sandbox.tmpFolderPath;

  await savePage(outputPath, pageURL, sandbox.responseData);

  const fileData = await fs.readFile(
    outputFilePath(outputPath),
    'utf-8',
  );

  expect(fileData).toBe(sandbox.responseData);
});
