/**
 * @description
 * following contains the action and reducer to indicate current mission state
 */

const BREAK_TIME = 'BREAK_TIME'
const WORK_TIME = 'WORK_TIME'

// /**
//  * @constant setBreakMin
//  * a redux action defined to be called in the pomodoroReducer to define break_length
//  */
export const setBreakTime = seconds =>
({
    type: BREAK_TIME,
    seconds
})

export const setWorkTime = seconds => 
({
    type : WORK_TIME,
    seconds
})

// export const setBreakHour = hours => 
// ({
//     type : BREAK_HOUR,
//     hours
// })

// export const setWorkSec = seconds => (
//     {
//         type :  WORK_SEC,
//         seconds
//     }
// )
// export const setWorkMin = minutes => (
//     {
//         type : WORK_MIN,
//         minutes
//     }
// )

// export const setWorkHour = hours => (
//     {
//         type : WORK_HOUR,
//         hours
//     }
// )

 /**
 * @constant initialPomodoroState
 * a intial state for the pomodoroReducer that indicates 25 min work and 5 min break
 */
const initialTime = {
    work_time : 25,
    break_time : 5*60
}


export function timeLenReducer(state = initialTime, action) {
    switch (action.type) {
        case WORK_TIME:
            return Object.assign({}, state, {
                work_time : action.seconds
            })
        case BREAK_TIME:
            return Object.assign({}, state, {
                break_time : action.seconds
            }) 
        default:
            return state
      }
    }

