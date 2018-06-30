const initialState = {}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIST':
      return {
        items: action.items
      }
    case 'DECREASE_QUANTITY':
      let newQuant = 0;
      return {
        items: state.items.map(item => {

          const currentItem =
            item.pickListNo == action.pickListNo
            && item.binName === action.binName
            && item.barcode == action.barcode;

            if(currentItem) newQuant = item.quantityLeft-1;

          return (currentItem)
            ? { ...item, quantityLeft: newQuant }
            : item
        }
        )

      }
    // case 'SET':
    //   if (!action.state || typeof action.state !== 'string' || action.value === undefined) return state
    //   var nextState = Object.assign({}, state)
    //   var ok = storeValue(nextState, action.state, action.value)
    //   if (!ok) return state
    //   return nextState

    // case 'RESET':
    //   if (!action.state || typeof action.state !== 'string') return state
    //   if (action.state === '') return initialState
    //   var nextState = Object.assign({}, state)
    //   const {
    //     found,
    //     value
    //   } = loadValue(initialState, action.state)
    //   if (!found) return state
    //   var ok = storeValue(nextState, action.state, value)
    //   if (!ok) return state
    //   return nextState

    // case 'PUSH':
    //   if (!action.state || typeof action.state !== 'string' || action.value === undefined) return state
    //   var nextState = Object.assign({}, state)
    //   var {
    //     found,
    //     value
    //   } = loadValue(nextState, action.state)
    //   if (!found || !Array.isArray(value)) return state
    //   var ok = storeValue(nextState, action.state, [...value, action.value])
    //   if (!ok) return state
    //   return nextState

    // case 'PREPEND':
    //   if (!action.state || typeof action.state !== 'string' || action.value === undefined) return state
    //   var nextState = Object.assign({}, state)
    //   var {
    //     found,
    //     value
    //   } = loadValue(nextState, action.state)
    //   if (!found || !Array.isArray(value)) return state
    //   var ok = storeValue(nextState, action.state, [action.value, ...value])
    //   if (!ok) return state
    //   return nextState

    // case 'REMOVE_BY_VALUE':
    //   if (!action.state || typeof action.state !== 'string' || action.value === undefined) return state
    //   var nextState = Object.assign({}, state)
    //   var {
    //     found,
    //     value
    //   } = loadValue(nextState, action.state)
    //   if (!found || !Array.isArray(value)) return state
    //   var ok = storeValue(nextState, action.state, value.filter(item => item !== action.value))
    //   if (!ok) return state
    //   return nextState

    // case 'REMOVE_BY_INDEX':
    //   if (!action.state || typeof action.state !== 'string' || action.index === undefined || isNaN(action.index)) return state
    //   var nextState = Object.assign({}, state)
    //   var {
    //     found,
    //     value
    //   } = loadValue(nextState, action.state)
    //   if (!found || !Array.isArray(value)) return state
    //   var ok = storeValue(nextState, action.state, value.filter((item, index) => index !== action.index))
    //   if (!ok) return state
    //   return nextState

    // case 'REMOVE_BY_KEY':
    //   if (!action.state || typeof action.state !== 'string' || !action.key || typeof action.key !== 'string' || action.value === undefined) return state
    //   var nextState = Object.assign({}, state)
    //   var {
    //     found,
    //     value
    //   } = loadValue(nextState, action.state)
    //   if (!found || !Array.isArray(value)) return state
    //   var ok = storeValue(nextState, action.state, value.filter(item => item[action.key] !== action.value))
    //   if (!ok) return state
    //   return nextState

    // case 'MODIFY_ARRAY':
    //   if (!action.state || typeof action.state !== 'string' || !action.cb || typeof action.cb !== 'function') return state
    //   var nextState = Object.assign({}, state)
    //   var {
    //     found,
    //     value
    //   } = loadValue(nextState, action.state)

    //   if (!found || !Array.isArray(value)) return state
    //   var result = value.slice()
    //   if (!action.find || typeof action.find !== 'function') result = result.map(obj => action.cb(obj))
    //   else result = result.map(obj => {
    //     const ok = action.find(obj)
    //     if (ok) return action.cb(obj)
    //     else return obj
    //   })
    //   console.log('Result', result);

    //   var ok = storeValue(nextState, action.state, result)
    //   if (!ok) return state
    //   return nextState

    // case 'FUNCTION':
    //   if (!action.state || typeof action.state !== 'string' || !action.cb || typeof action.cb !== 'function') return state
    //   var nextState = Object.assign({}, state)
    //   var {
    //     found,
    //     value
    //   } = loadValue(nextState, action.state)
    //   if (!found) return state
    //   var result = action.cb(value)
    //   if (result === undefined) return state
    //   return result

    default:
      return state
  }
}

const loadValue = (state, key) => {
  const keys = key.split('.')
  let result = {
    found: false,
    value: undefined
  }
  let len = keys.length
  for (let i = 0; i < len; i++) {
    if (state === undefined || state === null || !isObject(state) || !state.hasOwnProperty(keys[i])) {
      break
    }
    if (i === len - 1) result = {
      found: true,
      value: state[keys[i]]
    }
    else state = state[keys[i]]
  }
  return result
}

const storeValue = (state, key, value) => {
  const keys = key.split('.')
  let ok = true
  let len = keys.length
  for (let i = 0; i < len; i++) {
    if (!state.hasOwnProperty(keys[i])) {
      ok = false
      break
    }
    if (i === len - 1) state[keys[i]] = value
    else state = state[keys[i]]
  }
  return ok
}

function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}


export default reducers