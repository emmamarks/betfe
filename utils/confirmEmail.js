const sendEmail = require('./sendEmail');

exports.sendConfirmAccountEmail = async (user) =>{

    try {

        const confirmToken = user.getConfirmAccountToken();

        await user.save()

        const confirmUrl = `${process.env.MAIL_URL}/verify/${confirmToken}`;
        const message = `<h1>Account Confirmation</h1>
            <p>Click on this link to confirm your Account.
            The link will expire in 5 mins</p>
            <a href = ${confirmUrl} clicktracking = off>${confirmUrl}</a>
        `
        try {
            sendEmail({
                to: user.email,
                subject: "Account Confirmation",
                text: message,
            })
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}