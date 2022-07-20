import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = registerData;

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(email, password);
  }

  return (
    <section className="data">
      <div className="data__container">
        <form
          className="data__form data__form_register"
          name="register"
          onSubmit={handleSubmit}
        >
          <h3 className="data__title">Sign up</h3>
          <input
            type="email"
            name="email"
            id="email"
            className="data__field data__field_type_email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            value={email}
            onChange={handleChange}
            required
          />
          <span id="email-error" className="error"></span>
          <input
            type="password"
            name="password"
            id="password"
            className="data__field data__field_type_password"
            placeholder="Password"
            minLength="2"
            maxLength="200"
            value={password}
            onChange={handleChange}
            required
          />
          <span id="password-error" className="error"></span>
          <button type="submit" className="data__submit-button">
            Sign up
          </button>
        </form>
        <h3 className="data__subtitle">
          Already have an account?
          <Link className="data__link" to="/sign-in">
            {" "}
            Login!
          </Link>
        </h3>
      </div>
    </section>
  );
}
