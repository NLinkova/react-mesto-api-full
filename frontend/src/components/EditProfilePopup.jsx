import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={(e) => handleSubmit(e)}
      name="edit-profile"
      title="Edit profile"
    >
      <div>
        <input
          type="text"
          name="name"
          id="user-name"
          className="popup__field popup__field_type_name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
          required
        />
        <span id="user-name-error" className="error"></span>
        <input
          type="text"
          name="about"
          id="about"
          className="popup__field popup__field_type_desc"
          placeholder="Description"
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleDescriptionChange}
          required
        />
        <span id="about-error" className="error"></span>
        <button type="submit" className="popup__submit-button">
          Save
        </button>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
