require('dotenv').config();
export const ADMIN_DISCORD_ID = process.env.ADMIN_DISCORD_ID

export let userRecognize: { adminRename: boolean; player1Rename: boolean; player2Rename: boolean; enabled: boolean };
export let rollHelper: {
    helperStatus: boolean;
    helper: string;
    distractorStatus: boolean;
    distractedMinSingleRoll: number;
    helperMinSingleRoll: number;
    helperMaxSingleRoll: number;
    distracted: string;
    distractedMaxSingleRoll: number
};
export let rewardValue: { min: number; max: number };

userRecognize = {
    enabled: true,
    player2Rename: true,
    player1Rename: true,
    adminRename: true
};

export const STANDARD_USERS: { player1: string; bot: string; player_admin: string; player2: string } = {
    player_admin: 'moorholdius',
    player1: 'M_aX',
    bot: 'the_old_rusty_bot',
    player2: 'Piórko'
};

rollHelper = {
    helperStatus: false,
    helper: STANDARD_USERS.player_admin,
    helperMinSingleRoll: 2,
    helperMaxSingleRoll: 10,

    distractorStatus: false,
    distracted: STANDARD_USERS.player2,
    distractedMinSingleRoll: 1,
    distractedMaxSingleRoll: 9
};

export const archiver: boolean = false;
export const archiveUserMessages: boolean = false;
export const warhammerStatus: boolean = true;
export const vampireStatus: boolean = true;
export const legendStatus: boolean = true
export const kangaroo: boolean = true;

rewardValue = {
    min: 1,
    max: 100
};