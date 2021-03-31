const initialState = {
  boards: JSON.parse(localStorage.getItem("boards")) || [],
  dragBox: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BOARD": {
      let myState = { ...state };
      myState.boards = myState.boards.concat(action.board);
      localStorage.setItem("boards", JSON.stringify(myState.boards));
      return myState;
    }
    case "DELETE_BOARD": {
      let myState = { ...state };
      myState.boards = myState.boards.filter((item) => item.id !== action.id);
      localStorage.setItem("boards", JSON.stringify(myState.boards));
      return myState;
    }
    case "ADD_CARD": {
      let myState = { ...state };
      myState.boards = myState.boards.map((item) => {
        if (item.id === action.boardId) {
          item.cards = item.cards.concat(action.card);
        }
        return item;
      });
      localStorage.setItem("boards", JSON.stringify(myState.boards));
      return myState;
    }
    case "DELETE_CARD": {
      let myState = { ...state };
      myState.boards = myState.boards.map((item) => {
        if (item.id === action.boardId) {
          item.cards = item.cards.filter((item) => item.id !== action.id);
        }
        return item;
      });
      localStorage.setItem("boards", JSON.stringify(myState.boards));
      return myState;
    }
    case "SET_DRAGBOX": {
      let myState = { ...state };
      myState.dragBox = action.card;
      return myState;
    }
    default:
      return state;
  }
};

export default reducer;
