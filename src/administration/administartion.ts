require('dotenv').config();

export const ADMIN_DISCORD_ID = process.env.ADMIN_DISCORD_ID;
export const ADMIN_COMMAND_BLOCK_MESSAGE =
    ':warning:' + '```' + 'This command is works only on admin account' + '```';

export const userRecognize = {
    enabled: true,
    piorkoRename: true,
    maxRename: true,
    karolRename: true,
};

export const rewardValue = {
    min: 1,
    max: 100,
};

export const STANDARD_USERS = {
    karol: 'moorholdius',
    max: 'M_aX',
    bot: 'the_old_rusty_bot',
    piorko: 'Piórko',
};

export const rollHelper = {
    helperStatus: false,
    helper: STANDARD_USERS.karol,
    helperMinSingleRoll: 2,
    helperMaxSingleRoll: 10,

    distractorStatus: false,
    distracted: STANDARD_USERS.piorko,
    distractedMinSingleRoll: 1,
    distractedMaxSingleRoll: 9,
};

export const archiver: boolean = false;
export const archiveUserMessages: boolean = false;
export const warhammerStatus: boolean = true;
export const vampireStatus: boolean = true;
export const legendStatus: boolean = true;
export const kangaroo: boolean = true;
