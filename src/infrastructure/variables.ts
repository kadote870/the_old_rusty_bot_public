import { rewardValue } from '../administration/administartion';

const date: Date = new Date();
export let botStartTime: {
   currentTime: string;
   currentDate: string;
} = {
   currentTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
   currentDate: `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`,
};

export const variable = {
   rollPrefix: 'r',
   codeBlock: '```',

   help: `Lista komnend:
            r{liczba} - rzut k10  
            
            giga - gigachad
            
            npc - generuje podstawowe statystyki dla wampira
            homo - generuje podstawowe statystyki dla człowieka
            
            reward - losowa liczba od ${rewardValue.min} do ${rewardValue.max} pomocna przy nagradzaniu graczy, lub ograbianiu npc
            coin - orzeł czy reszka, zwraca informację wygrałeś/przegrałeś
            parzyste - japońska gra hazardowa, komenda deklaruje przewidywany wynik
            nieparzyste - japońska gra hazardowa, komenda deklaruje przewidywany wynik
            
            warhammer human - generuje podstawowe statysyki dla człowieka do warhammer2ed.
            warhammer elf - generuje podstawowe statysyki dla elfa do warhammer2ed.
            warhammer dwarf - generuje podstawowe statysyki dla krasnoluda do warhammer2ed.
            warhammer halfling - generuje podstawowe statysyki dla niziołka do warhammer2ed.            `,

   insults: [
      'Nosacz:monkey:',
      'Pan maruda niszczyciel dobrej zabawy, pogromca uśmiechów dzieci',
      'Malkontent',
      'Mniejszy sprzedawca uranu',
   ],
   compliment: ['Patriota i Filantrop', ':moyai:Niepodzielny władca serwera:moyai'],
   kangarooRage: [
      'https://tenor.com/rYTU.gif',
      'https://tenor.com/bH71R.gif',
      'https://tenor.com/bWcCO.gif',
      'https://tenor.com/view/kangaroo-good-life-scratching-gif-20659247',
      'https://tenor.com/view/running-runner-kangaroo-gif-12629624',
      'https://tenor.com/view/family-guy-peter-griffin-joey-pouch-kangaroo-gif-5317548',
      'https://tenor.com/view/kangaroos-animals-funny-at-the-wild-gif-3539155',
      'https://tenor.com/view/kangaroo-kangaroo-scratch-itchy-cute-adorable-gif-17885728',
   ],
};

export const dotArt = {
   gigaChad: `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡴⡢⡶⠶⢢⢄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⢏⣺⢿⣿⣾⣹⣷⢡
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢾⣾⣟⠝⠀⠨⠉⢹⡏
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣻⡇⠘⠿⢾⢐⣶⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣱⣾⣷⣦⣠⡾⣃⡐
⠀⠀⠀⠀⠀⣀⡀⣀⣀⣤⣤⣠⡟⢻⣿⣿⣏⠻⡿
⠀⣠⡾⢿⡿⠿⠿⢿⣻⣿⡋⠉⡇⠀⣿⠛⠻⠿⢇
⣸⠋⠀⣿⠀⠀⠀⠀⠈⠙⢷⠀⢰⣰⠃⡠⢔⠄⠀⠀⢄
⢻⡄⠀⠛⢆⠀⠀⠀⠀⠀⠈⢿⣿⣿⠞⠛⠉⠁⠉⠢⡀⠑⢀
⠀⣷⢀⣶⢿⣷⠀⠀⠀⠀⠀⢸⡟⠀⠀⠀⠀⠀⠀⠀⠈⠆⠀⠡
⠞⢁⡼⢯⣠⣿⠀⠀⠀⠀⢀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⡀
⠖⠋⠀⠀⢻⣿⣄⡀⠀⢀⣾⡏⠀⠀⠀⠀⠀⢀⢰⡴⠀⠧⠀⠘
⠀⠀⠀⠀⠀⣿⡝⣻⣿⣿⣿⣿⣦⣄⡀⠀⢔⡵⡟⡇⠀⠀⠱⠈⡄
⠀⠀⠀⠀⠀⣾⣹⡯⠤⢄⣏⣀⡈⣹⡟⡩⢋⢼⡄⢹⠀⠀⠌⠀⠇
⠀⠀⠀⠀⢀⡟⢾⣤⣀⢤⡯⠄⠉⠁⡇⠐⢔⠀⠻⣇⣷⠈⢆⠀⡂`,
};
