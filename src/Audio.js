import React from 'react'
import { connect } from 'react-redux'
import actions from './actions'
import AudioWorker from './audio.worker'

class AudioEngine extends React.Component {
    state = {
        context: new AudioContext(),
        noteLength: 0.5,
        notes: []
    }
    addTimesToBuffer = notes => {
        let start, stop;
        if (!notes.length) {
            start = 0
            stop = start + this.state.noteLength
        } else {
            start = notes[notes.length - 1].start + this.state.noteLength
            stop = start + this.state.noteLength
        }
        notes.push({ start, stop })
        return notes.length < 4 ? this.addTimesToBuffer(notes) : this.setState({notes})
    }
    buffer = () => {
        this.playNotes()
        this.props.BAR()
        this.addTimesToBuffer(this.state.notes.slice(1))
    }
    convertGridRefToFreq = () => {
        return this.props.grid[this.props.bar - 1]
            .filter(note => note)
            .map(note => {
                const block = note.split("|")[1]
                return [1047.0, 784.0, 659.3, 523.3][block]
            })
    }
    playNotes = () => {
        if (!this.state.notes.length) return

        const { start, stop } = this.state.notes[0]
        
        this.convertGridRefToFreq().forEach(freq => {
            const o = this.state.context.createOscillator()
            const g = this.state.context.createGain()
            o.frequency.value = freq
            o.connect(g)
            g.connect(this.state.context.destination)
            o.start(start)
            g.gain.linearRampToValueAtTime(0.0000001, stop)
            o.stop(stop)
        })
    }
    componentDidMount() {
        const worker = new AudioWorker()
        worker.onmessage = this.buffer
        worker.postMessage("start")
        this.addTimesToBuffer([])
        this.buffer()
    }
    render() {
        return <samp></samp>
    }
}

const mapStateToProps = state => ({
    grid: state.grid,
    bar: state.bar
})
export default connect(mapStateToProps, actions)(AudioEngine)