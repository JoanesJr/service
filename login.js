const axios = require('axios');
const https = require('https');
require("dotenv").config();

const CompanyDB = process.env.CompanyDB;
const Password = process.env.Password;
const UserName = process.env.User;
const url = process.env.Url;

const login = async () => {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const loginConfig = JSON.stringify({
            "CompanyDB": CompanyDB,
            "Password": Password,
            "UserName": UserName,
        });

        let config = {
            method: "post",
            //url: 'https://consultsap:50000/b1s/v1/Login',
            url: url.concat('Login'),
            httpsAgent: agent,
            headers: {
                "Content-Type": "application/json",
            },
            data: loginConfig,
        };

        const { data } = await axios(config);
        return data;
    }catch(err) {
        console.log(err);
    }

    
}


module.exports = login;