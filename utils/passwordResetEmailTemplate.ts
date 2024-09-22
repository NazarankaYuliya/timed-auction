export const passwordResetEmailTemplate = (resetCode: string) => {
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
            text-align: center;
          }

          .code {
            display: block;
            margin: 20px auto;
            padding: 10px;
            background-color: #f2f2f2;
            color: #333333;
            font-size: 20px;
            text-align: center;
            border: 1px dashed #007bff;
            border-radius: 5px;
            width: fit-content;
          }

          .expire-time {
            text-align: center;
            margin-top: 10px;
            color: #999999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Passwort zurücksetzen</h1>
          <p>
            Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt. Verwenden Sie den folgenden Code, um Ihr Passwort zurückzusetzen:
          </p>
          <div class="code">${resetCode}</div>
          <p class="expire-time">Dieser Code läuft in 30 Minuten ab.</p>
          <p>
            Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie bitte diese E-Mail.
          </p>
        </div>
      </body>
    </html>
    `;
};
