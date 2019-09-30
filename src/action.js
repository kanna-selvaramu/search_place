export const RECEIVED_DATA = 'RECEIVED_DATA'
export const GET_DATA = 'GET_DATA'
export const CLEAR_DATA = 'CLEAR_DATA'
export function updateHistory(results) {
  return { 
    type: RECEIVED_DATA, payload: results 
  }
}
export function clearHistory() {
  return { 
    type: CLEAR_DATA
  }
}