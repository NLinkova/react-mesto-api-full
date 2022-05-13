import React from "react";
import Card from "./Card.jsx";
import pencilAvatar from "../images/pencil_avatar.svg";
import pencilButton from "../images/pencil.svg";
import plusButton from "../images/plus.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-group">
          <img
            className="profile__avatar"
            alt="аватар пользователя страницы"
            src={currentUser.avatar}
          />{" "}
          <button
            type="button"
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar-pencil"
              src={pencilAvatar}
              alt="иконка карандаша"
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>{" "}
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          >
            <img
              className="profile__pencil"
              src={pencilButton}
              alt="иконка карандаша"
            />
          </button>
          <p className="profile__description">{currentUser.about}</p>{" "}
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        >
          <img className="profile__plus" src={plusButton} alt="иконка плюса" />
        </button>
      </section>
      <section className="elements">
        {/*контейнер для карточек */}
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            onDelete={props.onDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
