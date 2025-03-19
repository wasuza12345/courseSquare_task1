const express = require('express');
const router = express.Router();
const { getAllMember,createMember, getMember, updateMember, deleteMember, getALLCourses, createCourse, getCourse, updateCourse, deleteCourse, getAllEnroll, createEnroll, getEnroll, updateEnroll, deleteEnroll, getAllEnrollMember, getAllEnrollCourse} = require('../controllers/controller');

router.get('/members', getAllMember);
router.post('/members', createMember); 
router.get('/members/:m_id', getMember);
router.put('/members/:m_id',updateMember)
router.delete('/members/:m_id',deleteMember)
router.get('/courses',getALLCourses)
router.post('/courses', createCourse);
router.get('/courses/:c_id', getCourse);
router.put('/courses/:c_id', updateCourse);
router.delete('/courses/:c_id', deleteCourse);
router.get('/enrolls',getAllEnroll)
router.post('/enrolls', createEnroll);
router.get('/enrolls/:cer_id', getEnroll);
router.put('/enrolls/:cer_id', updateEnroll);
router.delete('/enrolls/:cer_id', deleteEnroll);
router.get('/enrolls/member/:m_id',getAllEnrollMember);
router.get('/enrolls/course/:c_id',getAllEnrollCourse)


module.exports = router;
