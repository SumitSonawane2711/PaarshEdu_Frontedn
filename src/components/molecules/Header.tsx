import {
    FaFacebookF,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
  } from "react-icons/fa";
  
  const Header = () => {
    return (
      <header className="bg-black w-screen overflow-hidden">
        <div className="flex flex-col md:flex-row px-4 md:px-20 justify-between items-center my-2 pb-2">
          <div className="text-white w-full md:w-auto flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 rounded-lg">
            <div className="font-bold">Contact:</div>
            <div>+123 456 7890</div>
            <div>email@example.com</div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end mt-2 md:mt-0 space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-black rounded-full p-2 hover:bg-blue-600 transition shadow-[1px_2px_2px_0px_#f7fafc]"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-black rounded-full p-2 hover:bg-pink-600 transition shadow-[1px_2px_2px_0px_#f7fafc]"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-black rounded-full p-2 hover:bg-blue-600 transition shadow-[1px_2px_2px_0px_#f7fafc]"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-black rounded-full p-2 hover:bg-red-700 transition shadow-[1px_2px_2px_0px_#f7fafc]"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-black rounded-full p-2 hover:bg-blue-600 transition shadow-[1px_2px_2px_0px_#f7fafc]"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  