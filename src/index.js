import React from 'react'
import { render } from 'react-dom'
import Grid from './Grid'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const init = {
    grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
    ],
    bar: 4,
    play: false
}

const reducer = (state = init, action) => {
    switch(action.type) {
        case 'START':
            return Object.assign({}, state, {play: true})
        case 'BAR':
            const bar = state.bar === 4 ? 1 : state.bar + 1
            return Object.assign({}, state, {bar})
        case 'TOGGLE':
            const grid = state.grid.slice()
            const [row, period] = action.id.split("|")
            const update = grid[row][period] ? null : action.id
            grid[row][period] = update
            return Object.assign({}, state, { grid })
        default:
            return state
    }
}

const store = createStore(reducer)

render(<Provider store={store}>
    <Grid />
</Provider>, document.getElementById('root'))
