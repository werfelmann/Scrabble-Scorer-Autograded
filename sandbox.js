const oldPointStructure = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
 };

 let newPointStructure = transform(oldPointStructure);

 function transform(obj) {
    let newPointStructure = {};
 
    for (let pointValue in obj) { //iterates over keys of the object (the pointValues)
       for (i = 0; i < obj[pointValue].length; i++) { //iterates over the array associated with each key (the letters) 
        let letter = obj[pointValue][i].toLowerCase() //assigns each letter in the array to the variable 'letter'

        newPointStructure[letter] = Number(pointValue); //creates a key for each letter, and assigns the pointValue, ensuring it is a number
       }
    }
    return newPointStructure;
 };

//  console.log("Letters with score '4':", oldPointStructure[4]);
//  console.log("3rd letter within the key '4' array:", oldPointStructure[4][2]);
 
//  let letters = oldPointStructure[8];
//  console.log("Letters with score '8':", letters);
//  console.log("2nd letter within the key '8' array:", letters[1]);

function scrabbleScorer(word) {
    word = word.toLowerCase();
    let points = 0;
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];
        console.log(newPointStructure[letter]);
        points += Number(newPointStructure[letter]);
    }
    
    return points;
  };

  console.log(scrabbleScorer('hello'));