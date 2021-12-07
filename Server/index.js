import express from "express";
import Vonage from "@vonage/server-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const vonage = new Vonage({
  // apiKey: "4c2dcbbd",
  // apiSecret: "RIrUzpvTBGRQAj7p",
  applicationId: process.env.APPLICATION_ID,
  privateKey: Buffer.from(process.env.PRIVATE_KEY, "base64"),
});

const { json, urlencoded } = express;

const app = express();

app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});

app.post("/send", (req, res) => {
  const from = req.body.virtualNumber;
  const to = req.body.toNumber;
  const text = req.body.message;
  vonage.message.sendSms(
    from,
    to,
    text,
    { type: "unicode" },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.dir(responseData);
          res.status(200).send(responseData);
        } else {
          console.log(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
        }
      }
    }
  );
});

app.post("/request", (req, res) => {
  // Verify code
  vonage.verify.request(
    { number: req.body.number, brand: req.body.brand },
    (err, result) => {
      if (err) {
        console.log(err);
        // error
        res.status(500).send(err);
      } else {
        console.log(result);

        if (result && result.status == "0") {
          //A status of 0 means success! Respond with 200: OK
          res.status(200).send(result);
        } else {
          // Something went wrong
          res.status(400).send(result);
        }
      }
    }
  );
});

app.post("/check", (req, res) => {
  //To verify the phone number the request ID and code are required.
  let code = req.body.code;
  let requestId = req.body.request_id;

  console.log("Code: " + code + " Request ID: " + requestId);

  vonage.verify.check({ request_id: requestId, code: code }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(result);
      if (result && result.status == "0") {
        res.status(200).send(result);
        console.log("Account verified!");
      } else {
        res.status(400).send(result);
        console.log("Error verifying account");
      }
    }
  });
});

app.post("/call", (req, res) => {
  let to = req.body.to;
  let from = req.body.from;
  let answer_url = req.body.answer_url;
  console.log("====>", answer_url);

  vonage.calls.create(
    {
      to,
      from,
      // ncco: [
      //   {
      //     action: "talk",
      //     text: "Safely handling environment variables makes coding even more fun.",
      //   },
      // ],
      answer_url,
    },
    (error, response) => {
      if (error) {
        console.error(error);
      }
      if (response) console.log(response);
    }
  );
});

// import Vonage from "@vonage/server-sdk";

// const vonage = new Vonage({
//     apiKey: "4c2dcbbd",
//     apiSecret: "RIrUzpvTBGRQAj7p",
// });

// vonage.message.sendSms(
//     "33644633627",
//     "33664061086",
//     "This is the first message",
//     (err, responseData) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (responseData.messages[0]["status"] === "0") {
//                 console.dir(responseData);
//             } else {
//                 console.log(
//                     `Message failed with error: ${responseData.messages[0]["error-text"]}`
//                 );
//             }
//         }
//     }
// );
