"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */

     // Convert both words to uppercase to make the comparison case-insensitive.
     const upperWord = word.toUpperCase();
     const upperGuess = guess.toUpperCase();
 
     // Use an object to track the count of each letter in the first word.
     const letterCount = {};
     for (const letter of upperWord) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
  }
 
     // Count the number of matching letters.
     let   matchCount = 0;
     for (const letter of upperGuess) {
         if (letterCount[letter] && letterCount[letter] > 0) {
             matchCount++;
             letterCount[letter]--;
         }
     }
 
     return matchCount;
}
