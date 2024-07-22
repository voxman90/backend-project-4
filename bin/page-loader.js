import { Command } from 'commander';

import { loadPage, savePage, getOutputFilePath } from '../src/index.js';

const program = new Command();

const currentDir = process.cwd();

program
  .name('page-loader')
  .version('0.0.1')
  .usage('[options] <url>')
  .description('Page loader utility')
  .option('-o, --output [dir]', 'output dir', currentDir)
  .argument('<url>');

program
  .parseAsync(process.argv)
  .then((command) => {
    const outputPath = command.opts().output;
    const url = command.args[0];

    loadPage(url)
      .then((siteData) => savePage(outputPath, url, siteData))
      .then(() => {
        const outputFilePath = getOutputFilePath(outputPath, url);
        console.log(`Page was successfully downloaded into ${outputFilePath}`);
      })
      .catch((reason) => { throw reason; });
  });
