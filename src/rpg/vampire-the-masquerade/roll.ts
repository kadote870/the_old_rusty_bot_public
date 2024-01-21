import { randomNumber } from '../common-elements/dice-roll';
import { rollHelper, vampireStatus } from '../../administration/administartion';
import { variable } from '../../infrastructure/variables';

export class VampireRoll {
   constructor(user: any, message: any) {
      (async () => {
         const userMessage = message.content.toLowerCase();
         if (userMessage.startsWith(variable.rollPrefix)) {
            let response: string;
            const pattern = /[a-zA-Z.*]/;
            const args = userMessage.split(variable.rollPrefix);
            const diceCount: number = parseInt(args[1]);

            if (args.length === 2 && !isNaN(diceCount) && !pattern.test(args[1])) {
               if (!vampireStatus) {
                  message.channel.send(
                     `${variable.codeBlock}[USER MESSAGE:${message.content}] INFO: Command disabled${variable.codeBlock}`
                  );
               } else {
                  if (diceCount < 1) {
                     response = `${variable.codeBlock}[USER MESSAGE:${message.content}] ERROR: Min dice count is 1${variable.codeBlock}`;
                     message.channel.send(response);
                  } else if (diceCount > 100) {
                     response = `${variable.codeBlock}[USER MESSAGE:${message.content}] ERROR: Max dice count is 100${variable.codeBlock}`;
                     message.channel.send(response);
                  } else {
                     response = await vampire_the_masquerade_roll_dice_and_create_result_message(
                        user,
                        message,
                        diceCount
                     );
                     message.channel.send(response);
                  }
               }
            }
         }
      })();
   }
}

async function vampire_roll(diceCount: number): Promise<number[]> {
   // roll (howManyDice: number)d10
   const sortDesc = (a: number, b: number) => b - a;
   const diceRoll = (howManyDice: number) => {
      let rollResults: number[] = [];
      for (let i: number = 0; howManyDice > i; i++) {
         rollResults.push(randomNumber(1, 10));
      }
      return rollResults;
   };
   return diceRoll(diceCount).sort(sortDesc);
}

async function vampire_roll_row(
   diceCount: number,
   minSingleRoll: number,
   maxSingleRoll: number
): Promise<number[]> {
   // roll (howManyDice: number)d10
   const sortDesc = (a: number, b: number) => b - a;
   const diceRoll = (howManyDice: number) => {
      let rollResults: number[] = [];
      for (let i: number = 0; howManyDice > i; i++) {
         rollResults.push(randomNumber(minSingleRoll, maxSingleRoll));
      }
      return rollResults;
   };
   return diceRoll(diceCount).sort(sortDesc);
}

async function vampire_the_masquerade_roll_dice_and_create_result_message(
   user: any,
   message: any,
   diceCount: number
): Promise<string> {
   const common: number[] = await vampire_roll(diceCount);
   const helper: number[] = await vampire_roll_row(
      diceCount,
      rollHelper.helperMinSingleRoll,
      rollHelper.helperMaxSingleRoll
   );
   const distractor: number[] = await vampire_roll_row(
      diceCount,
      rollHelper.distractedMinSingleRoll,
      rollHelper.distractedMaxSingleRoll
   );

   let messageToReturn: string = `**${user}**:game_die:${variable.codeBlock}[${common.join('] [')}]${variable.codeBlock}`;

   if (rollHelper.helperStatus) {
      if (message.author.username === rollHelper.helper) {
         messageToReturn = `**${user}**:game_die: ${variable.codeBlock}[${helper.join('] [')}]${variable.codeBlock}`;
      }
   }

   if (rollHelper.distractorStatus) {
      if (message.author.username === rollHelper.distracted) {
         messageToReturn = `**${user}**:game_die: ${variable.codeBlock}[${distractor.join('] [')}]${variable.codeBlock}`;
      }
   }

   const modifyRoll10: string = messageToReturn.replace(/\[10]/g, '[*10*]');
   const modifyRoll1: string = modifyRoll10.replace(/\[1]/g, '[*1*]');

   return modifyRoll1;
}
