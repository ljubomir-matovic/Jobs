const express = require('express');
const router = express.Router();

const JobsController = require('../controllers/jobs');

router.route('/')
    .get(JobsController.getAllJobs)
    .post(JobsController.createJob);

router.route('/:id')
    .get(JobsController.getJob)
    .patch(JobsController.updateJob)
    .delete(JobsController.deleteJob);

module.exports = router;