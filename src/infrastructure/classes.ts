import fs from 'fs';
import { botStartTime, variable } from './variables';
import { randomNumber } from '../rpg/common-elements/dice-roll';
import Discord from 'discord.js';
import {
   archiver,
   archiveUserMessages,
   kangaroo,
   legendStatus,
   rollHelper,
   STANDARD_USERS,
   userRecognize,
   vampireStatus,
   warhammerStatus,
} from '../administration/administartion';
import { devMessenger, get_random_value_from_array } from './functions';

export const Client = new Discord.Client({
   intents: [
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.GuildMembers,
      Discord.GatewayIntentBits.DirectMessages,
      Discord.GatewayIntentBits.MessageContent,
      Discord.GatewayIntentBits.Guilds,
   ],
   partials: [
      Discord.Partials.Message,
      Discord.Partials.Channel,
      Discord.Partials.GuildMember,
      Discord.Partials.User,
      Discord.Partials.GuildScheduledEvent,
   ],
});

export class BotAuthorization {
   constructor() {
      require('dotenv').config();
      Client.login(process.env.TOKEN);
   }
}

const log_creator = () => {
   if (archiver) {
      const logFileStream: fs.WriteStream = fs.createWriteStream('log.txt', {
         flags: 'a',
      });
      return (console.log = (data) => {
         logFileStream.write(data + '\n'); // Dodaj nową linię na końcu
         process.stdout.write(data + '\n'); // Wypisz również na konsoli
      });
   }
};

export class RustyBotDevMessage {
   constructor() {
      const os = require('os');

      Client.on('ready', (client) => {
         // prettier-ignore
         console.log(`***************************************************************************
 ` + '\x1b[31m' + `____            _         ____        _` + '\x1b[0m' + `
` + '\x1b[31m' + `|  _ \\ _   _ ___| |_ _   _| __ )  ___ | |_` + '\x1b[0m' + `    ${client.user.username}⠀⠀
` + '\x1b[31m' + `| |_) | | | / __| __| | | |  _ \\ / _ \\| __|` + '\x1b[0m' + `   ${btoa(client.user.id)}
` + '\x1b[31m' + `|  _ <| |_| \\__ \\ |_| |_| | |_) | (_) | |_` + '\x1b[0m' + `    ${client.user.tag}⠀⠀
` + '\x1b[31m' + `|_| \\_\\\\__,_|___/\\__|\\__, |____/ \\___/ \\__|` + '\x1b[0m' + `
                     ` + '\x1b[31m' + `|___/` + '\x1b[0m' + `                 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀` + '\x1b[33m' + '⣠⡴⡢⡶⠶⢢⢄' + '\x1b[0m' + `⠀ ⠀⠀⠀⠀* Administration parameters:
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀` + '\x1b[33m' + '⢰⢏⣺⢿⣿⣾⣹⣷⢡' + '\x1b[0m' + ` ⠀⠀* userRecognize:[${userRecognize.enabled}]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀` + '\x1b[33m' + '⢾⣾⣟⠝⠀⠨⠉⢹⡏' + '\x1b[0m' + `⠀ ⠀* helper[${rollHelper.helper}]:[${rollHelper.helperStatus}]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀` + '\x1b[33m' + '⣾⣻⡇⠘⠿⢾⢐⣶⠃' + '\x1b[0m' + `⠀⠀⠀⠀* distractor[${rollHelper.distracted}]:[${rollHelper.distractorStatus}]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀` + '\x1b[33m' + '⣱⣾⣷⣦⣠⡾⣃⡐' + '\x1b[0m' + `⠀⠀⠀⠀⠀* archiver:[${archiver}] 
⠀⠀⠀⠀⠀` + '\x1b[33m' + '⣀⡀⣀⣀⣤⣤⣠⡟⢻⣿⣿⣏⠻⡿' + '\x1b[0m' + `⠀⠀⠀⠀⠀⠀* archiveUserMessages:[${archiveUserMessages}]
⠀` + '\x1b[33m' + '⣠⡾⢿⡿⠿⠿⢿⣻⣿⡋⠉⡇⠀⣿⠛⠻⠿⢇' + '\x1b[0m' + `⠀⠀⠀⠀⠀⠀* warhammerStatus:[${warhammerStatus}]
` + '\x1b[33m' + '⣸⠋⠀⣿⠀⠀⠀⠀⠈⠙⢷⠀⢰⣰⠃⡠⢔⠄⠀⠀⢄' + '\x1b[0m' + `⠀⠀⠀⠀  * vampireStatus:[${vampireStatus}]
` + '\x1b[33m' + '⢻⡄⠀⠛⢆⠀⠀⠀⠀⠀⠈⢿⣿⣿⠞⠛⠉⠁⠉⠢⡀⠑⢀' + '\x1b[0m' + `⠀⠀  * legendStatus:[${legendStatus}]
⠀` + '\x1b[33m' + '⣷⢀⣶⢿⣷⠀⠀⠀⠀⠀⢸⡟⠀⠀⠀⠀⠀⠀⠀⠈⠆⠀⠡' + '\x1b[0m' + `⠀     * kangaroo:[${kangaroo}]
` + '\x1b[33m' + '⠞⢁⡼⢯⣠⣿⠀⠀⠀⠀⢀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⡀' + '\x1b[0m' + `⠀⠀⠀   
` + '\x1b[33m' + '⠖⠋⠀⠀⢻⣿⣄⡀⠀⢀⣾⡏⠀⠀⠀⠀⠀⢀⢰⡴⠀⠧⠀⠘' + '\x1b[0m' + `⠀    
⠀⠀⠀⠀⠀` + '\x1b[33m' + '⣿⡝⣻⣿⣿⣿⣿⣦⣄⡀⠀⢔⡵⡟⡇⠀⠀⠱⠈⡄' + '\x1b[0m' + ` Device:[${os.hostname()}]     
⠀⠀⠀⠀⠀` + '\x1b[33m' + '⣾⣹⡯⠤⢄⣏⣀⡈⣹⡟⡩⢋⢼⡄⢹⠀⠀⠌⠀⠇' + '\x1b[0m' + ` System:[${os.type()},${os.platform()},${os.release()}]
⠀⠀⠀⠀` + '\x1b[33m' + '⢀⡟⢾⣤⣀⢤⡯⠄⠉⠁⡇⠐⢔⠀⠻⣇⣷⠈⢆⠀⡂' + '\x1b[0m' + ` Bot started [${botStartTime.currentDate}] at [${botStartTime.currentTime}]
***************************************************************************`);
      });
      log_creator();
   }
}

export class ConsoleLogArchiver {
   constructor(message: any) {
      if (archiver && archiveUserMessages) {
         const date: Date = new Date();
         const logMessage: string = `[${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}][${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}][${message.guild.name}|${message.channel.name}][${message.author.tag}][${message.author.id}]${message.content}`;
         console.log(logMessage);
      }
      log_creator();
   }
}

export class BotResponse {
   constructor(user: any, message: any, command: any) {
      (async () => {
         message.channel.send(command.toString());
         if (archiver) {
            console.log(devMessenger(command, user, message));
         }
         // log_creator();
      })();
   }
}

export class BotResponseAdminRestricted {
   adminId: string = '293828266144301058';

   constructor(user: any, message: any, command: any) {
      (async () => {
         if (message.author.id === this.adminId) {
            message.channel.send(command);
            if (archiver) {
               console.log(devMessenger(command, user, message));
            }
         }
      })();
   }
}

export class Kangaroo {
   constructor(message: any) {
      if (message.author.username === STANDARD_USERS.max) {
         if (kangaroo) {
            const randomizer: number = randomNumber(1, 3);
            if (randomizer === 3) {
               message.channel.send(
                  get_random_value_from_array(variable.kangarooRage)
               );
            } else {
               message.channel.send(this.kangarooChain(randomNumber(1, 10)));
            }
         } else {
            message.channel.send(
               `Chciałbym wysłać pięknego kangura, ale **${get_random_value_from_array(variable.insults)}** nie życzy sobie tego ;(`
            );
         }
      }
   }

   kangarooChain(count: number): string {
      const EMOJI_NAME: ':kangaroo:' = ':kangaroo:';
      const emojis: string[] = [];

      for (let i: number = 0; i < count; i++) {
         emojis.push(EMOJI_NAME);
      }
      return emojis.join('');
   }
}
