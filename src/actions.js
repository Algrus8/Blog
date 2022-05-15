export const onCheapest = () => ({ type: 'CHEAPEST' })
export const onFastest = () => ({ type: 'FASTEST' })
export const onOptimal = () => ({ type: 'OPTIMAL' })
export const onAll = () => ({ type: 'ALL' })
export const onFirstCall = () => ({ type: 'FIRST_CALL' })
export const onNonStop = () => ({ type: 'NON_STOP' })
export const onOneTransfer = () => ({ type: 'ONE_TRANSFER' })
export const onTwoTransfers = () => ({ type: 'TWO_TRANSFERS' })
export const onThreeTransfers = () => ({ type: 'THREE_TRANSFERS' })
export const onShowMore = () => ({ type: 'SHOW_MORE' })

export const fetchSearchId = () => (dispatch) => {
  fetch('https://aviasales-test-api.kata.academy/search')
    .then((response) => response.json())
    .then((json) => dispatch({ type: 'SEARCH_ID', payload: json }))
    .catch((error) => {
      throw new Error(error.message)
    })
}

export const fetchTickets = (searchId) => (dispatch) => {
  fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    .then((response) => response.json())
    .then((json) => dispatch({ type: 'SEARCH_TICKETS', payload: json }))
    .catch((error) => {
      dispatch(fetchTickets(searchId))
      throw new Error(error.message)
    })
}
