let brcypt = require("bcrypt");
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
        let pass = await brcypt.compare(password, data.password);
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
        let token = jwt.sign(datavalues, process.env.JWT_PAS);
        return res.status(200).json({
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
        if (!username || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "Fill all the required fields"
            });
        }
        let data = await userModel.findOne({ email: email });
        if (data) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }
        let pass = await brcypt.hash(password, Number(process.env.BCRYPT_PAS));
        let savedDatas = new userModel({
            username: username,
            email: email,
            password: pass
        });
        let savedData = await savedDatas.save();  // Added await
        let dataValues = {
            user: {
                id: savedData._id
            }
        }
        let token = jwt.sign(dataValues, process.env.JWT_PAS)
        return res.status(201).json({  // Changed to 201
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

//upload resume
let resume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({  // Added return
                success: false,
                message: "No file has been uploaded"
            });
        }
        await userModel.findOneAndUpdate({ _id: req.user.id }, { resume: req.file.path });
        return res.status(200).json({
            success: true,
            message: "Resume uploaded to your profile successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//get jobs data
let getjobs = async (req, res) => {
    try {
        let jobs = await jobsModel.find({ visible: { $ne: false } });
        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: "No jobs data found"
            });
        }
        return res.status(200).json({
            success: true,
            jobsdata: jobs
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//get applied jobs
let appliedjobs = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let userinfo = await userModel.findOne({ _id: req.user.id });
        if (!userinfo) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let username = userinfo.username
        if (!username) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let applications = await appliactionModel.find({ applicant_name: username });
        if (!applications) {
            res.status(404).json({
                success: false,
                message: "No applications found"
            });
        }
        return res.status(200).json({
            success: true,
            appliactions: applications
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//apply for job
let applyjob = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let { title, location, job_id, company_id } = req.body;
        if (!title || !location || !job_id, company_id) {

        }
        let userdata = await userModel.findOne({ _id: req.user.id })
        let appliedjobsdata = await appliactionModel.find({ job_title: title });
        let values = appliedjobsdata.filter((element) => { return element.applicant_name === userdata.username });
        if (values.length > 0) {
            return res.status(400).json({
                success: false,
                message: "You already applied for the job"
            });
        }
        if (!userdata.resume) {
            return res.status(404).json({
                success: false,
                message: "No resume has been uploaded"
            });
        }
        let applicationData = new appliactionModel({
            job_id: job_id,
            applicant_name: userdata.username,
            company_id: company_id,
            job_title: title,
            location: location,
            resume: userdata.resume
        });
        await applicationData.save();
        await jobsModel.updateOne(
            { title: title },
            { $inc: { applicants: 1 } });
        return res.status(200).json({
            success: true,
            message: "Application sent"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//get resume
let getresume = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let userInfo = await userModel.findOne({ _id: req.user.id });
        let resume = userInfo.resume;
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "User resume not found"
            });
        }
        return res.status(200).json({
            success: true,
            resume: resume
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { login, signup, resume, getjobs, appliedjobs, applyjob, getresume };  