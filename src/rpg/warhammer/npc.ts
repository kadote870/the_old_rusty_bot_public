import { warhammerRoll } from './roll';
import { get_random_value_from_array } from '../../infrastructure/functions';

// some variables can be in Polish language - according to polish rulebook 'Legend Of The Fife Rings' ed.1
class Stats {
   protected race: null | string;
   protected ww: number;
   protected us: number;
   protected k: number;
   protected odp: number;
   protected zr: number;
   private readonly int: number;
   private readonly sw: number;
   protected ogd: number;
   private readonly a: number;
   protected zywContainer: number[];
   protected zyw: number;
   protected s: null | string;
   protected wt: null | string;
   protected speed: number;
   private readonly mag: number;
   protected po: number;
   protected ppContainer: number[];
   protected pp: number;

   constructor() {
      this.race = null;
      this.ww = warhammerRoll.roll_2d10_and_add_20();
      this.us = warhammerRoll.roll_2d10_and_add_20();
      this.k = warhammerRoll.roll_2d10_and_add_20();
      this.odp = warhammerRoll.roll_2d10_and_add_20();
      this.zr = warhammerRoll.roll_2d10_and_add_20();
      this.int = warhammerRoll.roll_2d10_and_add_20();
      this.sw = warhammerRoll.roll_2d10_and_add_20();
      this.ogd = warhammerRoll.roll_2d10_and_add_20();

      this.a = 1;
      this.zywContainer = [13, 12, 12, 12, 9, 9, 9, 8, 8, 8];
      this.zyw = get_random_value_from_array(this.zywContainer);
      this.s = null;
      this.wt = null;
      this.speed = 4;
      this.mag = 0;
      this.po = 0;
      this.ppContainer = [3, 3, 3, 3, 2, 2, 2, 2, 2, 2];
      this.pp = get_random_value_from_array(this.ppContainer);
   }

   printer() {
      return `Rasa: ${this.race}
WW:${this.ww} US:${this.us} K:${this.k} Oop:${this.odp} Zr:${this.zr} Int:${this.int} Sw:${this.sw} Ogd:${this.ogd}
A:${this.a} Żyw:${this.zyw} S:${this.s} Wt:${this.wt} Sz:${this.speed} Mag:${this.mag} PO:${this.po} PP:${this.pp}`;
   }
}

export class Human extends Stats {
   constructor() {
      super();
      this.race = 'Czlowiek';
      this.s = this.k.toString()[0];
      this.wt = this.odp.toString()[0];
   }
}

export class Elf extends Stats {
   constructor() {
      super();
      this.race = 'Elf';
      this.us = warhammerRoll.roll_2d10_and_add_30();
      this.odp = warhammerRoll.roll_2d10_and_add_20();
      this.zr = warhammerRoll.roll_2d10_and_add_30();
      this.s = this.k.toString()[0];
      this.wt = this.odp.toString()[0];
      this.zywContainer = [12, 11, 11, 11, 10, 10, 10, 9, 9, 9];
      this.zyw = get_random_value_from_array(this.zywContainer);
      this.speed = 5;
      this.ppContainer = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2];
      this.pp = get_random_value_from_array(this.ppContainer);
   }
}

export class Dwarf extends Stats {
   constructor() {
      super();
      this.race = 'Krasnolud';
      this.ww = warhammerRoll.roll_2d10_and_add_30();
      this.odp = warhammerRoll.roll_2d10_and_add_30();
      this.zr = warhammerRoll.roll_2d10_and_add_10();
      this.ogd = warhammerRoll.roll_2d10_and_add_10();
      this.s = this.k.toString()[0];
      this.wt = this.odp.toString()[0];
      this.zywContainer = [14, 13, 13, 13, 12, 12, 12, 11, 11, 11];
      this.zyw = get_random_value_from_array(this.zywContainer);
      this.speed = 3;
      this.ppContainer = [3, 3, 3, 2, 2, 2, 1, 1, 1, 1];
      this.pp = get_random_value_from_array(this.ppContainer);
   }
}

export class Halfling extends Stats {
   constructor() {
      super();
      this.race = 'Niziolek';
      this.ww = warhammerRoll.roll_2d10_and_add_10();
      this.us = warhammerRoll.roll_2d10_and_add_30();
      this.k = warhammerRoll.roll_2d10_and_add_10();
      this.odp = warhammerRoll.roll_2d10_and_add_10();
      this.zr = warhammerRoll.roll_2d10_and_add_30();
      this.ogd = warhammerRoll.roll_2d10_and_add_30();
      this.s = this.k.toString()[0];
      this.wt = this.odp.toString()[0];
      this.zywContainer = [11, 10, 10, 10, 9, 9, 9, 8, 8, 8];
      this.zyw = get_random_value_from_array(this.zywContainer);
      this.speed = 4;
      this.ppContainer = [3, 3, 3, 3, 2, 2, 2, 2, 2, 2];
      this.pp = get_random_value_from_array(this.ppContainer);
   }
}
