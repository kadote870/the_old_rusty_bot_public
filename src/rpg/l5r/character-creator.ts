import { get_random_value_from_array } from '../../infrastructure/functions';
import { randomNumber } from '../common-elements/dice-roll';
import { AppDataSource } from '../../db/data-source';
import { Player } from '../../db/entities/player.entity';
import {
   CharacterClanEnum,
   CharacterFamilyEnum,
   CharacterSchoolEnum,
} from './data/character-enums';
import { nameParts } from './data/arr';

// some variables can be in Polish language - according to the polish rulebook 'Legend Of The Fife Rings' ed.1
export class L5RCharacter {
   public stats: {
      silaWoli: number;
      spostrzegawczosc: number;
      inteligencja: number;
      zrecznosc: number;
      refleks: number;
      intuicja: number;
      wytrzymalosc: number;
      sila: number;
   };
   public skills: {
      kenjutsu: number;
      iaijutsu: number;
      kyujutsu: number;
   };
   public data: {
      school: CharacterSchoolEnum;
      characterName: string;
      clan: CharacterClanEnum;
      family: CharacterFamilyEnum;
      userId: string;
      player: boolean;
   };
   public weapon: {
      katana: { weaponName: string; dmgKeep: number; dmgRoll: number };
   };
   public element: {
      woda: number;
      ogien: number;
      powietrze: number;
      ziemia: number;
      pustka: number;
   };
   public prestige: {
      prestigeRank: number;
      prestigeSum: number;
   };
   public wounds: { all: number; onLvl: number };
   public hitDifficulty: {
      lightArmor: number;
      heavyArmor: number;
      noArmor: number;
   };
   public glory: { gloryPoints: number; gloryLvl: number };
   public honor: { honorLvl: number; honorPoints: number };

   constructor() {
      this.data = this.generateData();
      this.stats = this.generateStats();
      this.skills = this.generateSkills();
      this.weapon = this.generateWeaponStats();
      this.element = this.elementsCalculator();
      this.wounds = this.woundsCalculator();
      this.hitDifficulty = this.hitDifficultyCalculator();
      this.prestige = this.prestigeCalculator();
      this.glory = this.gloryCalculator();
      this.honor = this.honorCalculator();
   }

   generateData() {
      return {
         userId: '',
         player: false,
         characterName: random_name(),
         clan: CharacterClanEnum['DefaultValue'],
         family: CharacterFamilyEnum['DefaultValue'],
         school: CharacterSchoolEnum['DefaultValue'],
      };
   }

   generateStats() {
      return {
         wytrzymalosc: randomNumber(1, 5),
         silaWoli: randomNumber(1, 5),

         zrecznosc: randomNumber(1, 5),
         inteligencja: randomNumber(1, 5),

         sila: randomNumber(1, 5),
         spostrzegawczosc: randomNumber(1, 5),

         refleks: randomNumber(1, 5),
         intuicja: randomNumber(1, 5),
      };
   }

   generateSkills() {
      return {
         kenjutsu: randomNumber(1, 5),
         iaijutsu: randomNumber(1, 5),
         kyujutsu: randomNumber(1, 5),
      };
   }

   generateWeaponStats() {
      return {
         katana: {
            weaponName: 'katana',
            dmgRoll: 3,
            dmgKeep: 2,
         },
      };
   }

   elementsCalculator() {
      return {
         ziemia: Math.min(this.stats.wytrzymalosc, this.stats.silaWoli),
         ogien: Math.min(this.stats.zrecznosc, this.stats.inteligencja),
         woda: Math.min(this.stats.sila, this.stats.spostrzegawczosc),
         powietrze: Math.min(this.stats.refleks, this.stats.intuicja),
         pustka: randomNumber(1, 5),
      };
   }

   prestigeCalculator() {
      const RANK_1 = 150;
      const RANK_2 = 175;
      const RANK_3 = 200;
      const RANK_4 = 225;
      const RANK_5 = 250;

      const sumOfSkills = Object.values(this.skills).reduce((acc, skill) => acc + skill, 0);
      const sumOfElements = Object.values(this.element).reduce((acc, skill) => acc + skill, 0);
      const prestigeSum = sumOfSkills + sumOfElements * 10;

      let prestigeRank = 0;
      if (prestigeSum <= RANK_1) {
         prestigeRank = 1;
      } else if (prestigeSum <= RANK_2) {
         prestigeRank = 2;
      } else if (prestigeSum <= RANK_3) {
         prestigeRank = 3;
      } else if (prestigeSum <= RANK_4) {
         prestigeRank = 4;
      } else if (prestigeSum <= RANK_5) {
         prestigeRank = 5;
      }

      return {
         prestigeSum: prestigeSum,
         prestigeRank: prestigeRank,
      };
   }

   hitDifficultyCalculator() {
      return {
         noArmor: this.stats.refleks * 5,
         lightArmor: this.stats.refleks * 5 + 5,
         heavyArmor: this.stats.refleks * 5 + 10,
      };
   }

   woundsCalculator() {
      let onLvl: number;
      let all: number;
      if (this.data.school === CharacterSchoolEnum.StrazDaidoji) {
         // Szkoła Straży Daidoji - Ranga 1: Siła Honoru
         onLvl = Math.min(this.stats.wytrzymalosc, this.stats.silaWoli) * 2 + this.honor.honorLvl;
         all = onLvl * 8;
      } else {
         onLvl = Math.min(this.stats.wytrzymalosc, this.stats.silaWoli) * 2; // dmg level = ziemia * 2
         all = onLvl * 8; // 8 dmg levels
      }
      return {
         onLvl: onLvl,
         all: all,
      };
   }

   gloryCalculator() {
      const gloryTotal = 22
      return {
         gloryLvl: first_digit(gloryTotal),
         gloryPoints: gloryTotal,
      };
   }

   honorCalculator() {
      const honorTotal =  85
      return {
         honorLvl: first_digit(honorTotal),
         honorPoints: honorTotal,
      };
   }

   calculator() {
      this.glory = this.gloryCalculator();
      this.honor = this.honorCalculator(); // Ranga 1 Szkoły strażników Daidoji wymaga umieszczenia honorCalculator przed woundsCalculator
      this.element = this.elementsCalculator();
      this.wounds = this.woundsCalculator();
      this.hitDifficulty = this.hitDifficultyCalculator();
      this.prestige = this.prestigeCalculator();
   }

   printer() {
      return `
characterType: {this.divineOrder.characterType}
Random NPC: ${this.data.characterName}, {this.divineOrder.role}

Ziemia: ${this.element.ziemia} | Wytrzymałość: ${this.stats.wytrzymalosc} | Siła Woli: ${this.stats.silaWoli}
Ogień: ${this.element.ogien} | Zręczność: ${this.stats.zrecznosc} | Inteligencja: ${this.stats.inteligencja}
Woda: ${this.element.woda} | Siła: ${this.stats.sila} | Spostrzegawczość: ${this.stats.spostrzegawczosc}
Powietrze: ${this.element.powietrze} | Refleks: ${this.stats.refleks} | Intuicja: ${this.stats.intuicja}
Pustka: ${this.element.pustka}

Mistrzostwo w: {this.mainSkill}
Inne istotne umiejętności: {this.skill1}, {this.skill2}, {this.skill3}

Miecz: ${this.skills.kenjutsu} (Atak: ${this.skills.kenjutsu + this.stats.zrecznosc}z${this.stats.zrecznosc}) | Obrażenia: (katana średniej jakości 3z2): ${this.weapon.katana.dmgRoll + this.stats.sila}z${this.weapon.katana.dmgKeep}
Trudność Trafienia | Bez zbroi: ${this.hitDifficulty.noArmor} | Lekka zbroja: ${this.hitDifficulty.lightArmor} | Ciężka zbroja: ${this.hitDifficulty.heavyArmor}
Rany: ${this.wounds.onLvl} na poziom | Rany całość: ${this.wounds.all}

Ekwipunek: {this.equipment}`;
   }

   async saveToDataBase() {
      const playerRepository = AppDataSource.getRepository(Player);

      try {
         // Sprawdzenie, czy istnieje gracz o danym userId
         let player = await playerRepository.findOneBy({ userId: this.data.userId });

         if (!player) {
            player = playerRepository.create({ userId: this.data.userId });
         }

         // Ustawienie lub aktualizacja danych
         player.player = this.data.player;
         player.characterName = this.data.characterName;
         player.clan = this.data.clan;
         player.family = this.data.family;
         player.school = this.data.school;

         player.ziemia = this.element.ziemia;
         player.ogien = this.element.ogien;
         player.woda = this.element.woda;
         player.powietrze = this.element.powietrze;
         player.pustka = this.element.pustka;

         player.wytrzymalosc = this.stats.wytrzymalosc;
         player.silaWoli = this.stats.silaWoli;
         player.zrecznosc = this.stats.zrecznosc;
         player.inteligencja = this.stats.inteligencja;
         player.sila = this.stats.sila;
         player.spostrzegawczosc = this.stats.spostrzegawczosc;
         player.refleks = this.stats.refleks;
         player.intuicja = this.stats.intuicja;

         player.skillKenjutsu = this.skills.kenjutsu;
         player.skillIaijutsu = this.skills.iaijutsu;
         player.skillKyujutsu = this.skills.kyujutsu;

         player.weaponName = this.weapon.katana.weaponName;
         player.dmgRoll = this.weapon.katana.dmgRoll;
         player.dmgKeep = this.weapon.katana.dmgKeep;

         player.hitDifficultyNoArmor = this.hitDifficulty.noArmor;
         player.hitDifficultyLightArmor = this.hitDifficulty.lightArmor;
         player.hitDifficultyHeavyArmor = this.hitDifficulty.heavyArmor;

         player.woundsOnLvl = this.wounds.onLvl;
         player.woundsAll = this.wounds.all;

         player.gloryLvl = this.glory.gloryLvl;
         player.gloryPoints = this.glory.gloryPoints;

         player.honorLvl = this.honor.honorLvl;
         player.honorPoints = this.honor.honorPoints;

         player.prestigeRank = this.prestige.prestigeRank;
         player.prestigeSum = this.prestige.prestigeSum;
         await playerRepository.save(player);
      } catch (err) {
         console.error(`Error during update whole character in table: players`, err);
         throw err;
      }
   }
}

const random_name = (): string => {
   return `${get_random_value_from_array(nameParts)}${get_random_value_from_array(nameParts)}${get_random_value_from_array(nameParts)}`;
};

const first_digit = (a: number): number => {
   const aAsString: string = a.toString();
   const firstDigit: number = parseInt(aAsString[0]);
   return firstDigit;
};
