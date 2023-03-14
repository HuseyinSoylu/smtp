/* eslint no-console: 0 */

'use strict';

const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account');
    console.error(err);
    return process.exit(1);
  }

  console.log('Credentials are valid, sending message...');

  let transporter = nodemailer.createTransport(
    {
      host: 'mail.hsoylu.dev',
      port: 2079,
      secure: false,
      auth: {
        user: 'mail@hsoylu.dev',
        pass: 'is58G7sQP7dX3Zn',
      },
      logger: true,
      transactionLog: true,
      allowInternalNetworkInterfaces: false,
    },
    {
      from: 'Nodemailer for Parolapara <mail@hsoyludev.site>',
      headers: {
        'X-Laziness-level': 1000, // girmesen de olur bi olayı yok
      },
    }
  );

  let message = {
    // virgülle ayırabilirsin mail gidecek adresleri
    to: 'Receiver <mail@hsoyludev.site>',

    subject: 'API TEST ✔' + Date.now(),

    text: 'Yeni bir bildiriminiz var! ',

    html: `<p><b>Lorem</b> ipsum doalr sit <img src="cid:note@example.com"/></p>
        <p>Embedded attachement:<br/><img src="cid:huseyin.soylu@parolapara.com"/></p>`,

    // An array of attachments
    attachments: [
      // String attachment
      {
        filename: 'notes.txt',
        content: 'Some notes about this e-mail',
        contentType: 'text/plain', // optional, would be detected from the filename
      },

      // File Stream attachment
      {
        filename: 'parolapara.png',
        path: __dirname + '/assets/parolapara.png',
        cid: 'huseyin.soylu@parolapara.com', // should be as unique as possible
      },
    ],
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error occurred');
      console.log(error.message);
      return process.exit(1);
    }

    console.log('Message sent successfully!');
    console.log(nodemailer.getTestMessageUrl(info));

    transporter.close();
  });
});
