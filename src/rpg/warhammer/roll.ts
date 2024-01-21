import { randomNumber } from '../common-elements/dice-roll';

export const warhammerRoll: {
   roll_2d10_and_add_30: () => number;
   roll_2d10_and_add_20: () => number;
   roll_2d10_and_add_10: () => number;
} = {
   roll_2d10_and_add_10: function () {
      return randomNumber(1, 10) + randomNumber(1, 10) + 10;
   },
   roll_2d10_and_add_20: function () {
      return randomNumber(1, 10) + randomNumber(1, 10) + 20;
   },
   roll_2d10_and_add_30: function () {
      return randomNumber(1, 10) + randomNumber(1, 10) + 30;
   },
};
