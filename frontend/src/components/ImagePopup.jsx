import React from "react";
import closeButton from "../images/close_icon.svg";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ''}`}>
      <div className="popup__content">
        <button type="button" className="popup__close-button">
          <img
            className="popup__cross"
            src={closeButton}
            alt="иконка крестика"
            onClick={props.onClose}
          />
        </button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h3 className="popup__caption">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
