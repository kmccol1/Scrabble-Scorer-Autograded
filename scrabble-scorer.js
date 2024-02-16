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

	for (let i = 0; i < word.length; i++)
    {
 
	  for (const pointValue in oldPointStructure)
      {
 
		 if (oldPointStructure[pointValue].includes(word[i]))
         {
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

function simpleScorer(word)
{
	word = word.toUpperCase();

    let points = 0;

	for (let i = 0; i < word.length; i++)
    {
        points ++;
	}
	return points;
}

//****************************************************************************************

 const vowelPointStructure = {
  3: ['A', 'E', 'I', 'O', 'U', 'Y'],
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N',
      'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
};

function vowelBonusScorer(word)
{
	word = word.toUpperCase();
	let points = 0;

	for (let i = 0; i < word.length; i++)
    {
        if (vowelPointStructure[3].includes(word[i]))
        {
            points += 3;
        }
        else
        {
            points += 1;
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

let simpleScorerObj = {name:"Simple Score",
                       description:"Each letter is worth 1 point.",
                       scorerFunction:simpleScorer};

let vowelBonusScorerObj = {name:"Bonus Vowels",
                           description:"Vowels are 3 pts, consonants are 1 pt.",
                           scorerFunction:vowelBonusScorer};

//****************************************************************************************

function scorerPrompt()
{
    let userInput = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");

    do
    {
        if (userInput != 0 && userInput != 1 && userInput != 2)
        {
            userInput = input.question("\nError: Please enter either 0, 1, or 2: ");
        }
    }
    while(userInput != 0 && userInput != 1 && userInput != 2);

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

function scrabbleScorer(word)
{
	word = word.toLowerCase();
	let points = 0;

	for (let i = 0; i < word.length; i++)
    {
        points += newPointStructure[word[i]];
	}
	return points;
}

//****************************************************************************************

let scrabbleScorerObj = {name:"Scrabble",
                         description:"The traditional scoring algorithm.",
                         scorerFunction:scrabbleScorer};

const scoringAlgorithms = [simpleScorerObj, vowelBonusScorerObj, scrabbleScorerObj];

//****************************************************************************************

function runProgram()
{
   let userInput = initialPrompt();

   let scoringAlgorithmNum = scorerPrompt();

   console.log(`Score for '${userInput}': ${scoringAlgorithms[scoringAlgorithmNum].scorerFunction(userInput)}`);
}

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

Enter a word to score: Zox
Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: 2
Score for 'Zox': 19

*/
