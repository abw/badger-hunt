// Library of common functions used by other scripts.
import { readFileSync } from "node:fs";
import { color } from '@abw/badger';

// Create a lookup table that maps each station name to a lookup table for
// the letters in it, e.g.
// {
//    Pimlico: { p: true, i: true, m: true, l: true, c: true, o: true } }
//    ...and all the other stations...
// }
export function buildLookupTable(file) {
  return readFileSync(file, { encoding: 'utf-8' })
    .trim()                       // remove leading/trailine whitespace
    .split("\n")                  // split into lines
    .filter(                      // remove blank/empty lines
      line => line.length
    )
    .map(                         // convert each station into letter table
      station => {
        return [
          station,
          [...station.toLowerCase()]
            .filter(              // ignore non-alphanumeric characters
              char => char.match(/\w/)
            )
            .reduce(              // convert list of chars to lookup table
            (table, char) => {
              table[char] = true;
              return table;
            },
            { }
          )
        ]
      }
    )
    .reduce(                      // map station name to chars lookup table
      (table, [station, chars]) => {
        table[station] = chars;
        return table;
      },
      { }
    )
}

export function loadDictionary(file) {
  return readFileSync(file, { encoding: 'utf-8' })
    .trim()                       // remove leading/trailine whitespace
    .split("\n")                  // split into lines
    .filter(                      // remove blank/empty lines
      line => line.length
    )
}

// Return an array of all unique letters in a word, converted to lower case.
export function uniqueLettersInWord(word) {
  return Object.keys(
    word
      .toLowerCase()
      .replace(/\W+/, '')
      .split('')
      .reduce(
        (table, char) => {
          table[char] = true;
          return table;
        },
        { }
      )
  );
}

// Return an array of all stations not sharing any characters with a word.
export function stationsNotMatchingWord(stations, word) {
  const letters = uniqueLettersInWord(word);
  return Object.entries(stations)
    .filter(
      ([station, charTable]) => letters.every(
        letter => ! charTable[letter]
      )
    )
    .map(
      ([station]) => station
    )
}

// Return a single station that doesn't share any characters with a word
// or false if there isn't a single station matching.
export function singleStationNotMatchingWord(stations, word) {
  const found = stationsNotMatchingWord(stations, word);
  return found.length === 1
    ? found[0]
    : false;
}

export const red = color('bright red');
export const cyan = color('bright cyan');
export const green = color('bright green');
export const yellow = color('bright yellow');