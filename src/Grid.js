import React from 'react'
import { connect } from 'react-redux'
import Period from './Period'
import actions from './actions'
import AudioEngine from './Audio'

const Grid = props => {
    return (
        <main className="center w-60 mt6 sans-serif">
            <section className="flex items-center justify-center bg-washed-yellow pv3 ba b--yellow">
                {props.play ? props.grid.map((col, col_id) => {
                    return <section key={`col-${col_id}`} className="flex flex-column">{col.map((period, period_id) => {
                        const id = `${col_id}|${period_id}`
                        return <Period key={id} period={period} id={id} />
                    })}</section>
                }) : null}
            </section>
            <section>
                <small className="yellow">
                    {props.play ? "click on the squares to turn them on" : <span className="pointer" onClick={props.START}>start audio engine</span>}
                </small>
            </section>
            {props.play ? <AudioEngine /> : null}
        </main>
    )
}

const mapStateToProps = state => ({
    grid: state.grid,
    play: state.play
})
export default connect(mapStateToProps, actions)(Grid)