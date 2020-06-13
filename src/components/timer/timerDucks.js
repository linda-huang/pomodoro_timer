/**
 * @description
 * following contains the action and reducer to indicate current mission state
 */

const BREAK_LENGTH = 'BREAK_LENGTH'
const WORK_LENGTH = 'WORK_LENGTH'
const NUM_REPEATS = 'NUM_REPEATS'

/**
 * @constant setBreakLength
 * a redux action defined to be called in the pomodoroReducer to define break_length
 */
export const setBreakLength = break_length => 
    ({
        type : BREAK_LENGTH,
        break_length
    })

export const setWorkLength = work_length => (
    {
        type : WORK_LENGTH,
        work_length
    }
)

export const setNumRepeats = num_repeats => (
    {
        type: NUM_REPEATS,
        num_repeats
    }
)

 /**
 * @constant initialPomodoroState
 * a intial state for the pomodoroReducer that indicates 25 min work and 5 min break
 */
const initialPomodoroState = {
    work_length: 25,
    break_length: 5,
    num_repeats: 0
}

/**
 * @function pomodoroReducer
 * A reducer that takes in a current PomodoroState and actions and returns a new state which 
 * indicates the current break_length and work_length
 * 
 * @param {constant} state 
 * A redux state with fields break_length and work_length
 * 
 * @param {constant} action 
 * An action is triggered when being dispatched
 * 
 * @description
 * This pomodoroReducer updates the current break length and work length
 */
export function pomodoroReducer(state = initialPomodoroState, action) {
    switch (action.type) {
        case BREAK_LENGTH:
            console.log('changing break_length')
            return Object.assign({}, state, {
                break_length: action.break_length
            })
        case WORK_LENGTH:
            console.log('changing work_length')
            return Object.assign({}, state, {
                work_length: action.work_length
            }) 
        case NUM_REPEATS:
            return Object.assign({}, state, {
                num_breaks: action.num_breaks
            })
        default:
            return state
      }
    }
