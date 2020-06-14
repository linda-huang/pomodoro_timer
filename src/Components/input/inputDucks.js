/**
 * @description
 * following contains the action and reducer to indicate current mission state
 */

const BREAK_MIN = 'BREAK_MIN'
const BREAK_HOUR = 'BREAK_HOUR'
const WORK_MIN = 'WORK_MIN'
const WORK_HOUR = 'WORK_HOUR'

/**
 * @constant setBreakMin
 * a redux action defined to be called in the pomodoroReducer to define break_length
 */
export const setBreakMin = minutes => 
    ({
        type : BREAK_MIN,
        minutes
    })

export const setBreakHour = hours => 
({
    type : BREAK_HOUR,
    hours
})

export const setWorkMin = minutes => (
    {
        type : WORK_MIN,
        minutes
    }
)

export const setWorkHour = hours => (
    {
        type : WORK_HOUR,
        hours
    }
)

 /**
 * @constant initialPomodoroState
 * a intial state for the pomodoroReducer that indicates 25 min work and 5 min break
 */
const initialWorkLen = {
    work_hour: 0,
    work_min : 25,
}

const initialBreakLen = {
    break_hour: 0,
    break_min: 5
}

/**
 * @function workLenReducer
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
export function workLenReducer(state = initialWorkLen, action) {
    switch (action.type) {
        case WORK_HOUR:
            console.log('changing work hour')
            return Object.assign({}, state, {
                work_hour : action.hours
            })
        case WORK_MIN:
            console.log('changing work min')
            return Object.assign({}, state, {
                work_min : action.minutes
            }) 
        default:
            return state
      }
    }

export function breakLenReducer(state = initialBreakLen, action) {
    switch (action.type) {
        case BREAK_HOUR:
            console.log('changing break hour')
            return Object.assign({}, state, {
                break_hour : action.hours
            })
        case BREAK_MIN:
            console.log('changing break min')
            return Object.assign({}, state, {
                break_min : action.minutes
            }) 
        default:
            return state
        }
    }

