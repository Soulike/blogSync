'use strict';
const fs = require('fs');
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
    await asyncFunctions.accessAsync(`${PATH}/${syncPage}/`, fs.constants.X_OK)//查看这个文件能否执行，如果不能，修改权限
        .catch(async (err) =>
        {
            if (err)
            {
                await asyncFunctions.execAsync(`chmod 744 sync.sh`, {cwd: `${PATH}/${syncPage}/`});
            }
        });
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