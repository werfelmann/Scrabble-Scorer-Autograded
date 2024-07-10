// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z'],
};

let newPointStructure = transform(oldPointStructure);

const scoringAlgorithm1 = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
}

const scoringAlgorithm2 = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
}

const scoringAlgorithm3 = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
}

let userWord = '';

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

 function scrabbleScorer(word) {
   word = word.toLowerCase();
   let points = 0;
   for (let i = 0; i < word.length; i++) {
       let letter = word[i];
       points += Number(newPointStructure[letter]);
   }
   return points;
 };


 function simpleScorer(word) {
   let score = word.length;
   return score;
}

function vowelBonusScorer(word) {
   let simplePoints = simpleScorer(word);
   let vowelBonusPoints = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   
   for (i = 0; i < word.length; i++) {
      if (vowels.includes(word[i].toUpperCase()))
         vowelBonusPoints += 2;
   }
   return simplePoints + vowelBonusPoints;
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //



function initialPrompt() {
   console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
   console.log("Let's play some scrabble! \n")
   userWord = input.question("Enter a word to score: ");
   return;
};


const scoringAlgorithms = [scoringAlgorithm1, scoringAlgorithm2, scoringAlgorithm3];

function scorerPrompt() {
   console.log('\nWhich scoring algorhithm would you like to use? \n');
   console.log('0 - Simple: One point per character');
   console.log('1 - Vowel Bonus: Vowels are worth 3 points');
   console.log('2 - Scrabble: Uses scrabble point system');
   let userResponse = input.question('Enter 0, 1, or 2: ');
   
   while (userResponse !== '0' && userResponse !== '1' && userResponse !== '2') {
      console.log('\You must select either 0, 1, or 2. Please try again.');
      userResponse = input.question('Enter 0, 1, or 2: ');
   }
   
   let selectedAlgorithm = scoringAlgorithms[userResponse];
   console.log(`\nScore for '${userWord}': ${selectedAlgorithm.scorerFunction(userWord)}\n`);
   console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

   return selectedAlgorithm;
}

function transform(obj) {
   let newPointStructure = {};

   for (let pointValue in obj) { //iterates over keys of the object (the pointValues)
      for (i = 0; i < obj[pointValue].length; i++) { //iterates over the array associated with each key (the letters) 
       let letter = obj[pointValue][i].toLowerCase(); //assigns each letter in the array to the variable 'letter'
       newPointStructure[letter] = Number(pointValue); //creates a key for each letter, and assigns the pointValue, ensuring it is a number
      }
   }
   return newPointStructure;
};

function runProgram() {
   initialPrompt();
   scorerPrompt();

   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
