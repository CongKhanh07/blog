const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    storedCourses(req, res) {

        let coursesQuery = Course.find({})
        
        if(res.locals._sort.enabled && res.locals._sort.type != 'default') {
            coursesQuery = Course.find().sort({[res.locals._sort.column]: res.locals._sort.type})
        }

        async function course() {
            try {
                let courses = await coursesQuery
                let countDeleted = await Course.countDocumentsWithDeleted({deleted: true})
                courses = await mutipleMongooseToObject(courses)
                res.render('me/storedCourses', {courses, countDeleted})
            } 
            catch (error) {
                console.log(error)
            }
        }
        course()
    }

    trashCourses(req, res, next) {
        async function course() {
            try {
                let courses = await Course.findDeleted({})
                courses = mutipleMongooseToObject(courses)

                courses = courses.filter(course => course.deleted)
                res.render('me/trashCourses', {courses})
            } catch (error) {
                console.log(error)
            }
        }
        course()
    }

}

module.exports = new MeController();
