/* 
This functions by getting the whole input of a user, dissect each line and checks if there are
one liner prefixes, else proceed to parse chords and lyrics by checking each words one by one
TODO: I wanted to make it more maintainable, customizable, and parse the whole text instead of
parsing each line
*/
import sanitizeHtml from 'sanitize-html';
let parsedLineOfStrs = [];

export default function parseSheet(input) {
  parsedLineOfStrs = [];
  let lineOfStrings = input.split('\n');

  lineOfStrings.forEach((str) => {
    let parsedStr = '';

    if (isHr(str)) {
      parsedStr = str.replace(/-{3,}/g, '<hr>');
      parsedLineOfStrs.push(parsedStr);
    } else if (isSongSection(str)) {
      parsedStr = str.replace(/>> /, '');
      parsedLineOfStrs.push(`<div class="song-section">${parsedStr}</div>`);
    } else {
      //if there is no prefix or one liner syntax like --- for hr
      let parsedPhrases = [];
      let phrases = str.replace(/ /g, '|&nbsp|').split('|');

      phrases.forEach((songEntity) => {
        if (isChord(songEntity)) {
          //if it is a chord
          parsedPhrases.push(`<span class="chord">${songEntity}</span>`);
        } else if (isInfo(songEntity)) {
          //if it is an info
          let parsedSongEntity = songEntity.replace(/\*/g, '');
          parsedPhrases.push(`<span class="info">${parsedSongEntity}</span>`);
        } else {
          //if it is a lyrics
          parsedPhrases.push(songEntity);
        }
      });

      parsedLineOfStrs.push(`${parsedPhrases.join('')} <br>`);
    }
  });

  return sanitizeHtml(parsedLineOfStrs.join(''), {
    allowedAttributes: false
  });
}

function isChord(str) {
  return /(?<=\s|^)([A-G])([#b]?)(?=((m|maj|aug|dim|sus|add)?(M)?([0-9])?(?!(\w|#))$)|((\/[A-G])([#b]?)(?!(\w|#))$))/.test(
    str
  );
}

function isHr(str) {
  return /-{3,}/.test(str);
}

function isSongSection(str) {
  return /^>> /.test(str);
}

function isInfo(str) {
  return /\*.*\*/.test(str);
}
