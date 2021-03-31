import React, { useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

import { connect } from "react-redux";
import "./Style.css";

function Board(props) {
  const cardTitle = useRef();

  const deleteBoardHandler = () => {
    props.deleteboard(props.id);
  };
  const addCardHandler = () => {
    const value = cardTitle.current.value.trim();
    if (value === "" || value.replace(/\s/g, "").length === 0) return;
    const card = {
      title: value,
      id: Date.now(),
    };
    props.addCard(card, props.id);
    cardTitle.current.value = "";
  };

  const dragOverHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let card = props.dragBox;
    props.addCard(card, props.id);
  };

  return (
    <div
      className="board"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => dragOverHandler(e)}
    >
      <div className="board_head">
        <p>{props.title}</p>
        <button onClick={deleteBoardHandler}>
          <DeleteIcon />
        </button>
      </div>
      <hr style={{ margin: "4px 0" }} />
      <div className="board_add">
        <input
          type="text"
          placeholder="Enter Card Title"
          maxLength="150"
          ref={cardTitle}
        />
        <button type="button" onClick={addCardHandler}>
          Add Card
        </button>
      </div>
      <hr style={{ margin: "4px 0" }} />
      <div className="board_body">{props.children}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards,
    dragBox: state.dragBox,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteboard: (board_id) => dispatch({ type: "DELETE_BOARD", id: board_id }),
    addCard: (card, boardId) =>
      dispatch({ type: "ADD_CARD", card: card, boardId: boardId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
