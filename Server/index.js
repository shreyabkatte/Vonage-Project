import express from "express";
import Vonage from "@vonage/server-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const vonage = new Vonage({
  apiKey: "4c2dcbbd",
  apiSecret: "RIrUzpvTBGRQAj7p",
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

// SMS API
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
        console.log(err.message);
        throw new Error(err.message);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.dir(responseData);
          res.status(200).send(responseData);
        } else {
          // console.log(
          //   `Message failed with error: ${responseData.messages[0]["error-text"]}`
          // );
          throw new Error(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
        }
      }
    }
  );
});

// Verify Request
app.post("/request", (req, res) => {
  // Verify code
  vonage.verify.request(
    { number: req.body.number, brand: req.body.brand },
    (err, result) => {
      if (err) {
        console.log(err);
        // error
        // res.status(500).send(err);
        throw new Error(err);
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

// Verify Check
app.post("/check", (req, res) => {
  //To verify the phone number the request ID and code are required.
  let code = req.body.code;
  let requestId = req.body.request_id;

  console.log("Code: " + code + " Request ID: " + requestId);

  vonage.verify.check({ request_id: requestId, code: code }, (err, result) => {
    if (err) {
      console.log(err);
      // res.status(500).send(err);
      throw new Error(err);
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

// Voice API (Text to speech)
app.post("/call", (req, res) => {
  let to = req.body.to;
  let from = req.body.from;
  let ncco = req.body.ncco;

  vonage.calls.create(
    {
      to,
      from,
      ncco,
    },
    (error, response) => {
      if (error) {
        console.error(error);
        throw new Error(error);
      }
      if (response) {
        res.status(200).send(response);
        console.log(response);
      }
    }
  );
});
