'use strict';
const Koa = require('koa');
const app = new Koa();

const router = require('./router/router');

const git = require('./functions/git');
const asyncFunctions = require('./functions/asyncFunctions');
const {log} = require('./functions/log');

const helmet = require('koa-helmet');
app.use(helmet());

app.use(async (ctx, next) =>
{
    const {syncPage} = ctx.request.query;
    if (!syncPage)
    {
        ctx.body = 'Wrong sync arguments';
    }
    else
    {
        await asyncFunctions.accessAsync(`${git.PATH}/${syncPage}`)
            .then(async () =>
            {
                await git.update(syncPage);
            })
            .catch(async () =>
            {
                await git.clone(syncPage);
                await git.update(syncPage);
            });
        ctx.body = `${syncPage} sync request received`;
    }
    await next();
});

app
    .use(router.routes())
    .use(router.allowedMethods());

log('Blog sync server is running on port 8000');
app.listen(8000);