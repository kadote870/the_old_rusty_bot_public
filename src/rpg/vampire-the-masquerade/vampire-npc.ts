import {get_random_value_from_array} from "../../infrastructure/functions";

// some variables can be in Polish language - according to polish rulebook 'Legend Of The Fife Rings' ed.1
export class VampireNpc {
    public npc: {
        byt: string,
        umyslowe: {
            skills: {
                spostrzegawczosc: number;
                nauka: number;
                medycyna: number;
                sledztwo: number;
                okultyzm: number;
                polityka: number;
                wyksztalcenie: number;
                technika: number;
                finanse: number
            };
            attribute: { determinacja: number; inteligencja: number; spryt: number }
        };
        spoleczne: {
            skills: {
                przebieglosc: number;
                wystepyPubliczne: number;
                zastraszanie: number;
                etykieta: number;
                perswazja: number;
                cwaniactwo: number;
                intuicja: number;
                rozumienieZwierzat: number;
                zdolnosciPrzywodcze: number
            };
            attribute: { opanowanie: number; manipulacja: number; charyzma: number }
        };
        fizyczne: {
            skill: {
                prowadzeniePojazdow: number;
                bronBiala: number;
                wysportowanie: number;
                sztukaPrzetrwania: number;
                walkaWrecz: number;
                kradziez: number;
                krycieSie: number;
                rzemioslo: number;
                strzelanie: number
            };
            attribute: { zrecznosc: number; sila: number; wytrzymalosc: number }
        }
    };
    protected byt: string;
    protected attributeRange: number[];
    protected skillRange: number[];

    constructor() {
        this.byt = 'Wampir';
        this.attributeRange = [1, 2, 3, 4, 5];  // 5 - 1:5
        this.skillRange = [
            0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            2, 2, 2, 2,
            3, 3, 3,
            4, 4,
            5]; // 5 - 1:21
        this.npc = this.generateNpc();
    }

    generateNpc(): any {
        return {
            byt: this.byt,
            fizyczne: {
                attribute: {
                    sila: get_random_value_from_array(this.attributeRange),
                    zrecznosc: get_random_value_from_array(this.attributeRange),
                    wytrzymalosc: get_random_value_from_array(this.attributeRange)
                },
                skill: {
                    bronBiala: get_random_value_from_array(this.skillRange),
                    kradziez: get_random_value_from_array(this.skillRange),
                    krycieSie: get_random_value_from_array(this.skillRange),
                    prowadzeniePojazdow: get_random_value_from_array(this.skillRange),
                    rzemioslo: get_random_value_from_array(this.skillRange),
                    strzelanie: get_random_value_from_array(this.skillRange),
                    sztukaPrzetrwania: get_random_value_from_array(this.skillRange),
                    walkaWrecz: get_random_value_from_array(this.skillRange),
                    wysportowanie: get_random_value_from_array(this.skillRange)
                }
            },
            spoleczne: {
                attribute: {
                    charyzma: get_random_value_from_array(this.attributeRange),
                    manipulacja: get_random_value_from_array(this.attributeRange),
                    opanowanie: get_random_value_from_array(this.attributeRange),
                },
                skills: {
                    cwaniactwo: get_random_value_from_array(this.skillRange),
                    etykieta: get_random_value_from_array(this.skillRange),
                    intuicja: get_random_value_from_array(this.skillRange),
                    perswazja: get_random_value_from_array(this.skillRange),
                    przebieglosc: get_random_value_from_array(this.skillRange),
                    rozumienieZwierzat: get_random_value_from_array(this.skillRange),
                    wystepyPubliczne: get_random_value_from_array(this.skillRange),
                    zastraszanie: get_random_value_from_array(this.skillRange),
                    zdolnosciPrzywodcze: get_random_value_from_array(this.skillRange)
                }
            },
            umyslowe: {
                attribute: {
                    inteligencja: get_random_value_from_array(this.attributeRange),
                    spryt: get_random_value_from_array(this.attributeRange),
                    determinacja: get_random_value_from_array(this.attributeRange),
                },
                skills: {
                    finanse: get_random_value_from_array(this.skillRange),
                    medycyna: get_random_value_from_array(this.skillRange),
                    nauka: get_random_value_from_array(this.skillRange),
                    okultyzm: get_random_value_from_array(this.skillRange),
                    polityka: get_random_value_from_array(this.skillRange),
                    spostrzegawczosc: get_random_value_from_array(this.skillRange),
                    sledztwo: get_random_value_from_array(this.skillRange),
                    technika: get_random_value_from_array(this.skillRange),
                    wyksztalcenie: get_random_value_from_array(this.skillRange)
                }
            }
        }
    }

    printer(): string {
        return `
***${this.byt}
***[Siła:${this.npc.fizyczne.attribute.sila}][Zręczność:${this.npc.fizyczne.attribute.zrecznosc}][Wytrzymałość:${this.npc.fizyczne.attribute.wytrzymalosc}]***
Broń Biała: ${this.npc.fizyczne.skill.bronBiala},
Kradzież: ${this.npc.fizyczne.skill.kradziez},
Krycie się: ${this.npc.fizyczne.skill.krycieSie},
Prowadzenie pojazdów: ${this.npc.fizyczne.skill.prowadzeniePojazdow},
Rzemiosło: ${this.npc.fizyczne.skill.rzemioslo},
Strzelanie: ${this.npc.fizyczne.skill.strzelanie},
Sztuka przetrwania: ${this.npc.fizyczne.skill.sztukaPrzetrwania},
Walka wręcz: ${this.npc.fizyczne.skill.walkaWrecz},
Wysportowanie: ${this.npc.fizyczne.skill.wysportowanie},
***[Charyzma:${this.npc.spoleczne.attribute.charyzma}][Manipulacja:${this.npc.spoleczne.attribute.manipulacja}][Opanowanie:${this.npc.spoleczne.attribute.opanowanie}]***
Cwaniactwo: ${this.npc.spoleczne.skills.cwaniactwo},
Etykieta: ${this.npc.spoleczne.skills.etykieta},
Intuicja: ${this.npc.spoleczne.skills.intuicja},
Perswazja: ${this.npc.spoleczne.skills.perswazja},
Przebiegłość: ${this.npc.spoleczne.skills.przebieglosc},
Rozumienie zwierząt: ${this.npc.spoleczne.skills.rozumienieZwierzat},
Występy publiczne:: ${this.npc.spoleczne.skills.wystepyPubliczne},
Zastraszanie: ${this.npc.spoleczne.skills.zastraszanie},
Zdolności przywódcze: ${this.npc.spoleczne.skills.zdolnosciPrzywodcze},
***[Inteligencja:${this.npc.umyslowe.attribute.inteligencja}][Spryt:${this.npc.umyslowe.attribute.spryt}][Determinacja:${this.npc.umyslowe.attribute.determinacja}]***
Finanse: ${this.npc.umyslowe.skills.finanse},
Medycyna: ${this.npc.umyslowe.skills.medycyna},
Nauka: ${this.npc.umyslowe.skills.nauka},
Okultyzm: ${this.npc.umyslowe.skills.okultyzm},
Polityka: ${this.npc.umyslowe.skills.polityka},
Spostrzegawczość: ${this.npc.umyslowe.skills.spostrzegawczosc},
Śledztwo: ${this.npc.umyslowe.skills.sledztwo},
Technika: ${this.npc.umyslowe.skills.technika},
Wykształcenie: ${this.npc.umyslowe.skills.wyksztalcenie}`
    }
}

export class VampireHumanNpc extends VampireNpc {
    constructor() {
        super();
        this.byt = 'Człowiek';
        this.attributeRange = [
            1, 1, 1, 1, 1, 1,
            2, 2, 2, 2, 2,
            3, 3, 3,
            4, 4,
            5]; // 5 - 1:17
        this.skillRange = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            3, 3, 3, 3, 3,
            4, 4,
            5]; // 5 - 1:63
        this.npc = this.generateNpc();
    }
}