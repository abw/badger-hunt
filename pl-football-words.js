// Script to output all matching words for a particular station.
import { options, red, cyan } from '@abw/badger'
import { readFileSync } from 'node:fs'

const DATA_FILE = './data/uk-pl-team-data.json';

async function run() {
  const config = await options({
    name: `pl-football-words.js`,
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
        name:     'team',
        short:    't',
        about:    'Team to lookup',
        prompt:   'What team do you want to lookup?',
        type:     'text',
        required: true
      },

    ]
  });

  const json = readFileSync(DATA_FILE, { encoding: 'utf-8' });
  const byTeam = JSON.parse(json);
  const team = byTeam[config.team];

  if (team) {
    team.forEach(
      word => console.log(word)
    )
  }
  else {
    console.log(
      red('No words found for'),
      cyan(team)
    );
  }
}

run();
