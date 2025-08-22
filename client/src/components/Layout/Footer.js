import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center">
          <h6 className="text-lg font-semibold mb-2">
            © {new Date().getFullYear()} Pocketly
          </h6>
          <p className="text-sm mb-2">All rights reserved.</p>
          <p className="text-sm mb-4 max-w-xl mx-auto">
            Your reliable tool for managing expenses effectively.
          </p>
          <p className="text-sm">
            Contact us:{" "}
            <a
              href="mailto:support.pocketly@gmail.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              support.pocketly@gmail.com
            </a>
          </p>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-xs text-center text-gray-400">
            Powered by{" "}
            <a href="https://www.pocketly.com" className="text-indigo-400">
              Pocketly
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
