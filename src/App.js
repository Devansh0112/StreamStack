import React, { useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import PublicVideos from './PublicVideos';
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import './App.css';

function App() {
  const [userData, setUserData] = useState(undefined);
  const [balance, setBalance] = useState(100); // Move balance state here

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: 'Web3 Youtube Clone',
    icon: "https://t3.ftcdn.net/jpg/04/26/46/66/360_F_426466645_EAgVxqHG2XK22Ys2PmLLPgmlEDC3Sn3X.jpg",
  };

  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => window.location.reload(),
      userSession,
    });
  };

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((data) => {
        setUserData(data);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const handleSignOut = () => {
    userSession.signUserOut(window.location.origin);
    setUserData(undefined);
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          {/* Icon and Brand Name */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img 
              src={appDetails.icon} 
              alt="StreamStack Icon" 
              className="navbar-icon"
            />
            <span className="brand-name">StreamStack</span>
          </a>

          {/* Right Side - Sign In / Sign Out */}
          <div className="d-flex align-items-center">
            {userSession.isUserSignedIn() ? (
              <>
                <span className="navbar-text me-3 user-address">
                  {userData ? userData.identityAddress : ""}
                </span>
                {/* Display balance in the navbar */}
                <span className="navbar-text me-3">
                  Your Balance: {balance} STX
                </span>
                <button className="btn btn-outline-danger custom-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <button className="btn btn-outline-primary custom-btn" onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Pass balance and setBalance as props to PublicVideos */}
      <PublicVideos isSignedIn={userData ? true : false} balance={balance} setBalance={setBalance} />
      
      {/* Custom Styles */}
      <style jsx>{`
        .custom-navbar {
          background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
          padding: 10px 20px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; /* Subtle shadow */
        }

        .navbar-brand {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }

        .navbar-icon {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        .brand-name {
          color: white;
        }

        .custom-btn {
          border-radius: 30px; /* Rounded buttons */
          padding: .5rem 1rem;
        }

        .custom-btn:hover {
          background-color: #ff4081; /* Pink hover effect */
          color: white;
        }

        .user-address,
        .navbar-text {
          color: white;
        }

        body {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </div>
  );
}

export default App;