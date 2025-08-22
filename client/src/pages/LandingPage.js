import { Link } from "react-router-dom";
// Heroicons
import { UserPlusIcon } from "@heroicons/react/24/solid";
import "../styles/LandingPage.css";
import { TypeAnimation } from "react-type-animation";

const LandingPage = () => {
  // Use process.env.PUBLIC_URL to reference the image in the public/assets folder
  // const landingHeroImage = `${process.env.REACT_APP_API_BASE}/assets/illustration1.png`;
  const landingHeroImage = "/assets/illustration1.png";


  return (
    <div className="landing-page">
      {/* Gradient Background */}
      <div className="gradient-bg" />

      <div className="container">
        {/* Left Section (Text and CTA) */}
        <div className="left-section">
          <h1 className="logo-title">POCKETLY</h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6">
            Take Control of your{" "}
            <TypeAnimation
              sequence={["Finances", 1000, "Expenses", 1000, "Incomes", 1000]} // Define the words and delays
              wrapper="span"
              speed={50} // Speed of typing
              className="accent" // Text color for typing effect
              repeat={Infinity} // Make it loop indefinitely
            />{" "}
          </h2>
          <p className="description">
            Track expenses, set budgets, and achieve your financial goals with
            our intuitive expense tracking platform.
          </p>

          {/* Sign-up CTA */}
          <div className="cta-container">
            <Link to="/register" className="btn cta-btn">
              <span>Create Account</span>
              <UserPlusIcon width={20} />
            </Link>
          </div>

          {/* Login Option */}
          <p className="existing-user">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>

        {/* Right Section (Illustration Image) */}
        <div className="right-section">
          <div className="illustration">
            <img src={landingHeroImage} alt="Financial illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
