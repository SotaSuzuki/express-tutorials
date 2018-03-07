let expressionIdCounter = 0
let animalIdCounter = 0

export const getElementById = (id, elementList) => {
  return elementList.find(element => element.id === Number(id))
}

export const getIndexById = (id, elementList) => {
  return elementList.findIndex(element => element.id === Number(id))
}

export const createElement = (elementType, queryArguments) => {
  if (queryArguments.hasOwnProperty('emoji') &&
      queryArguments.hasOwnProperty('name')) {
    let currentId
    if (elementType === 'expressions') {
      expressionIdCounter++
      currentId = expressionIdCounter
    } else {
      animalIdCounter++
      currentId = animalIdCounter
    }
    return {
      id: currentId,
      emoji: queryArguments.emoji,
      name: queryArguments.name,
    }
  } else {
    return false
  }
}

export const updateElement = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList)
  if (elementIndex === -1) {
    throw new Error('updateElement must be called with a valid id parameter')
  }
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id)
  }
  Object.assign(elementList[elementIndex], queryArguments)
  return elementList[elementIndex]
}

export const seedElements = (arr, type) => {
  if (type === 'expressions') {
    arr.push(createElement('expressions', { emoji: '🔞', name: 'banned under 18' }))
    arr.push(createElement('expressions', { emoji: '😏', name: 'niyaniya' }))
    arr.push(createElement('expressions', { emoji: '😁', name: 'smiley' }))
  } else if (type === 'animals') {
    arr.push(createElement('animals', { emoji: '🐶', name: 'dog' }))
    arr.push(createElement('animals', { emoji: '😺', name: 'cat' }))
    arr.push(createElement('animals', { emoji: '🐴', name: 'horse' }))
  } else {
    throw new Error('seed type must be either `expression` or `animal`')
  }
}
