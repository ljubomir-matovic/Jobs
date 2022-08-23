const User = require('../models/user');
const Job = require('../models/job');
const HttpStatusCodes = require("../utils/httpStatusCodes");

const JobsController = {
    async getJob(req, res){
        const {
            params: { id: jobId },
        } = req;
        const job = await Job.findOne({
            _id: jobId,
        });
        if (!job) {
            res.status(HttpStatusCodes.NOT_FOUND({ message: `No job with id ${jobId}` }));
        }
        res.status(HttpStatusCodes.OK).json({ job })
    },
    async getJobs(req, res){
        const jobs = await Job.find({ createdBy: req.user._id }).sort('createdAt');
        res.status(HttpStatusCodes.OK).json({ jobs, count: jobs.length });
    },
    async getAllJobs(req, res) {
        res.status(HttpStatusCodes.OK).send({ jobs: await Job.find({}).exec() });
    },
    async createJob(req, res) {
        try {
            const { position, company } = req.body;
            const user = req.user;
            const job = await Job.create({ position, company, createdBy: user._id});
            res.status(HttpStatusCodes.OK).send({ job });
        }
        catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({message:err.message})
        }
    },
    async updateJob(req, res) {
        const {
    body: { company, position },
    user: { _id:userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
      return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: 'Company or Position fields cannot be empty' })
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    return res.status(HttpStatusCodes.NOT_FOUND).send(`No job with id ${jobId}`)
  }
  res.status(HttpStatusCodes.OK).json({ job })
    },
    async deleteJob(req, res) {
        try {
            const user = req.user;
            const id = req.params.id;
            await Job.findByIdAndRemove({ _id: id, createdBy:user._id });
            res.status(HttpStatusCodes.NO_CONTENT).send();
        }
        catch (err) {
            res.status(HttpStatusCodes.FORBIDDEN).send({ message: 'You are not author' });
        }
    }
};

module.exports = JobsController;