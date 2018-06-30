export const createList = (items) => ({
  type: 'CREATE_LIST',
  items
})

export const decreaseQuantity = (pickListNo, binName, barcode) => ({
  type: 'DECREASE_QUANTITY',
  pickListNo,
  binName,
  barcode
})