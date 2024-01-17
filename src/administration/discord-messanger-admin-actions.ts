import {BotResponse} from "../infrastructure/classes";
import {variable} from "../infrastructure/variables";

export class AdminActionsMessenger {
    constructor(user: any, message: any) {
        (async (): Promise<void> => {
            switch (message.content.toLowerCase()) {
                case `test`:
                    new BotResponse(user, message, 'dmg heal');
                    break;
                case `userid`:
                case `myid`:
                case `my id`:
                    new BotResponse(user, message, `${variable.codeBlock}${message.author.username}:${message.author.id}${variable.codeBlock}`);
                    break;
                case 'env':
                    const os = require('os');
                    new BotResponse(user, message, `${variable.codeBlock}Host device: ${os.hostname()}; Host system: ${os.type()}-${os.platform()}-${os.release()}${variable.codeBlock}`);
                    break;
                case `help`:
                    new BotResponse(user, message, `${variable.codeBlock}${variable.help}${variable.codeBlock}`);
                    break;
            }
        })();
    }
}