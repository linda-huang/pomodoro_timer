/**
 * @description
 * following contains the action and reducer to indicate current mission state
 */

const NUM_REPEATS = 'NUM_REPEATS'
/**
 * @constant setBreakMin
 * a redux action defined to be called in the pomodoroReducer to define break_length
 */

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

const initialRepeats = {
    num_repeats : 0
}

/**
 * @function repeatsReducer
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

export function repeatsReducer (state = initialRepeats, action) {
    switch (action.type) {
        case NUM_REPEATS:
            return Object.assign({}, state, {
                num_repeats : action.num_repeats
            })
        default:
            return state
        }
    }
