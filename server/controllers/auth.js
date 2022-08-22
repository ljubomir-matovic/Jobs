const User = require("../models/user")
const HttpStatusCodes = require('../utils/httpStatusCodes');
const { hash,compare }=require('../utils/crypto');
const { signToken } = require("../utils/jwt");
const AuthController = {
    async login(req, res) {
        let { email, password } = req.body;
        if (!email || !password)
            return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: 'Please provide email and password' });
        try {
            let user = await User.findOne({ email: email }).exec();
            if (await compare(password, user.password)) {
                res.send({ name:user.name,token: signToken({email:email,_id:user._id}) });
            } else res.status(HttpStatusCodes.BAD_REQUEST).send({ message: 'Bad credentials' });
            
        }
        catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
        }
    },
    async register(req, res) {
        try {
            let { name, email, password } = req.body;
            if (password)
                password = await hash(password);
            const user = await User.create({ name,email,password});
            res.status(HttpStatusCodes.CREATED).send({name,token:signToken({email:email,_id:user._id})});
        }
        catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
        }
    }
};

module.exports = AuthController;