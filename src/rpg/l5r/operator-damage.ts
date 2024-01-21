import { randomNumber } from '../common-elements/dice-roll';
import { variable } from '../../infrastructure/variables';
import { read_all_characters } from '../../infrastructure/functions';
import {
   db_select_player_all_data,
   db_select_player_damageBalance,
   db_update_player_damageBalance,
   db_update_player_woundsMathLevel,
} from '../../db/data-base';
import { ADMIN_COMMAND_BLOCK_MESSAGE, ADMIN_DISCORD_ID } from '../../administration/administartion';
import { AppDataSource } from '../../db/data-source';
import { Player } from '../../db/entities/player.entity';

export const fight_initiative = () => {
   const characters = read_all_characters('./src/db/players-db.json');
   const fighters = [];

   for (let element of characters) {
      let playerInitiative;
      const checkSchool = element.data.school?.toLowerCase();

      if (checkSchool === 'kakita') {
         playerInitiative = {
            name: element.data.characterName,
            initiative: element.stats.refleks + randomNumber(1, 10) + element.skills.iaijutsu,
         };
      } else {
         playerInitiative = {
            name: element.data.characterName,
            initiative: element.stats.refleks + randomNumber(1, 10),
         };
      }
      fighters.push(playerInitiative);
   }

   fighters.sort((a, b) => b.initiative - a.initiative);

   const preResult = fighters.map((item) => `[player ${item.name}: inicjatywa ${item.initiative}]`);
   return preResult.join('\n');
};

async function wound_level_calculator(userId: string, damageTaken: number) {
   const playerData = await db_select_player_all_data(userId);

   const oldDamageBalance = await db_select_player_damageBalance(userId);
   await db_update_player_damageBalance(userId, oldDamageBalance + damageTaken);
   const newDamageBalance = await db_select_player_damageBalance(userId);

   if (playerData) {
      const dmgStatus = {
         lvl0: playerData.woundsOnLvl, // 0
         lvl1: playerData.woundsOnLvl * 2, // -1
         lvl2: playerData.woundsOnLvl * 3, // -2
         lvl3: playerData.woundsOnLvl * 4, // -3
         lvl4: playerData.woundsOnLvl * 5, // -4
         lvl5: playerData.woundsOnLvl * 6, // obalony
         lvl6: playerData.woundsOnLvl * 7, // nieprzytomny
         lvl7: playerData.woundsOnLvl * 8, // martwy
      };

      let damageResult: string;
      let woundsMathLevel = 0;

      switch (true) {
         case dmgStatus.lvl0 >= newDamageBalance:
            damageResult = '**[0]**[-1][-2][-3][-4][Obalony][Nieprzytomny][Umierający][Śmierć]';
            woundsMathLevel = 0;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
         case dmgStatus.lvl1 >= newDamageBalance:
            damageResult = '[0]**[-1]**[-2][-3][-4][Obalony][Nieprzytomny][Umierający][Śmierć]';
            woundsMathLevel = -1;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
         case dmgStatus.lvl2 >= newDamageBalance:
            damageResult = '[0][-1]**[-2]**[-3][-4][Obalony][Nieprzytomny][Umierający][Śmierć]';
            woundsMathLevel = -2;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
         case dmgStatus.lvl3 >= newDamageBalance:
            damageResult = '[0][-1][-2]**[-3]**[-4][Obalony][Nieprzytomny][Umierający][Śmierć]';
            woundsMathLevel = -3;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
         case dmgStatus.lvl4 >= newDamageBalance:
            damageResult = '[0][-1][-2][-3]**[-4]**[Obalony][Nieprzytomny][Umierający][Śmierć]';
            woundsMathLevel = -4;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
         case dmgStatus.lvl5 >= newDamageBalance:
            damageResult = '[0][-1][-2][-3][-4]**[Obalony]**[Nieprzytomny][Umierający][Śmierć]';
            woundsMathLevel = -4;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
         case dmgStatus.lvl6 >= newDamageBalance:
            damageResult = '[0][-1][-2][-3][-4][Obalony]**[Nieprzytomny]**[Umierający][Śmierć]';
            woundsMathLevel = -4;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
         case dmgStatus.lvl7 >= newDamageBalance:
            damageResult = '[0][-1][-2][-3][-4][Obalony][Nieprzytomny]**[Umierający]**[Śmierć]';
            woundsMathLevel = -4;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
         default:
            damageResult = '[0][-1][-2][-3][-4][Obalony][Nieprzytomny][Umierający]**[Śmierć]**';
            woundsMathLevel = -4;
            await db_update_player_woundsMathLevel(userId, woundsMathLevel);
            break;
      }
      return `[${playerData.characterName}][${playerData.woundsAll - newDamageBalance}/${playerData.woundsAll}]\n${damageResult}`;
   } else {
      console.log(`DB error during select player id: ${userId} - probably player was not found`);
   }
}

export class LegendDamageOperator {
   constructor(user: any, message: any) {
      const userMessage = message.content.toLowerCase();
      const userId: string = message.author.id;

      (async (): Promise<void> => {
         if (userMessage === 'dmg status') {
            const woundResult = await wound_level_calculator(userId, 0);
            await message.channel.send(`**${user}**:game_die:${variable.codeBlock}${woundResult}${variable.codeBlock}`);
         }

         if (userMessage.startsWith('dmg plus')) {
            const pattern = /[a-zA-Z.*]/;
            const args: string[] = message.content.split(' ');
            const amount: number = parseInt(args[2]);

            if (args.length === 3 && !isNaN(amount) && amount > 0 && !pattern.test(args[2])) {
               const woundResult = await wound_level_calculator(userId, amount);
               await message.channel.send(
                  `**${user}**:game_die:${variable.codeBlock}Dodano ${amount} obrażeń.\n${woundResult}${variable.codeBlock}`
               );
            }
         }

         if (userMessage.startsWith('dmg minus')) {
            const pattern = /[a-zA-Z.*]/;
            const args: string[] = message.content.split(' ');
            const amount: number = parseInt(args[2]);
            const amountForSubtract = amount - amount * 2;

            const actualDamageLvl = await db_select_player_damageBalance(userId);

            if (args.length === 3 && !isNaN(amount) && amount > 0 && !pattern.test(args[2])) {
               if (actualDamageLvl >= amount) {
                  const woundResult = await wound_level_calculator(userId, amountForSubtract);
                  await message.channel.send(
                     `**${user}**:game_die:${variable.codeBlock}Odjęto ${amount} obrażeń.\n${woundResult}${variable.codeBlock}`
                  );
               } else {
                  const woundResult = await wound_level_calculator(userId, 0);
                  await message.channel.send(
                     `**${user}**:game_die:${variable.codeBlock}Nie można przeprowadzić operacji:[${message.content}].\n${woundResult}\nMaksymalna możliwa wartość to: ${actualDamageLvl}${variable.codeBlock}`
                  );
               }
            }
         }
         if (message.author.id === ADMIN_DISCORD_ID) {
            if (userMessage === 'dmg heal') {
               let response = 'Rany nie zostały wyleczone - błąd podczas aktualizacji bazy danych.';

               async function updateAllRows() {
                  await AppDataSource.createQueryBuilder().update(Player).set({ damageBalance: 0 }).execute();
               }

               await updateAllRows()
                  .then(() => (response = 'Wszyscy zdrowi'))
                  .catch((err) => console.error('Błąd podczas aktualizacji:', err));

               await message.channel.send(`admin-action:warning:${variable.codeBlock}${response}${variable.codeBlock}`);
            }
         }
         // if (userMessage === prefixLower + "new day") {
         if (userMessage === 'new day') {
            if (message.author.id === ADMIN_DISCORD_ID) {
               const playerRepository = AppDataSource.getRepository(Player);
               const players = [];

               const maxId = await playerRepository.createQueryBuilder('players').select('MAX(id)', 'max').getRawOne();

               for (let i = 1; i < maxId.max; i++) {
                  const oldDmgData = await playerRepository
                     .createQueryBuilder('players')
                     .select(['damageBalance', 'characterName', 'wytrzymalosc', 'woundsAll'])
                     .where('id = :id', { id: i })
                     .getRawOne();

                  let finalDamage = oldDmgData.damageBalance - oldDmgData.wytrzymalosc;
                  if (oldDmgData.damageBalance - oldDmgData.wytrzymalosc < 0) {
                     finalDamage = 0;
                  }

                  await playerRepository
                     .createQueryBuilder('players')
                     .update('players')
                     .set({ damageBalance: finalDamage })
                     .where('id=:id', { id: i })
                     .execute();

                  const newDmgData = await playerRepository
                     .createQueryBuilder('players')
                     .select(['damageBalance', 'characterName', 'wytrzymalosc', 'woundsAll'])
                     .where('id = :id', { id: i })
                     .getRawOne();

                  interface CharacterData {
                     name: string;
                     oldWounds: number;
                     newWounds: number;
                     woundsAll: number;
                     wytrzymalosc: number;
                  }

                  const characterData: CharacterData = {
                     name: newDmgData.characterName,
                     oldWounds: oldDmgData.damageBalance,
                     newWounds: newDmgData.damageBalance,
                     woundsAll: oldDmgData.woundsAll,
                     wytrzymalosc: oldDmgData.wytrzymalosc,
                  };
                  const characterStatus = `${characterData.name}: ${characterData.woundsAll - characterData.oldWounds}/${characterData.woundsAll} =>  WT:${characterData.wytrzymalosc} => [${characterData.woundsAll - characterData.newWounds}/${characterData.woundsAll}]`;

                  players.push(characterStatus);
               }

               message.channel.send(
                  `${variable.codeBlock}Powitajmy Amaterasu - samoczynne leczenie ran:\n *${players.join('\n *')}${variable.codeBlock}`
               );
            } else {
               message.channel.send(ADMIN_COMMAND_BLOCK_MESSAGE);
            }
         }
      })();
   }
}
