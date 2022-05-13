const checkIsEmail = (word: string): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(word)
}

export default checkIsEmail
