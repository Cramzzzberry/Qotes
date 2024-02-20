export function debounce(mainFunction, wait = 500) {
  let timer

  return function () {
    clearTimeout(timer)

    timer = setTimeout(() => {
      mainFunction()
    }, wait)
  }
}
