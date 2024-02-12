const setKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
const allKeys = [
  'C#',
  'D#',
  'F#',
  'G#',
  'A#',
  'Db',
  'Eb',
  'Gb',
  'Ab',
  'Bb',
  'C',
  'D',
  'E',
  'F',
  'G',
  'A',
  'B'
]

function checkKey(chord) {
  return `(?<=\\s|^)${chord}(?=(m|maj|aug|dim|sus|add)?(M)?([0-9])?(?!(\\w|#)))`
}

function tranposeKey(key, keyDiff, newKey, prevKey) {
  let changedKeyIndex = 0

  let newKeyIndex = setKeys.indexOf(newKey) + 1
  let prevKeyIndex = setKeys.indexOf(prevKey) + 1
  let goHigher = newKeyIndex > prevKeyIndex

  // this is for correction, to make the 'counting' work
  switch (key) {
    case 'Db':
      key = 'C#'
      break
    case 'D#':
      key = 'Eb'
      break
    case 'Gb':
      key = 'F#'
      break
    case 'Ab':
      key = 'G#'
      break
    case 'A#':
      key = 'Bb'
      break
  }

  if (goHigher) {
    // if the new key is higher than the previous
    if (setKeys.indexOf(key) + 1 + keyDiff > setKeys.length) {
      //if the transposition overflows the array length
      changedKeyIndex = setKeys.indexOf(key) + keyDiff - setKeys.length
    } else {
      changedKeyIndex = setKeys.indexOf(key) + keyDiff
    }
  } else {
    if (setKeys.indexOf(key) + 1 - keyDiff <= 0) {
      //if the transposition overflows the array length, backwards
      changedKeyIndex = setKeys.indexOf(key) - keyDiff + setKeys.length
    } else {
      changedKeyIndex = setKeys.indexOf(key) - keyDiff
    }
  }

  return setKeys[changedKeyIndex]
}

export default function changeKey(sheetStr, newKey, prevKey) {
  let newKeyIndex = setKeys.indexOf(newKey) + 1
  let prevKeyIndex = setKeys.indexOf(prevKey) + 1

  let goHigher = newKeyIndex > prevKeyIndex
  let keyDiff = goHigher ? newKeyIndex - prevKeyIndex : prevKeyIndex - newKeyIndex

  return replacingKeys(sheetStr, keyDiff, newKey, prevKey)
}

function replacingKeys(str, keyDiff, newKey, prevKey) {
  let transposedKeyObj = {}
  let regex = ''

  for (let index in allKeys) {
    //put all keys in an object so the replace method can use it for matching.
    transposedKeyObj[allKeys[index]] = tranposeKey(allKeys[index], keyDiff, newKey, prevKey)

    //combine the regex strings
    if (parseInt(index) + 1 == allKeys.length) {
      regex = regex + checkKey(allKeys[index])
    } else {
      regex = regex + checkKey(allKeys[index]) + '|'
    }
  }

  return str.replace(new RegExp(regex, 'g'), function (match) {
    return transposedKeyObj[match]
  })
}

export { changeKey, setKeys }
