// player.entity.ts
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";
import {CharacterClanEnum, CharacterFamilyEnum, CharacterSchoolEnum} from "../../rpg/l5r/character-enums";

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId: string = '';

    @Column()
    player: boolean = false;

    @Column()
    bankBalance: number = 0;

    @Column()
    damageBalance: number = 0;

    @Column()
    characterName: string = '';

    @Column()
    family: CharacterFamilyEnum = CharacterFamilyEnum.DefaultValue;

    @Column()
    clan: CharacterClanEnum = CharacterClanEnum.DefaultValue;

    @Column()
    school: CharacterSchoolEnum = CharacterSchoolEnum.DefaultValue;

    @Column()
    ziemia: number = 0;

    @Column()
    ogien: number = 0;

    @Column()
    woda: number = 0;

    @Column()
    powietrze: number = 0;

    @Column()
    pustka: number = 0;

    @Column()
    wytrzymalosc: number = 0;

    @Column()
    silaWoli: number = 0;

    @Column()
    zrecznosc: number = 0;

    @Column()
    inteligencja: number = 0;

    @Column()
    sila: number = 0;

    @Column()
    spostrzegawczosc: number = 0;

    @Column()
    refleks: number = 0;

    @Column()
    intuicja: number = 0;

    @Column()
    skillKenjutsu: number = 0;

    @Column()
    skillIaijutsu: number = 0;

    @Column()
    skillKyujutsu: number = 0;

    @Column()
    weaponName: string = '';

    @Column()
    dmgRoll: number = 0;

    @Column()
    dmgKeep: number = 0;

    @Column()
    hitDifficultyNoArmor: number = 0;

    @Column()
    hitDifficultyLightArmor: number = 0;

    @Column()
    hitDifficultyHeavyArmor: number = 0;

    @Column()
    woundsOnLvl: number = 0;

    @Column()
    woundsAll: number = 0;

    @Column()
    woundsMathLevel: number = 0;

    @Column()
    gloryLvl: number = 0;

    @Column()
    gloryPoints: number = 0;

    @Column()
    honorLvl: number = 0;

    @Column()
    honorPoints: number = 0;

    @Column()
    prestigeRank: number = 0;

    @Column()
    prestigeSum: number = 0;
}
