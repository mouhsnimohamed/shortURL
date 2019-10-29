const express = require('express');
const isUrl = require('is-url');
const connectToDB = require('./mongoose');
const controllers = require('./controllers/shortUrlController');
const PORT = process.env.PORT || '5000';
const app = express();
const bodyParser = require('body-parser');
/* 
    #@# DB CONNECTION #@# 
*/
connectToDB();
/* 
    #@# END #@# 
*/

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-type,Accept,x-access-token,X-Key'
//   );
//   if (req.method == 'OPTIONS') {
//     res.status(200).end();
//   } else {
//     next();
//   }
// });

// app.get('/', (req, res) => {
//   res.status(201).send('server runing');
// });

app.use(bodyParser.json());
app.use('/static', express.static('public')); // to serve front-end
app.use('/', controllers);

const server = app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}}`);
});
