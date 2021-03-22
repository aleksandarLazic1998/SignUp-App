//jshint esversion: 6
'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//Getting home page request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

//posting on home page
app.post('/', (req, res) => { 
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName

            }
        }
    ]
};

app.post('/failure',(req,res)=>{
    res.redirect('/');
})

    const jsonData = JSON.stringify(data);

    // https.request(url, options,(response){})
    const url = `https://us1.api.mailchimp.com/3.0/lists/${id}`;

    const options = {
        method: 'POST',
        auth: 'YourApiKey'
    };

    const request = https.request(url, options, (response) => {
if(response.statusCode=== 200){
    
        res.sendFile(__dirname + '/success.html');
    
}else{
    
        res.sendFile(__dirname + '/failure.html');

    
}

        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

});


//Listening for server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is working on port ${process.env.PORT} !`);
});


