const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {
    // NEWS
    app.use('/news', newsRouter);

    // COURSES
    app.use('/courses', coursesRouter);

    // ME
    app.use('/me', meRouter)

    //SEARCH
    app.get('/search', function (req, res) {
        res.render('search');
    });


    // HOME
    app.use('/', siteRouter);
}

module.exports = route;
