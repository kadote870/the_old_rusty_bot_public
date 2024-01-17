import fs from 'fs';

class Participant {
    public clanParticipant: any;
    public familyParticipant: any;
    public nameParticipant: any;
    public nameTranslationParticipant: any;
    public genderParticipant: any;
    public professionParticipant: any;
    public storyProfessionParticipant: any;
    public schoolParticipant: any;

    constructor(
        clan: any,
        family: any,
        npcName: any,
        nameTranslation: any,
        gender: any,
        profession: any,
        school: any,
        storyProfession: any
    ) {
        this.clanParticipant = clan;
        this.familyParticipant = family;
        this.nameParticipant = npcName;
        this.nameTranslationParticipant = nameTranslation;
        this.genderParticipant = gender;
        this.professionParticipant = profession;
        this.storyProfessionParticipant = storyProfession;
        this.schoolParticipant = school;
    }

    printer() {
        return `${this.clanParticipant || ''} ${this.familyParticipant || ''} ${this.nameParticipant}`;
    }
}

export const pairs = () => {
    function loadParticipantsFromJSONFile(filename: string): Participant[] {
        const jsonData = fs.readFileSync(filename, 'utf8');
        const participantsData = JSON.parse(jsonData);

        return participantsData.participants.map((participant: any) => {
            return new Participant(
                participant.clan,
                participant.family,
                participant.name,
                participant.nameTranslation,
                participant.gender,
                participant.profession,
                participant.school,
                participant.storyProfession
            );
        });
    }

    function randomPairs(arr: string[]) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        const pairs = [];

        while (shuffled.length >= 2) {
            const pair = [shuffled.pop(), shuffled.pop()];
            pairs.push(`PARA:[${pair}]\n`);
        }

        if (shuffled.length === 1) {
            pairs.push([shuffled[0]]);
        }

        return pairs;
    }

    const participants = loadParticipantsFromJSONFile('./src/db/l5r-participants.json');
    const participantDescriptions = participants.map((participant) => participant.printer());

    return randomPairs(participantDescriptions).toString();
}