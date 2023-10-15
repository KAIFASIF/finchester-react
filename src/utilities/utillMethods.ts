export const constructKeyName = (str: string) => {
  if (str) {
    let arrayOfWords = str.toLowerCase().split(" ");
    for (let i = 0; i < arrayOfWords.length; i++) {
      arrayOfWords[i] =
        arrayOfWords[i].charAt(0).toUpperCase() + arrayOfWords[i].slice(1);
    }

    const joinedWords = arrayOfWords.join("");
    return joinedWords.charAt(0).toLowerCase() + joinedWords.slice(1);
  }
};

export const convertAndCheckArray = (variable: any) => {
  if (Array.isArray(variable)) {
    const convertedArray = variable.map((item) => {
      if (typeof item === "string") {
        return item.toLowerCase().trim();
      }
      return item;
    });

    const isArrayOfStrings = convertedArray.every(
      (item) => typeof item === "string"
    );
    const isArrayOfNumbers = convertedArray.every(
      (item) => typeof item === "number"
    );

    return isArrayOfStrings || isArrayOfNumbers ? convertedArray : false;
  }
  return false;
};

export const deleteStringAllSpaces = (str: String) => {
  return str.replace(/\s+/g, "");
};
