import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const sendWelcomeEmailMessage = async (email, name) => {
	try {
		await sgMail.send({
			to: email,
			from: "akeren.dev@gmail.com",
			subject: "Thank you for Joing the Platform!",
			text: `Welcome to the app, ${name}. Let me know how you get along with the App.`,
		});
	} catch (error) {
		console.error(error);
	}
};

export const sendCancellationEmailMessage = async (email, name) => {
	try {
		await sgMail.send({
			to: email,
			from: "noreply@kate.dev",
			subject: `Sorry to see you go!`,
			text: `Goodbye, ${name}. I'd hope to see you back soon.`,
		});
	} catch (error) {
		console.error(error);
	}
};
