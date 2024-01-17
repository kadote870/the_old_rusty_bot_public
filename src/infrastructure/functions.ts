import {botStartTime} from "./variables";
import {STANDARD_USERS, userRecognize} from "../administration/administartion";
import fs from "fs";

export const devMessenger = (response: string, user: string, message: any): string => `[${botStartTime.currentTime}][DEV LOG][${message.author.username}][${user}][Message:${message.content}][Response:${response}]`;

export const get_random_value_from_array = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export const change_userName_in_messages_created_by_bot = (message: any, user: string) => {
    if (message.author.username === STANDARD_USERS.player2) {
        if (userRecognize.player2Rename) {
            // return get_random_value_from_array(variable.insults);
            // return `:feather:${user}:feather:`;
            return `.${user}`;
        } else {
            return user;
        }
    }

    if (message.author.username === STANDARD_USERS.player1) {
        if (userRecognize.player1Rename) {
            // return `:star_of_david:${user}:flag_il:`;
            return `.${user}`;
        } else {
            return user;
        }
    }

    if (message.author.username === STANDARD_USERS.player_admin) {
        if (userRecognize.adminRename) {
            // return get_random_value_from_array(variable.compliment);
            // return `:moyai:${user}:moyai:`;
            return `.${user}`;
        } else {
            return user;
        }
    }

    if (message.author.username !== STANDARD_USERS.player1 || STANDARD_USERS.player2 || STANDARD_USERS.player_admin) {
        return `.${user}`;
    }
}

export const read_all_characters = (filePath:string) => {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    const characters = []
    for (const element of jsonData.characters) {
        characters.push(element)
    }

    return characters
}