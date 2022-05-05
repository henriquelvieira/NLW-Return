import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9389bbe0bc7c7c",
      pass: "c7631119c0b83f"
    }
});

export class NodemailerMailAdapter implements MailAdapter {

    async sendMail ({ subject, body}: SendMailData) {

        try {
            await transport.sendMail({
                from: 'Equipe Feedget <contato@feedget.com>',
                to: 'Henrique Lopes <cliente@teste.com.br>',
                subject: subject,
                html: body
            });       
        } catch (error) {
            console.log('Falha ao enviar o email', error);
        };


    };
}