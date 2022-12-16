# Badger Hunt

*We're going on a badger hunt, we're going to find a single one...*

In response to the question
[What is an interesting British fact you know?](https://www.reddit.com/r/AskUK/comments/zmiv5z/what_is_an_interesting_british_fact_you_know/j0c524j/), asked
on the [/r/AskUK](https://www.reddit.com/r/AskUK/) subreddit in December 2022,
[/u/roomal29 replied](https://www.reddit.com/r/AskUK/comments/zmiv5z/what_is_an_interesting_british_fact_you_know/j0bkomt/):

    Pimlico is the only London Underground station that shares no letters
    with the word Badger.

My curiosity was piqued.  Being a fan of badgers (as you might guess from the
naming convention of many of my repositories), and liking a challenge, I
decided to write some code to check that this was correct and find other
combinations of words and stations that match the pattern.

Here's [my reply](https://www.reddit.com/r/AskUK/comments/zmiv5z/what_is_an_interesting_british_fact_you_know/j0c524j/).

This repository contains the code for not only checking that *Pimlico* really
is the only London Underground station that *doesn't* share any letters with
the word *badger*, or that *St John's Wood* is the only one that doesn't
share any letters with *mackerel*, but also to find all the words like
*badger* and *mackerel* that share letters with every tube station except one.

Since posting my original reply I've modified the code to use a more selective
dictionary that contains the 25,000 most popular words in the English language.
The results show that there are 3,485 words like *badger* and *mackerel*,
for which there is only one station that doesn't share any letters with it.

The full list of words and stations can be found [here](data/word-stations.csv).

# Installation

This software is written in Javascript.  You will need to install
[node.js](https://nodejs.org/en/) to run it on your computer.

If you have [git](https://git-scm.com/) installed and you know how to use
it then you can clone this repository to your machine.

```sh
git clone https://github.com/abw/badger-hunt.git
```

If you don't have git then you can download the code as a zip file and
unpack it.

You then need to install the dependencies.  From this top-level directory,
run the following command:

```sh
npm install
```

If you have a favourite package manager other than `npm` (I like to use
[pnpm](https://pnpm.io/)) then you can use that instead.

```sh
pnpm install
```

# Running the Scripts

## badger-hunt.js

The first script, [badger-hunt.js](badger-hunt.js), will search for a
word like *badger* to confirm that there really is only one tube station
(*Pimlico* in this case) that *doesn't* share any letters with it.

Run the script like so:

```sh
node badger-hunt.js
```

You will be prompted to enter the word that you want to check.

```
? What word do you want to compare to Tube stations? ›
```

Enter the word and press `RETURN`.  The program will display all the
tube stations that **don't** share any letters with the word.

```
There is exactly one station that doesn't share any letters with badger
 - Pimlico
```

## station-words.js

The second script, [station-words.js](station-words.js), will find all words
for a particular station.

Run the script like so:

```sh
node station-words.js
```

You will be prompted to enter the station that you want to check.

```
? What word do you want to compare to Tube stations? › North Harrow
```

It will then print a list of all words that don't share letters with any
stations except that one.  For *North Harrow*, for example, there is only
one word:

```
buckled
```

## all-words.js

The third script, [all-words.js](all-words.js), will find all words
like *badger* that have only a single tube station (like *Pimlico*) that
*don't* share any letters with it.

Run the script like so:

```sh
node all-words.js
```

It will take a while to run the script.  Depending on your computer this
might be anything from a few seconds to a few minutes.

It generates a number of data files that are written to the [data](./data)
directory.  See the next section for an explanation.

# Data Files

The following data files can be found in the [data](./data) directory.

## tube-stations.txt

This contains a list of all London Underground (aka "Tube") stations.

```
Acton Town
Aldgate
Aldgate East
...etc...
```

## popular-words.txt

This contains a list of around 25,000 popular words in the English language.

```
aa
aardvark
aargh
...etc...
```

## station-count.csv

This contains a list of tube stations that have one or more matching word.
Each line contains comma separated values (CSV) of the station name and the
count of the number of words.  You should be able to import this into any
spreadsheet application.

```
Buckhurst Hill,1
North Harrow,1
Boston Manor,1
...etc..
Bromley-by-Bow,7
Blackfriars,7
Maida Vale,7
...etc...
```

## word-stations.csv

This contains a list of all words matching a station.  Each line contains
comma separated values (CSV) of the word and matching station name.

```
abandoned,Ruislip
abandoning,Temple
abandonment,Ruislip
...etc...
```

## station-data.json

This contains all the stations and associated words in JSON format.
There is a single object in which the keys are station names and the
associated values are an array of matching words.

```
{
    "Ruislip": [
        "abandoned","abandonment","abdomen","abode","above", ...etc...
    ],
    ...etc...
}
```

# Modifying the Scripts

You can easily modify the script(s) to compare words against something other
than London Underground stations.  You will need to create a text file that
contains all the items that you want to compare against, with one on each line,
and save it in the [data](./data) directory.

For example, if you want to compare against US states then you could
create a file called `data/us-states.txt` that looked like this:

```
Alabama
Alaska
Arizona
Arkansas
...etc...
```

Find the line near the top of the script that looks like this:

```js
const STATIONS_FILE = './data/tube-stations.txt';
```

Then change it to point to your new file:

```js
const STATIONS_FILE = './data/us-states.txt';
```

You should run the [all-words.js](all-words.js) script to generate all
the data files.  You might also want to change the names of the output
files at the top of that file.

```
const STATIONS_FILE = './data/tube-stations.txt';
const WORDS_FILE    = './data/popular-words.txt';
const OUTPUT_FILE   = './data/word-stations.csv';
const COUNT_FILE    = './data/station-count.csv';
const DATA_FILE     = './data/station-data.json';
```

# US States

In response to a request from Reddit, I've added the data for US states.

* [data/us-states.txt](data/us-states.txt) - source list
* [data/us-states-data.json](data/us-states-data.json) - full data for words matching states
* [data/us-states-count.csv](data/us-states-count.csv) - count of matching words by state
* [data/word-us-states.csv](data/word-us-states.csv) - words matching each state
* [us-state-words.js](us-state-words.js) - script to lookup words for a state

# Sources

The list of [London Underground stations](data/tube-stations.txt)
was copied from [this wikipedia page](https://en.wikipedia.org/wiki/List_of_London_Underground_stations).

I'm afraid I can't remember where I got the the list of
[popular words](data/popular-words.txt) from.  I downloaded it a few years
ago for another project and don't have any record of the source.  However,
I wouldn't have used it if it wasn't Open Source or in the public domain.
If you know the source then please contact me so that I can update this
document to give appropriate credit.

# Author

Andy Wardley - https://github.com/abw
