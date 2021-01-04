const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Joi = require('joi');
const mysql = require('mysql');
const mongoose = require('mongoose');
const app = express();

const schema = Joi.object({
    name: Joi.string().required().min(2).max(70),
    email: Joi.string().required().email(),
    phone: Joi.string().regex(/^0[2-9]\d{7,8}$/),
    message: Joi.string().required().min(2).max(2000),
    submit: Joi.string().allow('')
});

// save data in mongoDB
mongoose.connect('mongodb://localhost/company_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    date: { type: Date, default: Date.now }
});
let Contact = mongoose.model('Contact', contactSchema);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Middlewarw

app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Home Page' });
});

app.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About Us' });
});

app.get('/services', (req, res) => {
    res.render('services', { pageTitle: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { pageTitle: 'Contact Us' });
});

// forms
app.post('/contact', (req, res) => {
    const { value, error } = schema.validate(req.body);
    if (!error) {

        // save data in mongoDB
        contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });

        contact.save()
            .then(result => res.render('tnx', { pageTitle: 'Thanks Page' }))
            .catch(err => res.render('contact', { pageTitle: 'Contact Us Page' }));

    }


    // save data in msql
    /* const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_demo'
    });

    // placholders
    let sql = `INSERT INTO contacts VALUE (null, ?, ?, ?, ?, NOW())`;
    let ph = [req.body.name, req.body.email, req.body.phone, req.body.message];
    connection.query(sql, ph, (error, results, fiel) => {
        if (results.affectedRows) {
            res.render('tnx.handlebars', { pageTitle: 'Thanks Page' });
        } else {
            res.render('contact', { pageTitle: 'Contact Us' });
        }
    }) */

    // console.log(value);
    else {
        console.log('FUCK YOU!');
    }
});

/* app.post('/contact', (req, res) => {

    const { value, error } = schema.validate(req.body); // {name: '....'}

    if (!error) {

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'company_demo'
        });


        let sql = `INSERT INTO contacts VALUES(null,?,?,?,?,NOW())`;
        let ph = [req.body.name, req.body.email, req.body.phone, req.body.message];

        connection.query(sql, ph, (error, results, fields) => {

            if (results.affectedRows) {
                res.render('tnx', { pageTitle: 'Thanks Page' });
            } else {
                res.render('contact', { pageTitle: 'Contact Us Page' });
            }

        });


    }

}); */


app.use((req, res) => {
    res.status(404);
    res.render('page404', { pageTitle: 'Page 404' });
});

const port = 3000;
app.listen(port, console.log(`server run on port ${port}`));