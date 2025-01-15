import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // React Router v5
import "./register.css"; // Ajoutez les styles spécifiques

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstname") setFirstname(value);
    if (name === "lastname") setLastname(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmpassword") setConfirmPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmpassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }

    const userData = { firstname, lastname, email, password, role: "user" };

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inscription réussie :", data);
        navigate("/login"); // Redirection vers la page de connexion
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData || "Échec de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setErrorMessage("Une erreur est survenue, veuillez réessayer.");
    }
  };

  // Gestionnaires de connexion sociale
  const handleGoogleLogin = () => {
    console.log("Connexion avec Google");
    // Intégrez ici votre logique pour Google OAuth
  };

  const handleFacebookLogin = () => {
    console.log("Connexion avec Facebook");
    // Intégrez ici votre logique pour Facebook Login
  };

  const handleAppleLogin = () => {
    console.log("Connexion avec Apple");
    // Intégrez ici votre logique pour Apple Sign-In
  };

  return (
    <div className="register-container">
      <div className="login-box">
      {/* Onglets Connexion/Créer un compte */}
      <div className="register-tabbs">
        <Link
          to="/login"
          className={`tabb ${location.pathname === "/login" ? "active" : ""}`}
        >
          Connexion
        </Link>
        <Link
          to="/register"
          className={`tabb ${location.pathname === "/register" ? "active" : ""}`}
        >
          Créer un compte
        </Link>
      </div>

      <div className="register-content">
        

        {/* Boutons de connexion sociale */}
        <div className="social-login">
          <button className="social-btn google" onClick={handleGoogleLogin}>
            Connexion avec Google
          </button>
          <button className="social-btn facebook" onClick={handleFacebookLogin}>
            Connexion avec Facebook
          </button>
          <button className="social-btn apple" onClick={handleAppleLogin}>
            Connexion avec Apple
          </button>
        </div>

        <div className="divider">
          <span>ou</span>
        </div>

        {/* Formulaire d'inscription */}
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            placeholder="Prénom*"
            required
          />
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            placeholder="Nom*"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Adresse e-mail*"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Mot de passe*"
            required
          />
          <input
            type="password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={handleChange}
            placeholder="Confirmer le mot de passe*"
            required
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="theme-btn-1 btn btn-block" type="submit">
            CRÉER UN COMPTE
          </button>
        </form>

        {/* Lien pour rediriger vers la connexion */}
        <div className="go-to-btn">
          <button className="btn" onClick={() => navigate("/login")}>
            Déjà un compte ? Connectez-vous
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Register;
