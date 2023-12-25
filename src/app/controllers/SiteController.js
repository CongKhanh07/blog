const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    home(req, res) {
        async function course() {
            try {
                let courses = await Course.find({});
                courses = mutipleMongooseToObject(courses);
                res.render('home', {
                    courses: courses,
                });
            } catch (err) {
                res.send(err);
            }
        }
        course();
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
