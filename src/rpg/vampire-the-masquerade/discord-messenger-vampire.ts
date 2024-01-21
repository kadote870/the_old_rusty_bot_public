import { variable } from '../../infrastructure/variables';
import { vampireStatus } from '../../administration/administartion';
import { BotResponse } from '../../infrastructure/classes';
import { VampireHumanNpc, VampireNpc } from './vampire-npc';

export class VampireTheMasqueradeMessenger {
   constructor(user: any, message: any) {
      (async (): Promise<void> => {
         if (vampireStatus) {
            switch (message.content.toLowerCase()) {
               case 'npc':
                  new BotResponse(
                     user,
                     message,
                     `${variable.codeBlock}${new VampireNpc().printer()}${variable.codeBlock}`
                  );
                  break;
               case 'eccehomo':
               case 'ecce homo':
                  new BotResponse(
                     user,
                     message,
                     `${variable.codeBlock}${new VampireHumanNpc().printer()}${variable.codeBlock}`
                  );
                  break;
            }
         } else {
            message.channel.send(
               `${variable.codeBlock}[USER MESSAGE:${message.content}] INFO: Command disabled${variable.codeBlock}`
            );
         }
      })();
   }
}
