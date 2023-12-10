var studentService = require('./studentService');

var createStudentControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        var status = await studentService.createStudentService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": "User created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating user" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
}

module.exports = {
    createStudentControllerFn,
};