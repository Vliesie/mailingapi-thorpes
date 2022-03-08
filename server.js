const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const ical = require('ical-generator');
const details = require("./details.json");
var icalToolkit = require('ical-toolkit');


const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 5000, () => {
  console.log("The server started on port Heroku || 5000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Mailing Service for Thorpes Farm.</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "lionmarketing.dedicated.co.za",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });
  
  //Create a iCal object
  var startDate = new Date(user.sDate);
  startDate.toISOString();
  var EndDate = new Date(user.eDate);
  EndDate.toISOString();
  var builder = icalToolkit.createIcsFileBuilder();
  //startDate.toLocaleDateString("en-US", {timeZone: "Africa/Johannesburg"});
  //EndDate.toLocaleDateString("en-US", {timeZone: "Africa/Johannesburg"});

  builder.calname = 'Temp Cal';
  //builder.timezone = 'Africa/Johannesburg';
  //builder.tzid = 'Africa/Johannesburg';
  builder.method = 'REQUEST'; 
  console.log(startDate + " sDate")
  console.log(user.eDate + " eDate")
  //startDate.ToUniversalTime();
  //EndDate.ToUniversalTime();
  builder.events.push({
    //Event start time, Required: type Date()
    start: startDate,
    //Event end time, Required: type Date()
    end: EndDate,
 
    //Event summary, Required: type String
    summary: 'Test Event',
    //Optional if all day event

    //Location of event, optional.
    location: 'ThorpesFarm',
    floating: false,
    //Optional description of event.
    description: 'Testing it!',
    //Optional Organizer info
    organizer: {
      name: 'ThorpesFarm ',
      email: 'thorpe@lionmarketing.co.za',
      sentBy: 'thorpe@lionmarketing.co.za' //OPTIONAL email address of the person who is acting on behalf of organizer.
    },
    //What to do on addition
    method: 'REQUEST',
    //Status of event
    status: 'CONFIRMED',

  })
  var icsFileContent = builder.toString();
  //Check if there was an error (Only required if yu configured to return error, else error will be thrown.)
  if (icsFileContent instanceof Error) {
    console.log('Returned Error, you can also configure to throw errors!');
    //handle error
  }

  emailTemplate = `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }
  
      body {
        margin: 0;
        padding: 0;
      }
  
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }
  
      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }
  
      p {
        line-height: inherit
      }
  
      @media (max-width:720px) {
        .row-content {
          width: 100% !important;
        }
  
        .image_block img.big {
          width: auto !important;
        }
  
        .column .border {
          display: none;
        }
  
        .stack .column {
          width: 100%;
          display: block;
        }
      }
    </style>
  </head>
  
  <body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div align="center" style="line-height:10px"><img class="big" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/769425_752990/green-grass-field-near-houses-1198507.jpg" style="display: block; height: auto; border: 0; width: 700px; max-width: 100%;" width="700" alt="Alternate text" title="Alternate text"></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:25px;">
                                  <div style="font-family: sans-serif">
                                    <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #0b1560; line-height: 1.2;">
                                      <p style="margin: 0; font-size: 16px; text-align: center;"><span style="font-size:42px;"><strong>HI ${user.name}</strong></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td style="padding-bottom:25px;padding-left:30px;padding-right:30px;padding-top:10px;">
                                  <div style="font-family: sans-serif">
                                    <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #210e69; line-height: 1.5;">
                                      <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="font-size:15px;">Your Booking on Thorpes Farm was Made Successfully&nbsp;<br><br>Your trip to <span style="color:#0b1560;"><strong>Thorpes</strong></span> starts on <span style="color:#0b1560;"><strong><span style>${user.sDate}</span></strong></span>&nbsp;&amp; Ends on <strong>${user.eDate}</strong></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td style="padding-bottom:45px;padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;">
                                  <div align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="thorpesfarm.co.za" style="height:52px;width:223px;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#0b1560"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a href="thorpesfarm.co.za" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#0b1560;border-radius:4px;width:auto;border-top:1px solid #0b1560;border-right:1px solid #0b1560;border-bottom:1px solid #0b1560;border-left:1px solid #0b1560;padding-top:10px;padding-bottom:10px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:60px;padding-right:55px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; margin: 0; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">See Bookings</span></span></a>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0b1560; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <div class="spacer_block" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0b1560; color: #000000; width: 700px;" width="700">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <div class="spacer_block" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!-- End -->
  </body>
  
  </html>`
  console.log(icsFileContent);
  let mailOptions = {
    from: 'thorpe@lionmarketing.co.za', // sender address
    to: user.email, // list of receivers
    subject: "New Booking Made On Thorpes Farm.", // Subject line
    html: emailTemplate,
    alternatives: [{
      contentType: 'text/calendar; charset="utf-8"; method=REQUEST',
      content: icsFileContent.toString()
    }]
  };
  console.log("startDate")
  console.log("end: EndDate")
  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);

