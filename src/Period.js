import React from 'react'
import { connect } from 'react-redux'
import actions from './actions'

class Period extends React.Component {
    onClick = () => {
        this.props.TOGGLE(this.props.id)
    }
    render() {
        const [col] = this.props.id.split("|")
        const bg = this.props.period ? "bg-yellow" : "bg-light-yellow"
        const lastBar = this.props.bar === 1 ? 4 : this.props.bar - 1
        const border = lastBar === (Number(col) +1) ? "b--yellow" : "b--transparent"

        return (
            <div className={`w2 h2 ma1 hover-bg-yellow ba ${bg} ${border}`} onClick={this.onClick}>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    bar: state.bar
})
export default connect(mapStateToProps, actions)(Period)