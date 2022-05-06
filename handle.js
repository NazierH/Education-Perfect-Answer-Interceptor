const fs = require('fs');
const { exec } = require("child_process");

/* exec("mitmweb -s main.py", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
}); */

function handle() {
    //get json from file
    const data = fs.readFileSync('questions.json');
    //convert byte array to json
    const jsonstr = JSON.parse(data);
    jsonData = JSON.parse(jsonstr);
    questions = jsonData['result']['Questions'];
    for (let i = 0; i < questions.length; i++) {
        try {
            var options = questions[i]['Definition']['Components'][0]['Options']
        //check to see if Correct = true 
        for (j = 0; j < options.length; j++) {
        if (options[j]['Correct'] == 'true') {

            console.log(questions[i]['Definition']['Title'])
            console.log("--------------------------------");
            console.log(options[j]['TextTemplate']);
            console.log("\n\n");


        }

    }
    } catch (error) {
        
    }
    
}
}
handle();