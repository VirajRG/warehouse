const initialState = {}

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIST':
      return action.items
    case 'DECREASE_QUANTITY':
      let newQuant = 0;
      return state.map(item => {
          const currentItem = (item.pickListNo == action.pickListNo && item.binName === action.binName && item.barcode == action.barcode);

            if(currentItem) newQuant = item.quantityLeft-1;

          return (currentItem)
            ? { ...item, quantityLeft: newQuant }
            : item
        }
        )
    default:
      return state
  }
}

export default items
