const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmailMessage = async (email, name) => {
	try {
		await sgMail.send({
			to: email,
			from: 'kater@dev.com',
			subject: 'Thank you for Joing the Platform!',
			text: `Welcome to the app, ${name}. Let me know how you get along with the App.`
		});
	} catch (error) {
		console.error(error);
	}
};

const sendCancelationEmailMessage = async (email, name) => {
	try {
		await sgMail.send({
			to: email,
			from: 'noreply@kate.dev',
			subject: `Sorry to you go, ${name}`,
			text: `Goodbye, ${name}. I'd hope to see back soon.`
		});
	} catch (error) {
		console.error(error);
	}
};

module.exports = { sendWelcomeEmailMessage, sendCancelationEmailMessage };
