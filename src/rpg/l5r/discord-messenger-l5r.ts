import {variable} from "../../infrastructure/variables";
import {BotResponse, BotResponseAdminRestricted} from "../../infrastructure/classes";
import {fight_initiative} from "./fight";
import {pairs} from "./gempukku";
import {L5RCharacter} from "./character-creator";
import {reload_players} from "./players-data";
import {get_random_value_from_array} from "../../infrastructure/functions";

export class LegendOfTheFiveRingsMessenger {
    constructor(user: any, message: any) {
        (async (): Promise<void> => {
            switch (message.content.toLowerCase()) {
                case `fight init`:
                    new BotResponse(user, message, `${variable.codeBlock}${fight_initiative()}${variable.codeBlock}`);
                    break
                case `gem`:
                    new BotResponse(user, message, pairs());
                    break;
                case `npcc`:
                    new BotResponse(user, message, new L5RCharacter().printer());
                    break;
                case `reload`:
                    new BotResponse(user, message, await reload_players());
                    break;
                case `osada`:
                    new BotResponseAdminRestricted(user, message, await get_random_value_from_array(settlement));
                    break;
            }
        })();
    }
}

const settlement = ['Alkohol', 'Alkohol', 'Alkohol', 'Alkohol', 'Alkohol', 'Artyści', 'Artyści', 'Artyści', 'Artyści', 'Artyści', 'Bambus', 'Bambus', 'Bambus', 'Mosty', 'Mosty', 'Mosty', 'Mosty', 'Cieśle', 'Cieśle', 'Cieśle', 'Cieśle', 'Cieśle', 'Jaskinie', 'Jaskinie', 'Wypadki niebiańskie', 'Kuchmistrze', 'Kuchmistrze', 'Kuchmistrze', 'Bawełna', 'Bawełna', 'Bawełna', 'Bawełna', 'Rzemieślnicy', 'Rzemieślnicy', 'Rzemieślnicy', 'Rzemieślnicy', 'Rzemieślnicy', 'Sztukmistrze', 'Sztukmistrze', 'Sztukmistrze', 'Sztukmistrze', 'Sztukmistrze', 'Festiwal lub święto', 'Festiwal lub święto', 'Festiwal lub święto', 'Jedzenie', 'Jedzenie', 'Jedzenie', 'Las', 'Las', 'Sady Owocowe', 'Sady Owocowe', 'Sady Owocowe', 'Ogrody', 'Ogrody', 'Ogrody', 'Gejsze', 'Zboże', 'Zboże', 'Zboże', 'Jubilerzy', 'Jezioro (staw, sadzawka itp.)', 'Jezioro (staw, sadzawka itp.)', 'Młyny', 'Młyny', 'Młyny', 'Kopalnie', 'Krajobraz (klify, ostańce, wodospad itp.)', 'Krajobraz (klify, ostańce, wodospad itp.)', 'Naturalny port', 'Naturalny port', 'Święta sadzawka', 'Szczególna odmiana ryżu', 'Rzeka (strumień, potok, bród itp.)', 'Rzeka (strumień, potok, bród itp.)', 'Rzeka (strumień, potok, bród itp.)', 'Sznury', 'Kaplica', 'Kaplica', 'Kaplica', 'Kaplica', 'Jedwab', 'Jedwab', 'Kowale', 'Kowale', 'Kowale', 'Kowale', 'Murarze', 'Murarze', 'Słodycze', 'Herbata', 'Herbata', 'Herbata', 'Świątynia', 'Świątynia', 'Tofu', 'Tofu', 'Tofu', 'Tkacze', 'Tkacze']
