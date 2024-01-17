import {variable} from "../../infrastructure/variables";
import {randomNumber} from "./dice-roll";

const japanese_gambling_game_elements = (): { roll1Result: number, roll2Result: number, checkModulo: number } => {
    // Gra w japońskim kasynie 2k6 o zwycięstwie decyduje wczesniejsza delkaracja wyniku rzutu przez gracza: parzyste/nieparzyste
    const roll1: number = randomNumber(1, 6);
    const roll2: number = randomNumber(1, 6);
    const modulo: number = (roll1 + roll2) % 2;
    return {
        roll1Result: roll1,
        roll2Result: roll2,
        checkModulo: modulo
    }
}

export const games: {
    coin_flipper: (user: any) => string;
    gambling_odd_number: (user: any) => string;
    gambling_even_number: (user: any) => string;
} = {
    coin_flipper: function (user: any): string {
        const coin1: number = randomNumber(1, 2);
        const coin2: number = randomNumber(1, 2);

        if (coin1 === coin2) {
            return `**${user}**:game_die:${variable.codeBlock}Rzut Monetą: Wygrałeś${variable.codeBlock}`;
        } else {
            return `**${user}**:game_die:${variable.codeBlock}Rzut Monetą: Przegrałeś${variable.codeBlock}`;
        }
    },

    gambling_odd_number: function (user: any): string {
        // Nieparzyste - Gra w japońskim kasynie 2k6 o zwycięstwie decyduje wczesniejsza delkaracja wyniku rzutu przez gracza: parzyste/nieparzyste
        const roll: { roll1Result: number, roll2Result: number, checkModulo: number } = japanese_gambling_game_elements();
        if (roll.checkModulo === 0) {
            return `**${user}**:game_die:${variable.codeBlock}[Delklaracja: Nieparzyste]\nWynik krupiera: [${roll.roll1Result}][${roll.roll2Result}] = [*${roll.roll1Result + roll.roll2Result}* Parzyste]\n[Przegrałeś]${variable.codeBlock}`;
        } else {
            return `**${user}**:game_die:${variable.codeBlock}[Delklaracja: Nieparzyste]\nWynik krupiera: [${roll.roll1Result}][${roll.roll2Result}] = [*${roll.roll1Result + roll.roll2Result}* Nieparzyste]\n[WYGRAŁEŚ]${variable.codeBlock}`;
        }
    },
    gambling_even_number: function (user: any): string {
        // Parzyste - Gra w japońskim kasynie 2k6 o zwycięstwie decyduje wczesniejsza delkaracja wyniku rzutu przez gracza: parzyste/nieparzyste
        const roll: { roll1Result: number, roll2Result: number, checkModulo: number } = japanese_gambling_game_elements();
        if (roll.checkModulo === 0) {
            return `**${user}**:game_die:${variable.codeBlock}[Delklaracja: Parzyste]\nWynik krupiera: [${roll.roll1Result}][${roll.roll2Result}] = [*${roll.roll1Result + roll.roll2Result}* Parzyste]\n[WYGRAŁEŚ]${variable.codeBlock}`;
        } else {
            return `**${user}**:game_die:${variable.codeBlock}[Delklaracja: Parzyste]\nWynik krupiera: [${roll.roll1Result}][${roll.roll2Result}] = [*${roll.roll1Result + roll.roll2Result}* Nieparzyste]\n[Przegrałeś]${variable.codeBlock}`;
        }
    }
}