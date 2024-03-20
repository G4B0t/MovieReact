const defaultState = {
  data: [
    {
      id: 1,
      stars: 5,
      movieId: 1,
    },
    {
      id: 2,
      stars: 4,
      movieId: 2,
    },
    {
      id: 3,
      stars: 3,
      movieId: 3,
    },
    {
      id: 4,
      stars: 5,
      movieId: 4,
    },
    {
      id: 5,
      stars: 4,
      movieId: 1,
    },
  ],
};
const rating_reducer = (state = defaultState, action = null) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rating_reducer;
