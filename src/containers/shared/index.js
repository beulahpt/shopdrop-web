export const getCollection = (uri, body, dispatchMetadata, action) => {
  return (dispatch) => {		
    const request = fetch(uri)
      .then(response => response.json()).then((data) => {
		dispatch(action({
            results: data,
            metadata: Object.assign({}, data.metadata, {
              ...dispatchMetadata
            })
        }));
	  });
  }
}

export const getResource = (uri, params, action) => {
  return (dispatch) => {
    const request = fetch(uri)
      .then(response => response.json()).then((data) => {
		data["comment_count"] = 6;
		data["like_count"] = 10;
		data.comments = [
        {_id: 34, status: 1, profile_picture: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", user_name: "Saurabh", review: "Shavon B does an AMAZING job!!  I had another fant…e taking care of my home.  Shavon is a rock star!", parent_id: 34, reply_to: 34, like_count: 2},
        {_id: 36, status: 1, profile_picture: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", user_name: "Neha", review: "Shavon B does an AMAZING job!!  I had another fant…e taking care of my home.  Shavon is a rock star!", parent_id: 35, reply_to: 35, like_count: 3},
        {_id: 37, status: 1, profile_picture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", user_name: "Archana", review: " Thank you for sharing your review of your home cl…e taking care of my home.  Shavon is a rock star!", parent_id: 35, reply_to: 36, like_count: 1},
        {_id: 39, status: 1, profile_picture: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", user_name: "Radhika", review: "Shavon B does an AMAZING job!!  I had another fant…e taking care of my home.  Shavon is a rock star!", parent_id: 39, reply_to: 39, like_count: 0},
        {_id: 40, status: 1, user_name: "Archi", profile_picture: "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", review: "good", parent_id: 35, reply_to:36, like_count: 2},
        {_id: 41, status: 1, profile_picture: "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", user_name: "test", review: "Testing", parent_id: 41, reply_to:41, like_count: 4}
        ]
        dispatch(action(data));
      });
  }
}

export const createResource = (uri, data, action) => {
  return (dispatch) => {
    const request = new XMLHttpRequest();
    request.open('POST', uri);
    let response = request.send(data);
  }
}
