//****************************************************************************************
//
//    Filename:    scrabble-scorer.js
//    Date:        5 February 2024
//    Author:      Kyle McColgan
//    Description: This program allows users to play a variation of the game 'Scrabble'.
//
//****************************************************************************************

// This assignment is inspired by a problem on Exercism
//(https://exercism.org/tracks/javascript/exercises/etl) that
//demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

//****************************************************************************************

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



function oldScrabbleScorerFunc(word)
{
	word = word.toUpperCase();
	let points = 0;
    //let points = 0;
 
	for (let i = 0; i < word.length; i++)
    {
 
	  for (const pointValue in oldPointStructure)
      {
 
		 if (oldPointStructure[pointValue].includes(word[i]))
         {
			//letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            points ++;
		 }
 
	  }
	}
	return points;
 }

//****************************************************************************************

const simplePointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  1: ['D', 'G'],
  1: ['B', 'C', 'M', 'P'],
  1: ['F', 'H', 'V', 'W', 'Y'],
  1: ['K'],
  1: ['J', 'X'],
  1: ['Q', 'Z']
};

function simpleScorerFunc(word)
{
	word = word.toUpperCase();
	//let letterPoints = "";
    let points = 0;



	for (let i = 0; i < word.length; i++)
    {


	  //for (const pointValue in simplePointStructure)
      //{
          //console.log(simplePointStructure[pointValue]);

        //if (simplePointStructure[pointValue].includes(word[i]))
        //{
        //letterPoints += `Points for '${word[i]}': ${pointValue}\n`
        points ++;
        //console.log("IF Statement");
        //}

	  //}
	}
	return points;
}

//****************************************************************************************

 const vowelPointStructure = {
  3: ['A', 'E', 'I', 'O', 'U', 'Y'],
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N',
      'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
};

function vowelBonusScorerFunc(word)
{
	word = word.toUpperCase();
	let points = 0;

	for (let i = 0; i < word.length; i++)
    {

	  for (const pointValue in vowelPointStructure)
      {

		 if (vowelPointStructure[pointValue].includes(word[i]))
         {
             //letterPoints += `Points for '${word[i]}': ${pointValue}\n`
             points ++;
		 }

	  }
	}
	return points;
}

//****************************************************************************************

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt()
{
   let word = input.question("Let's play some Scrabble!\n\nEnter a word to score: ");

   return word;
};

//****************************************************************************************

let simpleScorer = {name:"Simple Score",
                    description:"Each letter is worth 1 point.",
                    scoringFunction:simpleScorerFunc};

let vowelBonusScorer = {name:"Bonus Vowels",
                        description:"Vowels are 3 pts, consonants are 1 pt.",
                        scoringFunction:vowelBonusScorerFunc};

let scrabbleScorer = {name:"Scrabble",
                      description:"The traditional scoring algorithm.",
                      scoringFunction:oldScrabbleScorerFunc};

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

//****************************************************************************************

function scorerPrompt()
{
    let userInput = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");

   return Number(userInput);
}

//****************************************************************************************

function transform(ogPointStructureObj)
{
    let newScoringObj = {}; //lowercase letters as keys.

    for (const value in ogPointStructureObj )
    {
        for (let i = 0; i < ogPointStructureObj[value].length; i ++ )
        {
            newScoringObj[ogPointStructureObj[value][i].toLowerCase()] = Number(value);
        }

    }

    return newScoringObj;
}

//****************************************************************************************

let newPointStructure = transform(oldPointStructure);

//****************************************************************************************

function runProgram()
{
   //let userInput = initialPrompt();

   //let scoringAlgorithmNum = scorerPrompt();

   //console.log("Scoring algoithm:", scoringAlgorithms[scoringAlgorithmNum]);

   //console.log(`Score for '${userInput}': ${scoringAlgorithms[scoringAlgorithmNum].scoringFunction(userInput)}`);
    console.log(newPointStructure);
}

runProgram();

//****************************************************************************************

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

//****************************************************************************************

/*
Scrabble-Scorer-Autograded> node index
Let's play some Scrabble!

Enter a word to score: coconut
Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: 0
Score for 'coconut': 7
*/
