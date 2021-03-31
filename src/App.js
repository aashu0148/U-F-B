import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";

import Board from "./Components/Board";
import Card from "./Components/Card";
import "./App.css";

function App(props) {
  // {
  //   boards: [
  //     {
  //       id:"df323e23",
  //       title: "board 1",
  //       cards: [
  //         {
  //           id:"df32323",
  //           title:"Card 1",
  //         }
  //         {
  //           id:"d323e23",
  //           title:"Card 2",
  //         }
  //       ],
  //     },
  //     {
  //       id:"12399534"
  //       title: "board 2",
  //       cards: [
  //         {
  //           id:"123354534"
  //           title:"Card 1",
  //         }
  //       ],
  //     },
  //   ];
  // }

  const [kanbanBody, setKanbanBody] = useState("");
  const boardTitle = useRef();

  const addboard = () => {
    const value = boardTitle.current.value.trim();
    if (value === "" || value.replace(/\s/g, "").length === 0) return;

    const board = {
      id: Date.now(),
      title: value,
      cards: [],
    };
    props.addboard(board);
    boardTitle.current.value = "";
  };

  useEffect(() => {
    setKanbanBody(
      props.boards.map((item) => (
        <Board title={item.title} id={item.id} key={item.id}>
          {item.cards.map((card) => (
            <Card
              boardId={item.id}
              id={card.id}
              title={card.title}
              key={card.id}
            />
          ))}
        </Board>
      ))
    );
  }, [props.boards]);

  return (
    <div className="App">
      <div className="kanban_head">
        <input
          ref={boardTitle}
          type="text"
          placeholder="Enter Board Title"
          maxLength="60"
        />
        <button type="button" onClick={addboard}>
          Add Board
        </button>
      </div>
      <div className="kanban_body">{kanbanBody}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addboard: (board) => dispatch({ type: "ADD_BOARD", board: board }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
