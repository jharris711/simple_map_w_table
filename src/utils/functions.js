export const addToOrRemoveFromArray = (objectToAdd, array, array_name) => {
  if (!array.find((x) => x.marker === objectToAdd.marker)) {
    // Push the data for clicked circle to array:
    array.push(objectToAdd);
    // console.log(`${JSON.stringify(objectToAdd)} added to ${array_name}.`);
    // console.log(`Resulting array: ${JSON.stringify(array)}`)
    return array;
  } else if (
    // If the circle has already been clicked:
    array.find((x) => x.marker === objectToAdd.marker)
  ) {
    // Remove the circle from the array:
    const filtered = array.filter((x) => x !== objectToAdd);
    // Set the arr to the filtered array:
    array = filtered;
    // console.log(`${JSON.stringify(objectToAdd)} removed from ${array_name}`);
    // console.log(`Resulting array: ${JSON.stringify(array)}`)
    return array;
  }
};

export const removeDuplicates = (array) => {
  const set = new Set(array);
  let newArray = Array.from(set);
  return newArray;
};


export const checkForIt = (object, array_to_check) => {
  if (array_to_check.some(item_in_array => item_in_array.marker === object.marker)) {
    return true
  } else {
    return false
  }
}
