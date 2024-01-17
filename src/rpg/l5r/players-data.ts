import {L5RCharacter} from "./character-creator";
import {variable} from "../../infrastructure/variables";
import {CharacterClanEnum, CharacterFamilyEnum, CharacterSchoolEnum} from "./character-enums";

class TestLegendUser extends L5RCharacter {
    constructor() {
        super();
        this.data.characterName = 'JAN JANUSZ GigaCzadewicz'
        this.data.userId = '293828266144301058';
        this.data.player = true;
        this.stats.wytrzymalosc = 4;
        this.stats.silaWoli = 3;
        this.weapon.katana.weaponName = 'szkarłatne niebo'
        this.data.clan = CharacterClanEnum.Ronin
        this.calculator();
    }
}

class botUser extends L5RCharacter {
    constructor() {
        super();
        this.data.characterName = 'rusty-bot sama';
        this.data.userId = '1159524872687468576';
        this.data.player = true;
        this.data.family = CharacterFamilyEnum.Hiruma
        this.data.school = CharacterSchoolEnum.BushiHida
        this.data.clan = CharacterClanEnum.Krab
        this.weapon.katana.weaponName = 'analizator powietrze';
        this.weapon.katana.dmgKeep = 4;
        this.weapon.katana.dmgRoll = 5;
        this.calculator();
    }
}

class dataFaker1 extends L5RCharacter {
    constructor() {
        super();
        this.data.characterName = 'dataFaker1 kakita swordsman';
        this.data.userId = 'fake_id_1';
        this.data.player = true;
        this.data.school = CharacterSchoolEnum.BushiKakita
        this.data.clan = CharacterClanEnum.Zuraw
        this.calculator();
    }
}

class dataFaker2 extends L5RCharacter {
    constructor() {
        super();
        this.data.characterName = 'dataFaker2';
        this.data.userId = 'fake_id_2';
        this.data.player = true;
        this.calculator();
    }
}

class dataFaker3 extends L5RCharacter {
    constructor() {
        super();
        this.data.userId = 'fake_id_3';
        this.data.player = true;
        this.calculator();
    }
}

class dataFaker4 extends L5RCharacter {
    constructor() {
        super();
        this.data.userId = 'fake_id_4';
        this.data.player = true;
        this.calculator();
    }
}

export const PLAYERS = async () => {
    return [
        new TestLegendUser(),
        new botUser(),
        new dataFaker1(),
        new dataFaker2(),
        new dataFaker3(),
        new dataFaker4(),
    ]
}

export const reload_players = async () => {
    const playerCharacters = PLAYERS();

    const names = [];
    for (const element of await playerCharacters) {
        await element.saveToDataBase()
        names.push(element.data.characterName);
    }

    return `${variable.codeBlock}ADMIN OPERATION: reload_characters:\n *${names.join('\n *')}${variable.codeBlock}`;
};