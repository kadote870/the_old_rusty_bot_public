import { Message, User } from 'discord.js';
import { AppDataSource } from '../../db/data-source';
import { Player } from '../../db/entities/player.entity';
import { variable } from '../../infrastructure/variables';

const playerRepository = AppDataSource.getRepository(Player);

async function db_actual_honor(userId: string): Promise<{ lvl: number; points: number }> {
   const honor = await playerRepository
      .createQueryBuilder('players')
      .select(['honorLvl', 'honorPoints'])
      .where('userId = :userId', { userId: userId })
      .getRawOne();

   return {
      lvl: honor.honorLvl,
      points: honor.honorPoints,
   };
}

async function db_new_honor(userId: string, newPoints: number, newLvl: number) {
   await playerRepository
      .createQueryBuilder('players')
      .update('players')
      .set({
         honorPoints: newPoints,
         honorLvl: newLvl,
      })
      .where('userId = :userId', { userId: userId })
      .execute();
}

async function db_actual_glory(userId: string): Promise<{ lvl: number; points: number }> {
   const glory = await playerRepository
      .createQueryBuilder('players')
      .select(['gloryLvl', 'gloryPoints'])
      .where('userId = :userId', { userId: userId })
      .getRawOne();

   return {
      lvl: glory.gloryLvl,
      points: glory.gloryPoints,
   };
}

async function db_new_glory(userId: string, newPoints: number, newLvl: number) {
   await playerRepository
      .createQueryBuilder('players')
      .update('players')
      .set({
         gloryPoints: newPoints,
         gloryLvl: newLvl,
      })
      .where('userId = :userId', { userId: userId })
      .execute();
}

export class LegendGloryHonorOperator {
   constructor(user: User, message: Message) {
      const userMessage = message.content.toLowerCase();
      const userId: string = message.author.id;
      const honorDescriptions = [
         'Pies bez czci i wiary',
         'Niegodny zaufania',
         'Tego należy oczekiwać',
         'Wyjątkowy',
         'Dusza bez skazy',
         'Silny siłą tysiąca przodków',
      ];

      (async (): Promise<void> => {
         if (userMessage === 'honor status') {
            const honor = await db_actual_honor(userId);
            message.channel.send(
               `${variable.codeBlock}Poziom Honoru:${honor.lvl} - ${honorDescriptions[honor.lvl]}\nPunkty Honoru:${honor.points}${variable.codeBlock}`
            );
         }

         if (userMessage.startsWith('honor plus')) {
            const pattern = /[a-zA-Z.*]/;
            const args: string[] = userMessage.split(' ');
            const amount: number = parseInt(args[2]);
            if (args.length === 3 && !isNaN(amount) && amount > 0 && !pattern.test(args[2])) {
               const honor = await db_actual_honor(userId);
               const newHonorPoints = honor.points + amount;
               const calculateNewHonorLvl: string = newHonorPoints.toString();

               let newHonorLvl: number;
               if (newHonorPoints < 10) {
                  newHonorLvl = 0;
               } else {
                  newHonorLvl = parseInt(calculateNewHonorLvl[0]);
               }

               await db_new_honor(userId, newHonorPoints, newHonorLvl);

               const newHonor = await db_actual_honor(userId);
               message.channel.send(
                  `${variable.codeBlock}Dodano punkty honoru:${amount}\nPoziom Honoru:${newHonor.lvl} - ${honorDescriptions[newHonor.lvl]}\nPunkty Honoru:${newHonor.points}${variable.codeBlock}`
               );
            }
         }

         if (userMessage.startsWith('honor minus')) {
            const pattern = /[a-zA-Z.*]/;
            const args: string[] = userMessage.split(' ');
            const amount: number = parseInt(args[2]);
            const honor = await db_actual_honor(userId);

            if (args.length === 3 && !isNaN(amount) && amount > 0 && !pattern.test(args[2])) {
               if (honor.points >= amount) {
                  const newHonorPoints = honor.points - amount;
                  const calculateNewHonorLvl: string = newHonorPoints.toString();

                  let newHonorLvl: number;
                  if (newHonorPoints < 10) {
                     newHonorLvl = 0;
                  } else {
                     newHonorLvl = parseInt(calculateNewHonorLvl[0]);
                  }

                  await db_new_honor(userId, newHonorPoints, newHonorLvl);

                  const newHonor = await db_actual_honor(userId);
                  message.channel.send(
                     `${variable.codeBlock}Odjęto punkty honoru:${amount}\nPoziom Honoru:${newHonor.lvl} - ${honorDescriptions[newHonor.lvl]}\nPunkty Honoru:${newHonor.points}${variable.codeBlock}`
                  );
               } else {
                  message.channel.send(
                     `**${user}**:moneybag:${variable.codeBlock}Nie można przeprowadzić operacji:[${message.content}].\nPunkty honoru: ${honor.points}${variable.codeBlock}`
                  );
               }
            }
         }

         if (userMessage === 'glory status') {
            const glory = await db_actual_glory(userId);
            message.channel.send(
               `${variable.codeBlock}Poziom Chwały:${glory.lvl}\nPunkty Chwały:${glory.points}${variable.codeBlock}`
            );
         }

         if (userMessage.startsWith('glory plus')) {
            const pattern = /[a-zA-Z.*]/;
            const args: string[] = userMessage.split(' ');
            const amount: number = parseInt(args[2]);
            if (args.length === 3 && !isNaN(amount) && amount > 0 && !pattern.test(args[2])) {
               const glory = await db_actual_glory(userId);
               const newGloryPoints = glory.points + amount;
               const calculateNewGloryLvl: string = newGloryPoints.toString();
               const newGloryLvl: number = parseInt(calculateNewGloryLvl[0]);
               await db_new_glory(userId, newGloryPoints, newGloryLvl);

               const newGlory = await db_actual_glory(userId);
               message.channel.send(
                  `${variable.codeBlock}Dodano punkty chwały:${amount}\nPoziom Chwały:${newGlory.lvl}\nPunkty Chwały:${newGlory.points}${variable.codeBlock}`
               );
            }
         }

         if (userMessage.startsWith('glory minus')) {
            const pattern = /[a-zA-Z.*]/;
            const args: string[] = userMessage.split(' ');
            const amount: number = parseInt(args[2]);
            const glory = await db_actual_glory(userId);

            if (args.length === 3 && !isNaN(amount) && amount > 0 && !pattern.test(args[2])) {
               if (glory.points >= amount) {
                  const newGloryPoints = glory.points - amount;
                  const calculateNewGloryLvl: string = newGloryPoints.toString();
                  let newGloryLvl: number = parseInt(calculateNewGloryLvl[0]);
                  if (newGloryPoints < 10) {
                     newGloryLvl = 0;
                  }

                  await db_new_glory(userId, newGloryPoints, newGloryLvl);

                  const newGlory = await db_actual_glory(userId);
                  message.channel.send(
                     `${variable.codeBlock}Odjęto punkty chwały:${amount}\nPoziom Chwały:${newGlory.lvl}\nPunkty Chwały:${newGlory.points}${variable.codeBlock}`
                  );
               } else {
                  message.channel.send(
                     `**${user}**:moneybag:${variable.codeBlock}Nie można przeprowadzić operacji:[${message.content}].\nPunkty chwały: ${glory.points}${variable.codeBlock}`
                  );
               }
            }
         }
      })();
   }
}
