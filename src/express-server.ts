import express from 'express';
import apiEndpointBank from "./api/api-endpoint-bank";
import apiEndpoinDmg from "./api/api-endpoin-dmg";
import apiEndpointPlayers from "./api/api-endpoint-players";
import {botStartTime} from "./infrastructure/variables";
import {AppDataSource} from "./db/data-source";

const app = express();
app.use(express.json());
app.use(apiEndpointBank, apiEndpoinDmg, apiEndpointPlayers);

const rustyExpressLogo = ` ____            _           _____                                 _
|  _ \\ _   _ ___| |_ _   _  | ____|_  ___ __  _ __ ___  ___ ___   (_)___
| |_) | | | / __| __| | | | |  _| \\ \\/ / '_ \\| '__/ _ \\/ __/ __|  | / __|
|  _ <| |_| \\__ \\ |_| |_| | | |___ >  <| |_) | | |  __/\\__ \\__ \\_ | \\__ \\
|_| \\_\\\\__,_|___/\\__|\\__, | |_____/_/\\_\\ .__/|_|  \\___||___/___(_)/ |___/
                     |___/             |_|                      |__/`
AppDataSource.initialize().then(() => {
    app.use(apiEndpointBank, apiEndpoinDmg, apiEndpointPlayers);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log('\x1b[31m' + '\n' + rustyExpressLogo + '\x1b[0m' + '\n' + `Rusty server is running on port ${PORT}`);
    });

    app.get('/api', (req, res) => {
        const os = require('os');
        const responseData = {
            message: `Hello world! Rusty bot endpoint!`,
            startTime: `${botStartTime.currentDate} ${botStartTime.currentTime}`,
            hostDevice: os.hostname(),
            hostSystem: `${os.type()}-${os.platform()}-${os.release()}`
        };
        res.json(responseData);
    });
}).catch(error => console.log("Error: ", error));