import { Resend } from 'resend';

const resend = new Resend('re_VpD5Qh3t_NSY6ue5Ado4vXQQ6WbPV7DoP');

const sendEmailWithAttachments = async (to, subject, text, html, attachmentPaths) => {
  const email = resend.use({
    service: 'gmail',
    auth: {
      user: ,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  email
    .to(to)
    .subject(subject)
    .text(text)
    .html(html);

  attachmentPaths.forEach((path) => {
    email.attach(path);
  });

  email.send((err) => {
    if (err) {
      console.error('Error sending email: ' + err);
    } else {
      console.log('Email sent successfully');
    }
  });
};

sendEmailWithAttachments(
  'recipient@example.com',
  'Subject',
  'Hello world',
  '<b>Hello world</b>',
  ['/path/to/attachment1', '/path/to/attachment2']
);