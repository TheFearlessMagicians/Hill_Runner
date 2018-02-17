let sendEmail = (email,subject,text) => {
	const sgMail = require('@sendgrid/mail');
	const SG_API_KEY = require('../creds/SendGrid_creds.js');
	sgMail.setApiKey(SG_API_KEY);
	const msg = {
	  to: email,
	  from: 'varun.narayanan1729@gmail.com',
	  subject: subject,
	  text: text,
	};
	sgMail.send(msg);
}
module.exports = sendEmail;