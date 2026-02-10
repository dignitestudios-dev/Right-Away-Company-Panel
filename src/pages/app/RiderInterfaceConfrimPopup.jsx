import React from "react";
import { Logo } from "../../assets/export";

const MobileOnlyScreen = () => {
  const handleNavigate = () => {
    // change this to your mobile app route or deep link
    window.location.href = "/";
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Logo */}
        <img
          src={Logo} // replace with your logo path
          alt="App Logo"
          className="mx-auto"
          style={styles.logo}
        />

        {/* Text */}
        <h2 style={styles.heading}>
          Please close this browser and switch to your mobile device to access
          the app.
        </h2>

        {/* Button */}
        {/* <button style={styles.button} onClick={handleNavigate}>
          Go to Mobile App
        </button> */}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(88.41deg, #03958a -14.66%, #22b573 115.24%)",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "52px 24px",
    maxWidth: "460px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  logo: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    lineHeight: "1.5",
    marginBottom: "24px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#22b573",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default MobileOnlyScreen;
