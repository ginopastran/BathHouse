var transporter = nodemailer.createTransport({ 
  servicio: 'gmail', 
  autenticación: { 
          usuario: ' metralciro@gmail.com', 
          contraseña: '35516414Ciro.' 
      } 
  });
  const mailOptions = { 
    from: 'sender@email.com', // dirección del remitente 
    a: 'to@email.com', // lista de destinatarios 
    asunto: 'Asunto de su correo electrónico', // Línea de asunto 
    html: '< p>Tu html aquí</p>'// cuerpo de texto sin formato 
  };
  transporter.sendMail(mailOptions, function (err, info) { 
    if(err) 
      console.log(err) 
    else 
      console.log(info); 
 });