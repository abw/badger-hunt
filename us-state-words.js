// Script to output all matching words for a particular station.
import { options } from '@abw/badger'
import { readFileSync } from 'node:fs'

const DATA_FILE = './data/us-states-data.json';

async function run() {
  const config = await options({
    name: `us-state-words.js`,
    version: '0.0.1',
    description: `Find all words that don't share letters with a single US state`,
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
        name:     'state',
        short:    's',
        about:    'State to lookup',
        prompt:   'What state do you want to lookup?',
        type:     'text',
        required: true
      },

    ]
  });

  const json = readFileSync(DATA_FILE, { encoding: 'utf-8' });
  const byState = JSON.parse(json);
  const state = byState[config.state];

  if (state) {
    state.forEach(
      word => console.log(word)
    )
  }
  else {
    console.log(
      red('No words found for'),
      cyan(state)
    );
  }
}

run();
