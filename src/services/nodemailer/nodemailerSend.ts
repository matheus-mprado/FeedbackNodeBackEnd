import { MailService, SendMailData } from '../mailService'
import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "50f6c679e6b509",
        pass: "f15e16fb336ed0"
    }
});


export class NodemailerMailService implements MailService {
    async sendMail({ body, subject }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Matheus Max <maximiliano.mprado@gmail.com>',
            subject,
            html: body
        })
    };
}