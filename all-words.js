// Script to find all matching words/stations and generate data files.
import { options } from '@abw/badger'
import { writeFileSync } from 'node:fs'
import {
  buildLookupTable, singleStationNotMatchingWord, loadDictionary,
  cyan
} from "./library.js";

const STATIONS_FILE = './data/tube-stations.txt';
const WORDS_FILE    = './data/popular-words.txt';
const OUTPUT_FILE   = './data/word-stations.csv';
const COUNT_FILE    = './data/station-count.csv';
const DATA_FILE     = './data/station-data.json';

async function run() {
  const config = await options({
    name: `all-words.js`,
    version: '0.0.1',
    description: `Find all words that don't share letters with any station except one`,
    options: [
      {
        name:     'debug',
        short:    'd',
        about:    'Debugging',
      },
      {
        name:     'verbose',
        short:    'v',
        about:    'Verbose',
      },
    ]
  });

  if (config.verbose) {
    console.log(cyan(`Loading words...`));
  }

  const stations = buildLookupTable(STATIONS_FILE);
  const words = loadDictionary(WORDS_FILE);

  if (config.verbose) {
    console.log(cyan(`Searching words...`));
  }

  const byStation = { };
  const matches = words
    .map(
      word => {
        const station = singleStationNotMatchingWord(stations, word);
        // no match, carry on
        if (! station) {
          return false;
        }
        // add the word to the station list
        const list = byStation[station] ||= [ ];
        list.push(word);
        // return a match
        return [ word, station ];
      }
    )
    .filter(
      item => item
    )

  console.log(`There are ${words.length} matching words`);

  // flatten all matches to a string
  const output = matches
    .map( match => match.join(',') )
    .join("\n");

  // write all matches to a file
  if (config.verbose) {
    console.log(cyan(`Writing output to ${OUTPUT_FILE}...`));
  }
  writeFileSync(OUTPUT_FILE, output, { encoding: 'utf-8' })
  console.log(cyan(`Output written to ${OUTPUT_FILE}`));

  // flatten the station/list of words to a count string
  const counts = Object.entries(byStation)
    .sort(
      (a, b) => a[1].length - b[1].length
    )
    .map(
      ([station, words]) => [station, words.length].join(',')
    )
    .join("\n");

  // write the station frequency to a file
  if (config.verbose) {
    console.log(cyan(`Writing output to ${COUNT_FILE}...`));
  }
  writeFileSync(COUNT_FILE, counts, { encoding: 'utf-8' })
  console.log(cyan(`Station counts written to ${COUNT_FILE}`));

  // write the station data to a file
  if (config.verbose) {
    console.log(cyan(`Writing data to ${DATA_FILE}...`));
  }
  writeFileSync(DATA_FILE, JSON.stringify(byStation), { encoding: 'utf-8' })
  console.log(cyan(`Station data written to ${DATA_FILE}`));
}

run();
