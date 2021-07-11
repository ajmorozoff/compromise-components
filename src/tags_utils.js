// Concatenates an array of words into a format for matching any of them via a Compromise doc method such as `not`
// ex. (wordA|wordB|wordC)
export const createTermsList = (termsArray) => {
    const lastIndex = termsArray.length - 1;
    return termsArray.length ? termsArray.reduce((termString, term, currIndex) => {
        termString = termString + term + (currIndex === lastIndex ? ')' : '|');
        return termString;
    }, '(') : '';
}