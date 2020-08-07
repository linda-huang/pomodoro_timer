/**
 * @description
 * following contains the action and reducer to indicate current mission state
 */

const COUNTDOWN_STATE = 'COUNTDOWN_STATE';
const PREV_STATE = 'PREV_STATE';

export const NONE = 'NONE';
export const WORK = 'WORK';
export const BREAK = 'BREAK';
export const INTERMEDIATE = 'INTERMEDIATE';
export const SESSION_END = 'SESSION_END'
export const PAUSED = 'PAUSED';

/**
 * @description
 * following indicates whether or not we should begin the countdown 
 * 
 * @param {*} start is true or false
 */

export const setCountdownState = state => (
    {
        type: COUNTDOWN_STATE,
        state
    }
)

export const setPrevState = state => (
    {
        type : PREV_STATE,
        state
    }
)

export const setPaused = pause => (
    {
        type : PAUSED,
        pause
    }
)

 /**
 * @constant initialPomodoroState
 * a intial state for the pomodoroReducer that indicates 25 min work and 5 min break
 */

const initialCountdown = {
    prev_state : NONE,
    countdown_state : NONE,
    pause : false
}

/**
 *
 * @function countdownReducer
 * 
**/
export function countdownReducer (state = initialCountdown, action) {
    switch (action.type) {
        case COUNTDOWN_STATE:
            return Object.assign({}, state, {
                countdown_state: action.state
            })
        case PREV_STATE:
            return Object.assign({}, state, {
                prev_state: action.state
            })
        case PAUSED:
            return Object.assign({}, state, {
                pause: action.pause
            })
        default:
            return state
        }
    }
