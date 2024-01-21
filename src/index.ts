import './express-server';
import { dotArt, variable } from './infrastructure/variables';
import { games } from './rpg/common-elements/gambling';
import {
   BotResponse,
   Client,
   BotAuthorization,
   RustyBotDevMessage,
   Kangaroo,
   ConsoleLogArchiver,
} from './infrastructure/classes';
import { rewardValue, userRecognize } from './administration/administartion';
import { VampireRoll } from './rpg/vampire-the-masquerade/roll';
import { randomNumber } from './rpg/common-elements/dice-roll';
import { change_userName_in_messages_created_by_bot } from './infrastructure/functions';
import { LegendRoll } from './rpg/l5r/operator-dice-roll';
import { LegendDamageOperator } from './rpg/l5r/operator-damage';
import { BankOperator } from './rpg/common-elements/operator-bank';
import { WarhammerMessenger } from './rpg/warhammer/discord-messenger-warhammer';
import { VampireTheMasqueradeMessenger } from './rpg/vampire-the-masquerade/discord-messenger-vampire';
import { LegendOfTheFiveRingsMessenger } from './rpg/l5r/discord-messenger-l5r';
import { AdminActionsMessenger } from './administration/discord-messanger-admin-actions';
import { LegendGloryHonorOperator } from './rpg/l5r/operator-honor-glory';

new BotAuthorization();
new RustyBotDevMessage();

Client.on('messageCreate', async (message) => {
   if (message.author.bot) return;
   let user: any = message.member?.displayName;
   if (userRecognize.enabled) {
      user = change_userName_in_messages_created_by_bot(message, user);
   }

   // Global
   new AdminActionsMessenger(user, message);
   new Kangaroo(message);
   new ConsoleLogArchiver(message);
   // rpgCommon
   new BankOperator(user, message);
   // Vampire
   new VampireTheMasqueradeMessenger(user, message);
   new VampireRoll(user, message);
   // Legend of the Five Rings
   new LegendOfTheFiveRingsMessenger(user, message);
   new LegendRoll(user, message);
   new LegendDamageOperator(user, message);
   new LegendGloryHonorOperator(user, message);
   // Warhammer
   new WarhammerMessenger(user, message);

   switch (message.content.toLowerCase()) {
      // Global
      case `rasista`:
         new BotResponse(
            user,
            message,
            `# [${user}, dlaczego dzbanie nie pamiętasz gdzie jest karta?](https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxx)`
         );
         break;
      case `giga`:
         new BotResponse(user, message, dotArt.gigaChad);
         break;
      case 'coin':
         new BotResponse(user, message, games.coin_flipper(user));
         break;
      case 'reward':
         new BotResponse(
            user,
            message,
            `${variable.codeBlock}Nagroda: ${randomNumber(rewardValue.min, rewardValue.max)}${variable.codeBlock}`
         );
         break;
      case 'nieparzyste':
      case 'nie parzyste':
         new BotResponse(user, message, games.gambling_odd_number(user));
         break;
      case 'parzyste':
         new BotResponse(user, message, games.gambling_even_number(user));
         break;
   }
});