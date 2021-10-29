import * as functions from "firebase-functions";

const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
admin.initializeApp()

require('dotenv').config()

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

exports.sendEmailNotification = functions.firestore.document(`users/{docId}`)
.onCreate((snap) => {
  const data = snap.data()

  const authData = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: SENDER_EMAIL,
      password: SENDER_PASSWORD
    }
  })
  authData.sendMail({
    from: 'maliydebil@gmail.com',
    to: `${data.email}`,
    subject: 'Ви зареєструвались у моєму гидотному проекті',
    text: `${data.email}`,
    html: `<p>Бийло ЛОХ</p>`
  }).then(() => {
    console.log('eeeee boiiiii')
  }).catch((err: Error) => {
    console.log(err)
  });
})