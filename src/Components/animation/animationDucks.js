/**
 * @description
 * following contains the action and reducer to indicate current mission state
 */

const ANIMATION_STATE = "ANIMATION_STATE";


export const WAVE = "WAVE";
export const BALL = "BALL";
export const HIDE = "NONE";


/**
 * @description
 * following indicates which animation to use
 *
 * @param {*} start is true or false
 */

export const setAnimationState = (state) => ({
  type: ANIMATION_STATE,
  state,
});


/**
 * @constant initialPomodoroState
 * a intial state for the pomodoroReducer that indicates 25 min work and 5 min break
 */

const initialAnimation= { 
  animation_state: WAVE,
  
};

/**
 *
 * @function animationReducer
 *
 **/
export function animationReducer(state = initialAnimation, action) {
  switch (action.type) {
    case ANIMATION_STATE:
      return Object.assign({}, state, {
        animation_state: action.state,
      });
    default:
      return state;
  }
}
