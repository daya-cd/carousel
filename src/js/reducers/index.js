import update from 'immutability-helper';

const initialState = {
  items:[]
};

function rootReducer(state = initialState, action) {
  if (action.type === "Get_DATA") {

    return {
      ...state,
      items: action.payload
    };
    
  }

  if (action.type === "Update_Like") {

    // Boolean value not passed - throwing bug got manually use if/else
  if(action.payload.value)
  {
    return update(state, { 
      items: { 
        [action.payload.index]: {
          is_liked: {$set: false}
        }
      }
    });

  }
  else
  {
    return update(state, { 
      items: { 
        [action.payload.index]: {
          is_liked: {$set: true}
        }
      }
    });
  }

  
    
  }
  return state;
}

export default rootReducer;