import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="логотип страницы место"
      />
      <div className="header__wrapper">
        <Switch>
          <Route exact path="/">
            <p className="header__email">{email}</p>
            <Link
              to="/sign-in"
              className="header__link header__link_exit"
              onClick={onSignOut}
            >
              Sign out
            </Link>
          </Route>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Sign up
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Sign in
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
