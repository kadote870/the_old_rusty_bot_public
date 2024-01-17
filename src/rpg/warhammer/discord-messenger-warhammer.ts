import {variable} from "../../infrastructure/variables";
import {warhammerStatus} from "../../administration/administartion";
import {Dwarf, Elf, Halfling, Human} from "./npc";
import {BotResponse} from "../../infrastructure/classes";

export class WarhammerMessenger {
    constructor(user: any, message: any) {
        (async (): Promise<void> => {
            if (warhammerStatus) {
                switch (message.content.toLowerCase()) {
                    case ('warhammer human'):
                        new BotResponse(user, message, `${variable.codeBlock}${new Human().printer()}${variable.codeBlock}`);
                        break
                    case ('warhammer elf'):
                        new BotResponse(user, message, `${variable.codeBlock}${new Elf().printer()}${variable.codeBlock}`);
                        break
                    case ('warhammer dwarf'):
                        new BotResponse(user, message, `${variable.codeBlock}${new Dwarf().printer()}${variable.codeBlock}`);
                        break
                    case ('warhammer halfling'):
                        new BotResponse(user, message, `${variable.codeBlock}${new Halfling().printer()}${variable.codeBlock}`);
                        break
                }
            } else {
                message.channel.send(`${variable.codeBlock}[USER MESSAGE:${message.content}] INFO: Command disabled${variable.codeBlock}`);
            }
        })();
    }
}