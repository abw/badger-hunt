// Script to check if a given word (e.g. "badger") has only one station
// that it doesn't share any letters with (e.g. "Pimlico").
import {
  buildLookupTable, stationsNotMatchingWord,
  red, cyan, yellow, green
} from "./library.js";
import { options } from '@abw/badger'

const STATIONS_FILE = './data/tube-stations.txt';

async function run() {
  const config = await options({
    name: `badger-hunt.js`,
    version: '0.0.1',
    description: `Compare a word for letters shared with London tube stations`,
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
      {
        name:     'word',
        short:    'w',
        about:    'Word to compare',
        prompt:   'What word do you want to compare to Tube stations?',
        type:     'text',
        required: true
      },
    ]
  });

  const word = config.word;
  if (config.verbose) {
    console.log(cyan(`Looking for ${word}...`));
  }

  const stations = buildLookupTable(STATIONS_FILE);
  const matches = stationsNotMatchingWord(stations, word);

  if (matches.length === 0) {
    console.log(
      red("There aren't any stations that don't share any letters with"),
      cyan(word)
    );
    return;
  }
  if (matches.length === 1) {
    console.log(
      green("There is exactly one station that doesn't share any letters with"),
      cyan(word)
    );
  }
  else {
    console.log(
      yellow(`There are ${matches.length} stations that don't share any letters with`),
      cyan(word)
    );
  }
  matches.forEach(
    match => console.log(cyan(` - ${match}`))
  )
}

run();
