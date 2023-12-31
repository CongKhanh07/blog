const express = require('express');
const router = express.Router();

//Import controller
const CourseController = require('../app/controllers/CourseController');

router.get('/create', CourseController.create);
router.post('/store', CourseController.store);
router.get('/:id/edit', CourseController.edit);
router.post('/handle-form-actions', CourseController.handleFormActions);
router.put('/:id', CourseController.update);
router.patch('/:id/restore', CourseController.restore);
router.delete('/:id', CourseController.delete);
router.get('/:slug', CourseController.course);


module.exports = router;
