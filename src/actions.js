export default msg => {
    return {
        BAR:   () => msg({type: 'BAR'  }),
        TOGGLE: id => msg({type: 'TOGGLE', id: id}),
        START: () => msg({type: 'START'})
    }
}