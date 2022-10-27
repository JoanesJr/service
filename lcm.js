const axios = require('axios');
const https = require('https');
const { list } = require('node-windows');
require("dotenv").config();


const CompanyDB = process.env.CompanyDB;
const Password = process.env.Password;
const UserName = process.env.User;
const url = process.env.Url;

const agent = new https.Agent({
    rejectUnauthorized: false,
});

const EstornaLCM = async (lcm, token) => {

    try {
        const data = JSON.stringify({
            "UseAutoStorno": "Y",
            "StornoDate": lcm.StornDate.split('/').reverse().join('-')
        });


        var config = {
            method: 'patch',
            url: `https://localhost:50000/b1s/v1/JournalEntries(${lcm.TransId})`,
            httpsAgent: agent,
            headers: {
                'Cookie': 'B1SESSION=' + token + '; ROUTEID=.node1'
            },
            data: data
        };

        const response = await axios(config);
    }catch(err) {
        console.log(err);
    }

    
}


module.exports = EstornaLCM;