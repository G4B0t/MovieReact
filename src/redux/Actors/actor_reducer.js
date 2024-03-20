const defaultState = {
  data: [
    {
      id: 1,
      name: "Tom Hanks",
      movieId: 1,
    },
    {
      id: 2,
      name: "Scarlett Johansson",
      movieId: 2,
    },
    {
      id: 3,
      name: "Leonardo DiCaprio",
      movieId: 3,
    },
    {
      id: 4,
      name: "Emma Watson",
      movieId: 4,
    },
    {
      id: 5,
      name: "Robert Downey Jr.",
      movieId: 1,
    },
  ],
};
const actor_reducer = (state = defaultState, action = null) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default actor_reducer;
