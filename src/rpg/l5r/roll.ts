import {sumHighestResults} from "../common-elements/dice-roll";
import {variable} from "../../infrastructure/variables";
import {legendStatus} from "../../administration/administartion";
import {db_select_player_all_data} from "../../db/data-base";

export class LegendRoll {
    constructor(user: any, message: any) {
        (async (): Promise<void> => {
            const localPrefix = 'l'
            const prefixLower = localPrefix.toLowerCase();
            const userMessage = message.content.toLowerCase();
            const userId: string = message.author.id;
            if (userMessage.startsWith(prefixLower)) {
                let response: any;
                const args = userMessage.split('z');
                if (!legendStatus) {
                    const info: string = `${variable.codeBlock}[USER MESSAGE:${userMessage}] INFO: Command disabled${variable.codeBlock}`;
                    message.channel.send(info);
                } else {
                    if (args.length === 2) {
                        const howManyDice: number = parseInt(args[0].substring(1));
                        const howManyKeep: number = parseInt(args[1]);
                        if (howManyDice >= howManyKeep) {
                            if (howManyDice < 1 || howManyKeep < 1) {
                                response = `${variable.codeBlock}[USER MESSAGE:${userMessage}] ERROR: Min rolled or kept dice count is 1${variable.codeBlock}`;
                                message.channel.send(response);
                            } else if (!isNaN(howManyDice) && !isNaN(howManyKeep)) {
                                const playerData = await db_select_player_all_data(userId);
                                if (playerData) {
                                    const diceSum = howManyDice + playerData.woundsMathLevel;
                                    const result: string = await legendRoll(diceSum, howManyKeep, playerData.woundsMathLevel);

                                    message.channel.send(`${variable.codeBlock}${result}${variable.codeBlock}`);
                                } else {
                                    console.log(`DB error during select player id: ${userId} - probably player was not found`);
                                }
                            }
                        } else {
                            response = `**${user}**:game_die:${variable.codeBlock}[USER MESSAGE:${userMessage}] ERROR: roll dice value must be higher or equal than kept value${variable.codeBlock}`;
                            message.channel.send(response);
                        }
                    }
                }
            }
            if (userMessage === prefixLower + 'atak') {
                const playerData = await db_select_player_all_data(userId);
                if (playerData) {
                    const diceSum = playerData.skillKenjutsu + playerData.zrecznosc + playerData.woundsMathLevel;
                    const attack = await legendRoll(diceSum, playerData.zrecznosc, playerData.woundsMathLevel);

                    message.channel.send(`**${user}**:crossed_swords:${variable.codeBlock}[${playerData.characterName}]\nKenjutsu: ${playerData.skillKenjutsu}, **Zręczność: ${playerData.zrecznosc}**\nATAK: ${attack}\n${variable.codeBlock}`);
                } else {
                    console.log(`DB error during select player id: ${userId} - probably player was not found`);
                }
            }
            if (userMessage === prefixLower + 'dmg') {
                const playerData = await db_select_player_all_data(userId);
                if (playerData) {
                    const diceSum = playerData.dmgRoll + playerData.sila + playerData.woundsMathLevel;
                    const damage = await legendRoll(diceSum, playerData.dmgKeep, playerData.woundsMathLevel);

                    message.channel.send(`**${user}**:boom:${variable.codeBlock}[${playerData.characterName}] Broń: ${playerData.weaponName}\nSila: ${playerData.sila}, dmgRoll: ${playerData.dmgRoll}, **dmgKeep: ${playerData.dmgKeep}**\nOBRAŻENIA: ${damage}\n${variable.codeBlock}`);
                } else {
                    console.log(`DB error during select player id: ${userId} - probably player was not found`);
                }
            }
        })();
    }
}

async function legendRoll(howManyDice: number, howManyKeep: number, woundsMathLevel: number): Promise<string> {
    if (howManyDice <= 1) {
        howManyDice = 1;
    }
    const roll = sumHighestResults(1, 10, howManyDice, howManyKeep);
    return `Pula kości: ${howManyDice} (Kara za obrażenia: ${woundsMathLevel}), Zachowujemy: ${howManyKeep}\nWYNIK:[${roll.sum}]\n[Zachowano:${roll.topResults}]z[${roll.results}]\n#INFO: Zachowano i podliczono najwyższe wyniki. Zasady mówią jasno: To Gracz wybiera kości, które chce zachować.`
}