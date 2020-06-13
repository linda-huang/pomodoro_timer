/**
 * @description
 * following contains the action and reducer to indicate current mission state
 */

const WORK_COUNTDOWN = 'START_COUNTDOWN'

/**
 * @description
 * following indicates whether or not we should begin the countdown 
 * 
 * @param {*} start is true or false
 */

export const setWorkCountdown = start => (
    {
        type: WORK_COUNTDOWN,
        start
    }
)

 /**
 * @constant initialPomodoroState
 * a intial state for the pomodoroReducer that indicates 25 min work and 5 min break
 */

const initialCountdown = {
    work_countdown : false,
    break_countdown: false
}

/**
 *
 * @function countdownReducer
 * 
**/
export function countdownReducer (state = initialCountdown, action) {
    switch (action.type) {
        case WORK_COUNTDOWN:
            return Object.assign({}, state, {
                work_countdown : action.start
            })
        default:
            return state
        }
    }
