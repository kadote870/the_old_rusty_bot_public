import { variable } from '../../infrastructure/variables';
import { db_select_player_bankBalance, db_update_player_bankBalance } from '../../db/data-base';

export class BankOperator {
   constructor(user: any, message: any) {
      const userId = message.author.id;
      const userMessage = message.content.toLowerCase();

      (async (): Promise<void> => {
         if (userMessage === 'bank status') {
            const currentBalance = await db_select_player_bankBalance(userId);
            message.channel.send(
               `**${user}**:moneybag:${variable.codeBlock}Zawartość sakiweki: ${currentBalance}${variable.codeBlock}`
            );
         }

         if (userMessage.startsWith('bank plus')) {
            const pattern = /[a-zA-Z.*]/;
            const args: string[] = userMessage.split(' ');
            const amount: number = parseInt(args[2]);
            if (args.length === 3 && !isNaN(amount) && amount > 0 && !pattern.test(args[2])) {
               const oldBalance = await db_select_player_bankBalance(userId);
               await db_update_player_bankBalance(userId, oldBalance + amount);
               const newBalance = await db_select_player_bankBalance(userId);

               message.channel.send(
                  `**${user}**:moneybag:${variable.codeBlock}Dodano ${amount}.\nObecna zawartość sakiewki: ${newBalance}${variable.codeBlock}`
               );
            }
         }

         if (userMessage.startsWith('bank minus')) {
            const pattern = /[a-zA-Z.*]/;
            const args: string[] = userMessage.split(' ');
            const amount: number = parseInt(args[2]);
            const oldBalance = await db_select_player_bankBalance(userId);

            if (args.length === 3 && !isNaN(amount) && amount > 0 && !pattern.test(args[2])) {
               if (oldBalance >= amount) {
                  await db_update_player_bankBalance(userId, oldBalance - amount);
                  const newBalance = await db_select_player_bankBalance(userId);
                  message.channel.send(
                     `**${user}**:moneybag:${variable.codeBlock}Odjęto ${amount}.\nObecna zawartość sakiewki: ${newBalance}${variable.codeBlock}`
                  );
               } else {
                  message.channel.send(
                     `**${user}**:moneybag:${variable.codeBlock}Nie można przeprowadzić operacji:[${message.content}].\nZawartość sakiewki: ${oldBalance}${variable.codeBlock}`
                  );
               }
            }
         }
      })();
   }
}
