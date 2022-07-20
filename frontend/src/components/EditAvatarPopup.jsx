import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  //использование рефа
  const newAvatarRef = React.useRef();

  React.useEffect(() => {
    if (!props.isOpen) {
      newAvatarRef.current.value = "";
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({
      avatar: newAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={(e) => handleSubmit(e)}
      name="edit-avatar"
      title="Renew avatar photo"
    >
      <div>
        <input
          type="url"
          name="avatar"
          id="avatar"
          className="popup__field popup__field_type_url"
          placeholder="URL"
          ref={newAvatarRef}
          required
        />
        <span id="avatar-error" className="error"></span>
        <button type="submit" className="popup__submit-button">
          Save
        </button>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
