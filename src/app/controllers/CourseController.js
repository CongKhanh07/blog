//import module
const Course = require('../models/Course');

const { mongooseToOject } = require('../../util/mongoose');

class CourseController {

    //1_COURSE
    course(req, res) {
        async function course() {
            try {
                let course = await Course.findOne({
                    slug: req.params.slug,
                }).exec();
                course = mongooseToOject(course);
                res.render('course', {
                    course: course,
                });
            } catch (err) {
                res.send(err);
            }
        }
        course();
    }

    //2_EDIT
    edit(req, res) {
        async function course() {
            try {
                let course = await Course.findOne({
                    _id: req.params.id,
                }).exec();
                course = mongooseToOject(course);
                res.render('edit', {
                    course: course,
                });
            } catch (err) {
                res.send(err);
            }
        }
        course();
    }

    //3_CREATE
    create(req, res) {
        res.render('create')
    }

    //4_[POST] /courses/store
    store(req, res) {
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(() => res.send('Error'))
    }


    //5_[PUT] /courses/id
    update(req, res, next) {
        const formData = req.body
        Course.updateOne({_id: req.params.id}, formData)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //6_[DELETE] /courses/id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }


    //7_[RESTORE] /courses/id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next)
    }


     //8_[HANDLE-FORM-ACTIONS] /courses/handle-form-actions
     handleFormActions(req, res, next) {
        switch(req.body.action) {
            case "delete":
                Course.delete( {_id: {$in: req.body.coursesId}} )
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next)
                break
            default: 
                res.json({ message: 'Action is invalid!' })
        }
    }



}

module.exports = new CourseController();
