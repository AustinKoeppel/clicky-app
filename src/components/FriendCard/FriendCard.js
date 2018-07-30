import React from "react";
import "./FriendCard.css";

const FriendCard = props => (
  <img onClick={() =>props.removeFriend(props.id)} alt={props.name} src={props.image} className="click-item" />
);

export default FriendCard;