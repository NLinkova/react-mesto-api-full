import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";
import closeButton from "../images/close_icon.svg";

export default function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_info ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container popup__container_info">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        >
          <img
            className="popup__cross"
            src={closeButton}
            alt="иконка крестика"
          />
        </button>
        <img
          src={props.success ? success : fail}
          alt=""
          className="popup__info-image"
        />
        <h2 className="popup__title popup__title_type_info">
          {props.success
            ? "Successful registration!"
            : "Something went wrong. Try again"}
        </h2>
      </div>
    </section>
  );
}
