// Script to output all matching words for a particular station.
import { options } from '@abw/badger'
import { readFileSync } from 'node:fs'

const DATA_FILE = './data/station-data.json';

async function run() {
  const config = await options({
    name: `station-words.js`,
    version: '0.0.1',
    description: `Find all words that don't share letters with a single station`,
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
        name:     'station',
        short:    's',
        about:    'Station to lookup',
        prompt:   'What station do you want to lookup?',
        type:     'text',
        required: true
      },

    ]
  });

  const json = readFileSync(DATA_FILE, { encoding: 'utf-8' });
  const byStation = JSON.parse(json);
  const station = byStation[config.station];

  if (station) {
    station.forEach(
      word => console.log(word)
    )
  }
  else {
    console.log(
      red('No words found for'),
      cyan(station)
    );
  }
}

run();
