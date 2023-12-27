import React from "react";

const Header = () => {
  return (
    <div className="absolute top-5">
      <span className="text-sm font-light text-white tracking-[1px] uppercase">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/abdellatif-laghjaj"
          target="_blank"
          className="font-medium"
        >
          Abdellatif Laghjaj
        </a>
      </span>
    </div>
  );
};

export default Header;
