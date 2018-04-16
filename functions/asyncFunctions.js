'use strict';
const {exec} = require('child_process');
const fs = require('fs');

//exec的async版本
async function execAsync(command, options = null)
{
    return new Promise(((resolve, reject) =>
    {
        exec(command, options, (err, stdout, stderr) =>
        {
            if (err)
            {
                reject([stderr, err]);
            }
            else
            {
                resolve(stdout);
            }
        });
    }));
}

async function accessAsync(path, mode = fs.constants.F_OK)
{
    return new Promise(((resolve, reject) =>
    {
        fs.access(path, mode, err =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve();
            }
        });
    }));
}

module.exports = {
    execAsync,
    accessAsync
};