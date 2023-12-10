// studentService.js
var studentModel = require("./studentModel.js");
var key = "123456789trytryrtyr";
var encryptor = require("simple-encryptor")(key);

module.exports.createStudentService = (studentDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      var studentModelData = new studentModel();
      studentModelData.firstname = studentDetails.firstname;
      studentModelData.lastname = studentDetails.lastname;
      studentModelData.email = studentDetails.email;

      var encrypted = encryptor.encrypt(studentDetails.password);
      studentModelData.password = encrypted;

      const result = await studentModelData.save();
      resolve(true);
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
};
