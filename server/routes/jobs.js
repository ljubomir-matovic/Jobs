const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const JobsController = require('../controllers/jobs');

router.route('/')
    .get(authMiddleware,JobsController.getJobs)
    .post(authMiddleware,JobsController.createJob);

router.route('/all')
    .get(JobsController.getAllJobs);

router.route('/:id')
    .get(JobsController.getJob)
    .patch(authMiddleware,JobsController.updateJob)
    .delete(authMiddleware, JobsController.deleteJob);
    

module.exports = router;