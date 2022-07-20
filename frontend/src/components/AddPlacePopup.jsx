import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      description,
      image,
    });
  }

  React.useEffect(() => {
    if (!props.isOpen) {
      setImage("");
      setDescription("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={(e) => handleSubmit(e)}
      name="add-card"
      title="New place"
    >
      <div>
        <input
          type="text"
          name="name"
          id="place"
          className="popup__field popup__field_type_place"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={description || ""}
          onChange={handleDescriptionChange}
          required
        />
        <span id="place-error" className="error"></span>
        <input
          type="url"
          name="link"
          id="link"
          className="popup__field popup__field_type_url"
          placeholder="URL"
          value={image || ""}
          onChange={handleImageChange}
          required
        />
        <span id="link-error" className="error"></span>
        <button type="submit" className="popup__submit-button">
          Post
        </button>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
