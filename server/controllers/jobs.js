const User = require('../models/user');
const Job = require('../models/job');
const HttpStatusCodes = require("../utils/httpStatusCodes");
const { verifyToken } = require('../utils/jwt');

const JobsController = {
    async getJob(req, res){
        res.status(HttpStatusCodes.OK).send({ job: await Job.findOne({ _id: req.params.id }).exec() });
    },
    async getAllJobs(req, res){
        res.status(HttpStatusCodes.OK).send({ jobs: await Job.find().exec() });
    },
    async createJob(req, res) {
        try {
            const { position, company } = req.body;
            let token = req.headers.authorization.split(' ');
            if (token[0] == 'Bearer')
                token = token[1];
            else token = 'ass';
            const user = verifyToken(token);
            const job = await Job.create({ position, company, createdBy: user._id});
            res.status(HttpStatusCodes.OK).send({ job });
        }
        catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({message:err.message})
        }
    },
    async updateJob(req, res) {
        
    },
    async deleteJob(req, res) {
        
    }
};

module.exports = JobsController;