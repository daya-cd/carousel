export const Get_DATA='Get_DATA';
export const Update_Like='Update_Like';

// get data from test json api
export const getData = () => dispatch=>{
    fetch('http://localhost:3001/cards')
    .then(res => res.json())
    .then(items =>
      dispatch({
        type: Get_DATA,
        payload: items
      })
    );
}

// Update like button

export const updatelike = postData => dispatch => {
  dispatch({
    type: Update_Like,
    payload: postData
  })
};