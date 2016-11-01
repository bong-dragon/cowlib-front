import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import passport from 'passport';
import pasportconfig from '../config/passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';


const app = express();
const port = 3000;
const devPort = 3001;

pasportconfig(passport);

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public'));


import books from './routes/booksSample';
import auth from './routes/auth';

app.use('/books', books);
app.use('/auth', auth);
app.get('*', function (request, response){
    var options = {
        root: __dirname + '/../public'
    };
    response.sendFile('index.html', options, function (err) {
        if(err){
            console.log(err);
        }
    });
});
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});