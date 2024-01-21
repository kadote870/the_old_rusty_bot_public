import { variable } from '../../infrastructure/variables';
import { BotResponse, BotResponseAdminRestricted } from '../../infrastructure/classes';
import { fight_initiative } from './operator-damage';
import { pairs } from './gempukku';
import { L5RCharacter } from './character-creator';
import { reload_players } from './players-data';
import { get_random_value_from_array } from '../../infrastructure/functions';
import { settlementSpecializations } from './data/arr';

export class LegendOfTheFiveRingsMessenger {
   constructor(user: any, message: any) {
      (async (): Promise<void> => {
         switch (message.content.toLowerCase()) {
            case `fight init`:
               new BotResponse(
                  user,
                  message,
                  `${variable.codeBlock}${fight_initiative()}${variable.codeBlock}`
               );
               break;
            case `gem`:
               new BotResponse(user, message, pairs());
               break;
            case `npcc`:
               new BotResponse(user, message, new L5RCharacter().printer());
               break;
            case `reload`:
               new BotResponse(user, message, await reload_players());
               break;
            case `osada`:
               new BotResponseAdminRestricted(
                  user,
                  message,
                  await get_random_value_from_array(settlementSpecializations)
               );
               break;
         }
      })();
   }
}
