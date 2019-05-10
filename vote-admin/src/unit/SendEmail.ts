const nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// async..await is not allowed in global scope, must use a wrapper

export class SendEmail {
    private emailConfig = {
        host: "127.0.0.1",
        port: 25,
        secure: false,
        auth: {
          //  user: '', // generated ethereal user
          //  pass: '' // generated ethereal password
        }
    }
    async send(target, title, text, html) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let account = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(
            this.emailConfig
        );
        // setup email data with unicode symbols
        let link ='http://127.0.0.1/vote/';
        html += `<p> <a href=${link}>Click Link.</a></p>`
        let mailOptions = {
            from: '"Fred Foo 👻" <donotreply22@starcruises.com>', // sender address
            to: target, // list of receivers
            subject: title, // Subject line
            text: text, // plain text body
            html: html // html body
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    public  commentNotice(user,author,subject,comment){
        let html = `
            <h3>Hey,${author.username}</h3>
            <p>Your Subject '${subject}' got a new comment,Please check it out: </p>
            <h4>Comment:</h4>
            <p>${user.username} : ${comment}</p>
           
        `
        this.send([author.email],'Vote Comment Notify',`Hi, ${author.username}`,html)
    }


}

export const EmailProvider = {
    provide: 'EmailRepository',
    useValue: SendEmail
}
