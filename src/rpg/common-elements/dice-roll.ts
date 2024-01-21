export const randomNumber = (min: number, max: number) =>
   Math.floor(Math.random() * (max - min + 1) + min);

const generateRandomWithRetry = (min: number, max: number) => {
   let total: number = 0;

   while (true) {
      const result: number = randomNumber(min, max);
      total += result;

      if (result !== max) {
         return total;
      }
   }
};

const generateRandomResults = (min: number, max: number, numDraws: number) => {
   const results: number[] = [];

   for (let i: number = 0; i < numDraws; i++) {
      const result: number = generateRandomWithRetry(min, max);
      results.push(result);
   }

   return results.sort((a, b) => b - a);
};

export const sumHighestResults = (
   min: number,
   max: number,
   numDraws: number,
   keepResults: number
): any => {
   const results: number[] = generateRandomResults(min, max, numDraws);
   const topResults = results.slice(0, keepResults); // Pobieranie X najwyższych wyników
   const sum: number = topResults.reduce((acc, val) => acc + val, 0); // Obliczanie sumy
   return { sum: sum, results: results, topResults: topResults };
};
