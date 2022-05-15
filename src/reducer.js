const initialState = {
  priority: {
    cheapest: true,
    fastest: false,
    optimal: false,
  },
  filters: {
    all: false,
    nonStop: false,
    oneTransfer: false,
    twoTransfers: false,
    threeTransfers: false,
  },
  tickets: {
    searchId: null,
    ticketsArr: [],
    visible: [],
    sorted: [],
    numberOfVisible: 0,
    firstCall: true,
    stop: false,
  },
}

const calculateVisible = (sorted, filters, numberOfVisible) => {
  if (filters.all) {
    return sorted.slice(0, numberOfVisible)
  }
  const filtered = sorted.filter((ticket) => {
    const thereStops = ticket.segments[0].stops.length
    const backStops = ticket.segments[1].stops.length
    if (filters.nonStop && (thereStops === 0 || backStops === 0)) {
      return ticket
    }
    if (filters.oneTransfer && (thereStops === 1 || backStops === 1)) {
      return ticket
    }
    if (filters.twoTransfers && (thereStops === 2 || backStops === 2)) {
      return ticket
    }
    if (filters.threeTransfers && (thereStops === 3 || backStops === 3)) {
      return ticket
    }
    return
  })
  return filtered.slice(0, numberOfVisible)
}

const calculateFilters = (filters) => {
  let { all, ...others } = filters
  const values = Object.values(others)
  const filtered = values.filter((value) => value)
  values.length === filtered.length ? (all = true) : (all = false)
  const result = { all, ...others }
  return result
}

const reducer = (state = initialState, action) => {
  const { type } = action
  const { numberOfVisible, ticketsArr } = state.tickets

  if (type === 'CHEAPEST') {
    const sorted = ticketsArr.sort((a, b) => a.price - b.price)
    return {
      ...state,
      priority: { cheapest: true, fastest: false, optimal: false },
      tickets: {
        ...state.tickets,
        sorted,
        visible: calculateVisible(sorted, state.filters, numberOfVisible),
      },
    }
  }

  if (type === 'FASTEST') {
    const sorted = ticketsArr.sort((a, b) => {
      const durationA = a.segments.reduce((acc, value) => (acc += value.duration), 0)
      const durationB = b.segments.reduce((acc, value) => (acc += value.duration), 0)
      return durationA - durationB
    })

    return {
      ...state,
      priority: {
        cheapest: false,
        fastest: true,
        optimal: false,
      },
      tickets: {
        ...state.tickets,
        sorted,
        visible: calculateVisible(sorted, state.filters, numberOfVisible),
      },
    }
  }

  if (type === 'OPTIMAL') {
    const averageTime =
      ticketsArr.reduce((acc, ticket) => (acc += ticket.segments[0].duration + ticket.segments[1].duration), 0) /
      ticketsArr.length

    const sorted = ticketsArr
      .sort((a, b) => a.price - b.price)
      .filter((ticket) => {
        return ticket.segments.reduce((acc, value) => (acc += value.duration), 0) < averageTime * 0.7
      })

    return {
      ...state,
      priority: {
        cheapest: false,
        fastest: false,
        optimal: true,
      },
      tickets: {
        ...state.tickets,
        sorted,
        visible: calculateVisible(sorted, state.filters, numberOfVisible),
      },
    }
  }

  if (type === 'ALL') {
    let newFilters = { ...state.filters }
    for (let key in newFilters) {
      state.filters.all ? (newFilters[key] = false) : (newFilters[key] = true)
    }
    newFilters = calculateFilters(newFilters)
    return {
      ...state,
      filters: newFilters,
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }

  if (type === 'NON_STOP') {
    const newFilters = { ...state.filters, nonStop: !state.filters.nonStop }

    return {
      ...state,
      filters: calculateFilters(newFilters),
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }

  if (type === 'ONE_TRANSFER') {
    const newFilters = { ...state.filters, oneTransfer: !state.filters.oneTransfer }
    return {
      ...state,
      filters: calculateFilters(newFilters),
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }

  if (type === 'TWO_TRANSFERS') {
    const newFilters = { ...state.filters, twoTransfers: !state.filters.twoTransfers }
    return {
      ...state,
      filters: calculateFilters(newFilters),
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }
  if (type === 'THREE_TRANSFERS') {
    const newFilters = { ...state.filters, threeTransfers: !state.filters.threeTransfers }
    return {
      ...state,
      filters: calculateFilters(newFilters),
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }

  if (type === 'SEARCH_ID') {
    return { ...state, tickets: { ...state.tickets, searchId: action.payload.searchId } }
  }

  if (type === 'SEARCH_TICKETS') {
    return {
      ...state,
      tickets: {
        ...state.tickets,
        ticketsArr: [].concat(ticketsArr, action.payload.tickets),
        stop: action.payload.stop,
      },
    }
  }

  if (type === 'SHOW_MORE') {
    if (state.tickets.sorted.length + 5 <= state.tickets.numberOfVisible + 10) {
      return state
    }
    return {
      ...state,
      tickets: {
        ...state.tickets,
        visible: [...state.tickets.sorted.slice(0, state.tickets.numberOfVisible + 5)],
        numberOfVisible: (state.tickets.numberOfVisible += 5),
      },
    }
  }

  if (type === 'FIRST_CALL') {
    return {
      ...state,
      tickets: {
        ...state.tickets,
        firstCall: false,
      },
    }
  }

  return state
}

export default reducer
