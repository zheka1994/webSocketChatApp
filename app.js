import Koa from 'koa';
import bodyParse from 'koa-bodyparser';
import appConfig from './configurations/appConfig.local.js';
import router from './routes/authRoutes.js';
import {connectDb} from './data/chatDb/chatDb.js';

const app = new Koa();

const connection = connectDb();
connection.on('error', (error) => {
  console.log('error:', error.toString());
});
connection.on('connected', () => {
  console.log('success connection to db');
});

app
    .use(bodyParse())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(appConfig.port || 3000);
