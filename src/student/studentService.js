var studentModel = require('./studentModel.js');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.createStudentService = (studentDetails) => {
  return new Promise((resolve, reject) => {
    var studentModelData = new studentModel();
    studentModelData.firstname = studentDetails.firstname;
    studentModelData.lastname = studentDetails.lastname;
    studentModelData.email = studentDetails.email;
    studentModelData.password = studentDetails.password;

    var encrypted = encryptor.encrypt(studentDetails.password);
    studentModelData.password = encrypted;

    studentModelData.save((error, result) => {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
