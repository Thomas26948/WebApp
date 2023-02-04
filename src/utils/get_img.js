const https = require("https");

const get_img = (text, callback)=>{

    const data = JSON.stringify({inputs: text});

    const options = {
    hostname: "http://127.0.0.1:8000",
    path: "/image/",
    method: "GET"
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