let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../models/userModel");
const { jobsModel } = require("../models/jobsModel");
const { appliactionModel } = require("../models/applicationsModels");

//login
let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Fill all required fields"
            });
        }
        let data = await userModel.findOne({ email: email });
        if (!data) {
            return res.status(401).json({
                success: false,
                message: "Email does not exist"
            });
        }
        let pass = await bcrypt.compare(password, data.password);
        if (!pass) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }
        let datavalues = {
            user: {
                id: data._id
            }
        }
        let token = jwt.sign(datavalues, process.env.JWT_PAS, { expiresIn: '24h' });
        return res.status(201).json({
            success: true,
            message: "Signed in successfully",
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//signup
let signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        // logic for admin: if username missing, default to "Admin"
        if (!username) username = "Admin";

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Fill all the required fields"
            });
        }
        let data = await userModel.findOne({
            email: email
        });
        if (data) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }
        let pass = await bcrypt.hash(password, Number(process.env.BCRYPT_PAS));
        let savedDatas = new userModel({
            username: username,
            email: email,
            password: pass
        });
        let savedData = await savedDatas.save();
        let dataValues = {
            user: {
                id: savedData._id
            }
        }
        let token = jwt.sign(dataValues, process.env.JWT_PAS, { expiresIn: '24h' });
        return res.status(200).json({
            success: true,
            message: "Signed up successfully",
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// upload job
let uploadjob = async (req, res) => {
    try {
        let { title, description, category, location, salary, level } = req.body;
        if (!title || !description || !category || !location || !salary || !level) {
            return res.status(400).json({
                success: false,
                message: "Enter credentials required"
            });
        }
        let appliedjobsdata = await jobsModel.find({});
        let id;
        if (appliedjobsdata.length > 0) {
            let lastdata = appliedjobsdata.slice(-1);
            let indexedlastdata = lastdata[0].id
            id = indexedlastdata + 1
        }
        else {
            id = 1
        }
        let savedjobs = new jobsModel({
            id: id,
            companyId: {
                _id: "670e4d25ca9fda8f1bf359b9",
                name: "Slack",
                email: "wrightgichana@gmail.com",
                image: "https://www.wired.com/2015/09/googles-new-logo-trying-really-hard-look-friendly/"
            },
            title: title,
            description: description,
            category: category,
            location: location,
            level: level,
            salary: salary
        });
        await savedjobs.save();
        return res.status(201).json({
            success: true,
            message: "Job uploaded successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//get uploaded jobs
let getuploadedjobs = async (req, res) => {
    try {
        let jobs = await jobsModel.find({});
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs available"
            });
        }
        return res.status(200).json({
            success: true,
            jobs: jobs
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//get applicants
let getapplicants = async (req, res) => {
    try {
        let applications = await appliactionModel.find({});
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no applications have been submitted"
            });
        }
        return res.status(200).json({
            success: true,
            applications: applications
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//update applicant status
let status = async (req, res) => {
    try {
        let { id, status } = req.body;
        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status empty"
            });
        }
        await appliactionModel.findByIdAndUpdate(id, { status: status });
        return res.status(200).json({
            success: true,
            message: "Job status is updated"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//update job visibility
let jobsVisibility = async (req, res) => {
    try {
        let { id } = req.body;
        let job = await jobsModel.findOne({ id: id })
        if (job) {
            await jobsModel.findOneAndUpdate({ id: id }, { $set: { visible: !job.visible } });
        }
        return res.status(200).json({
            success: true,
            message: "Job visibility updated"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { signup, login, uploadjob, getuploadedjobs, getapplicants, status, jobsVisibility };