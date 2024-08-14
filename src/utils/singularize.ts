export const singularize = (word: string): string => {
  const endings: { [key: string]: string } = {
    ves: 'fe',
    ies: 'y',
    i: 'us',
    zes: 'ze',
    ses: 's',
    es: 'e',
    s: '',
  }

  return word.replace(
    new RegExp(`(${Object.keys(endings).join('|')})$`),
    (r: string) => endings[r],
  )
}
