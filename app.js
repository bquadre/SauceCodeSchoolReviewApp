import express from 'express';
import mongoose from 'mongoose';
import BodyParser from 'body-parser';
import path from 'path';
import session from 'express-session'
import exphbs from 'express-handlebars'
import appRouter from './routes/routes';
const MongoStore = require('connect-mongo')(session);
const app = express();



//connect to MongoDB
mongoose.connect('mongodb://leks:leks@ds141796.mlab.com:41796/goodschools');
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    // we're connected!
    console.log('Connected successfully to database')
});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

// set view engine to Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')) // this is the folder where we keep our ejs files
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// parse request body content
app.use(BodyParser.urlencoded({extended: true}))
app.use(BodyParser.json());
// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// routing with imported allback function
app.use('/', appRouter);

// Don't go to any page we don't have
app.get('*', (req, res) => {
    res.send('404 NOT FOUND')
})
// server initialization with databse connection
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`GoodSchools is on port ${port}`)
    // connect to database
    // mongoose.connect(db.url);
    //     mongoose.connection.on('error', ()  => {
    //         console.log('Could not connect to the database. Exiting now...');
    //         process.exit();
    //     });
    //     mongoose.connection.once('open', ()  => {
    //         console.log('Successfully connected to the database');
    // });
});

export default app;