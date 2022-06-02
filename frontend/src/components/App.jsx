import React, { useEffect } from "react";
import {
  Route,
  Router,
  withRouter,
  useHistory,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Loader from "./Loader";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  //стейт лоадера
  const [pageLoader, setPageLoader] = React.useState(false);

  // стейты для входа
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setUserEmail] = React.useState("");

  //стейты регистрации и инфо попапа
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  const history = useHistory();

  //функция входа
  function handleLogin({ email, password }) {
    setPageLoader(true);
    auth
      .authorize(email, password)
      .then((jwt) => {
        if (jwt.token) {
          setLoggedIn(true);
          setUserEmail(email);
          localStorage.setItem("jwt", jwt.token);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setPageLoader(false);
      });
  }

  //проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getUserToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setPageLoader(false);
        });
    }
  }, [history]);

  //запрос карточек и инфо при успешном токене
  useEffect(() => {
    if (loggedIn) {
      setPageLoader(true);
      Promise.all([api.getUserInfoFromServer(), api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
          setIsRegisterSuccess(false);
          setIsInfoTooltipOpen(true);
        })
        .finally(() => {
          setPageLoader(false);
        });
    }
  }, [loggedIn]);

  //регистрация
  function handleRegister(email, password) {
    setPageLoader(true);
    auth
      .register(email, password)
      .then((res) => {
        setIsRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setPageLoader(false);
      });
  }

  //выход из учетной записи и удаление токена из локального хранилища
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setPageLoader(true);
    api
      .deleteCard(card._id)
      .then(() => {
        //копия массив без удаленной карточки
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPageLoader(false);
      });
  }

  function handleUpdateUser(user) {
    setPageLoader(true);
    api
      .setUserInfoToServer(user)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setPageLoader(false);
      });
  }

  function handleUpdateAvatar(data) {
    setPageLoader(true);
    api
      .setUserAvatarToServer(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setPageLoader(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setPageLoader(true);
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]); //обновление стейта cards ...
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsAddPlacePopupOpen(false);
        setPageLoader(false);
      });
  }

  return (
    <Router history={history}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header loggedIn={loggedIn} onSignOut={handleSignOut} email={email} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              // onDelete={handleDeleteCardPopup}
            />
            <Route exact path="/sign-in">
              <Login onLogin={handleLogin} loggedIn={loggedIn} />
            </Route>
            <Route exact path="/sign-up">
              <Register
                handleRegister={handleRegister}
                isRegisterSuccess={isRegisterSuccess}
              />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            success={isRegisterSuccess}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/* <!-- попап для добавления новой карточки --> */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          ></AddPlacePopup>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>
          <ImagePopup
            name="image"
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <Loader isLoading={pageLoader} />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default withRouter(App);
