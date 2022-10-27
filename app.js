const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');
const Login = require("./login");
const EstornaLCM = require("./lcm")
require("dotenv").config();
let results = [];
const minutes = process.env.MinutesRun;
const ms = minutes*1000*60;

let path = process.env.FilePath;

const port = 8000;

let token = null;
let sessionTimeOut = null;
let lastLoginHour = null;
let lastLoginMinute = null;

try {
    const loggon = async () => {
        const data = await Login();
        token = data.SessionId
        sessionTimeOut = data.SessionTimeout;
        let date = new Date();
        lastLoginHour = date.getHours();
        lastLoginMinute = date.getMinutes();
    }

    const runService = async () => {
        let date = new Date();
        let nowHours = date.getHours();
        let nowMinutes = date.getMinutes();
        if ((nowHours == lastLoginHour && (nowMinutes - lastLoginMinute) > sessionTimeOut) || nowHours != lastLoginHour) {
            await loggon();
        }

        if(fs.existsSync(path)) {
            fs.createReadStream(path).pipe(csv())
                .on('data', async data => {
                    console.log(data)
                    results.push(data);
                }).on('end', async () => {
                    results.map(async (value) => {
                        await EstornaLCM(value, token);
                    })

                    results = []

                    fs.unlink(path, () => {
                        console.log("arquivo deletado")
                    });
                })
        }       
    }

    app.listen(port, () => {
        console.log("server as been runned in port " + port);
        loggon();
        setInterval(runService, ms);
    })
}catch(e) {
    console.log("algo deu errado")
}

