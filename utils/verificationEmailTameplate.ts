export const verificationEmailTemplate = (verificationLink: string) => {
  return `
          <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          margin-top: 50px;
        }

        h1 {
          color: #333333;
          text-align: center;
        }

        p {
          color: #666666;
          line-height: 1.5;
        }

        .button {
          display: block;
          margin: 0 auto;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          text-align: center;
        }

        .expire-time {
          text-align: center;
          margin-top: 10px;
          color: #999999;
        }

        .button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bestätigen Sie Ihre E-Mail-Adresse</h1>
        <p>
          Vielen Dank für Ihre Anmeldung! Um Ihre Registrierung abzuschließen,
          klicken Sie bitte auf die Schaltfläche unten, um Ihre E-Mail-Adresse zu bestätigen.
        </p>
        <a href=${verificationLink} class="button">E-Mail bestätigen</a>
        <p class="expire-time">Dieser Link läuft in 30 Minuten ab.</p>
      </div>
    </body>
  </html>
  `;
};
