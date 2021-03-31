import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";

import "./Style.css";

function Card(props) {
  const deleteCardHandler = () => {
    props.deleteCard(props.id, props.boardId);
  };

  const dragStartHandler = (e) => {
    let card = {
      title: props.title,
      id: props.id,
    };
    props.setDragBox(card);
    setTimeout(() => {
      props.deleteCard(props.id, props.boardId);
    }, 3);
  };

  return (
    <div
      className="card"
      onDragStart={(e) => dragStartHandler(e)}
      draggable={true}
    >
      <div className="card_head" onClick={deleteCardHandler}>
        <CloseIcon />
      </div>
      <div className="card_body">{props.title}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCard: (card_id, boardId) =>
      dispatch({ type: "DELETE_CARD", id: card_id, boardId: boardId }),
    setDragBox: (card) => dispatch({ type: "SET_DRAGBOX", card: card }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
