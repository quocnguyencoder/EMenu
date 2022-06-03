import Filter from 'bad-words'
import badWordsList from 'assets/badWords.json'

const hasBadWords = (comment: string) => {
  const addList = Object.keys(badWordsList)
  const badWords = new Filter()
  badWords.addWords(...addList)
  for (let i = 0; i < badWords.list.length; i++) {
    if (
      comment
        .replace(/\s+/g, ' ')
        .trim()
        .toLocaleLowerCase()
        .includes(badWords.list[i])
    ) {
      return true
    }
  }
  return false
}

export default hasBadWords
