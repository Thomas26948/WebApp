const https = require("https");

const hf = (text, callback)=>{

    const data = JSON.stringify({inputs: text});

    const options = {
    hostname: "api-inference.huggingface.co",
    path: "/models/t5-small",
    method: "POST",
    headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
        "Content-Length": data.length
    }
    };
    
    const query = () => {
        return new Promise((resolve, reject) => {
          const req = https.request(options, (res) => {
            let result = "";
            res.on("data", (chunk) => {
              result += chunk;
            });
            res.on("end", () => {
              const json = JSON.parse(result);
              resolve(json);
            });
          });
      
          req.on("error", (error) => {
            console.error(`problem with request: ${error.message}`);
            reject(error);
          });
      
          req.write(data);
          req.end();
        });
      };
      
    query().then((response) => {
        callback(undefined, {
            translation: response[0]["translation_text"]
        });
    });
}
module.exports = hf