#! /usr/bin/env node
'use strict';

const request = require('request');
const zlib = require('zlib');
const chalk = require('chalk');
const cheerio = require('cheerio')

const stream = request({
  method: 'GET',
  headers: {'accept-encoding': 'gzip'},
  uri: 'http://www.nytimes.com/elections/results/president',
}).pipe(zlib.createGunzip());

let html = '';

stream.on('data', function(chunk) {
  html += chunk;
});

stream.on('end', function() {

  const width = process.stdout.columns;
  let $ = cheerio.load(html);
  let clinton = $('.eln-democrat.eln-group').children()[0].children[0].data;
  let trump = $('.eln-republican.eln-group').children()[0].children[0].data
  console.log(`Clinton: ${chalk.blue(clinton)}`);
  console.log(`Trump: ${chalk.red(trump)}`);

  process.exit();
});
