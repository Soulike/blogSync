'use strict';
const asyncFunctions = require('./asyncFunctions');
const {log} = require('./log');

const PATH = '/home/soulike/blog/source';

async function clone(syncPage)
{
    log(`New pages ${syncPage} detected, start cloning`);
    log(`Executing \"git clone https://git.gitbook.com/soulike/${syncPage}.git\"`);
    await asyncFunctions.execAsync(`git clone https://git.gitbook.com/soulike/${syncPage}.git`, {cwd: `${PATH}/`})
        .then((stdout) =>
        {
            log(`Clone log:\n${stdout}`);
            log(`${syncPage} clone complete`);
        })
        .catch(([stderr, err]) =>
        {
            log(`Error while cloning:\n${stderr}\n${err}`);
        });
}

async function update(syncPage)
{
    log(`${syncPage} update detected, start pulling and compiling`);
    log(`./sync.sh`);
    await asyncFunctions.execAsync(`./sync.sh`, {cwd: `${PATH}/${syncPage}/`})
        .then(stdout =>
        {
            log(`Update Log:\n${stdout}`);
            log(`${syncPage} update complete`);
        })
        .catch(([stderr, err]) =>
        {
            log(`Error while updating:\n${stderr}\n${err}`);
        });
}


module.exports = {
    clone,
    update,
    PATH
};