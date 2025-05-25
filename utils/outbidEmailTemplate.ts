export const outbidEmailTemplate = ({
  username,
  itemNumber,
  newBid,
  link,
}: {
  username?: string;
  itemNumber: number;
  newBid: number;
  link: string;
}) => {
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

          .highlight {
            font-weight: bold;
            color: #007bff;
          }

          .button {
            display: block;
            width: fit-content;
            margin: 30px auto 10px auto;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
          }

          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Ihre Gebot wurde überboten</h1>
          <p>
            ${
              username ? `Hallo <strong>${username}</strong>,` : `Hallo,`
            } leider
            wurde Ihre Gebot für den Artikel
            <span class="highlight">"${itemNumber}"</span> überboten.
          </p>
          <p>
            Das neue aktuelle Gebot beträgt <span class="highlight">€${newBid}</span>.
          </p>
          <a href="${link}" class="button">Jetzt erneut bieten</a>
          <p class="footer">
            Sie erhalten diese Benachrichtigung, weil Sie an einer Auktion auf unserer Website teilgenommen haben.
          </p>
        </div>
      </body>
      </html>
    `;
};
