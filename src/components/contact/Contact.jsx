import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import EastIcon from "@mui/icons-material/East";
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from "react-router-dom";
import './contact.css';
import { useTheme } from '../../Them';

const Contact = () => {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
    const clinet = {
      name: name,
      email: email,
      message: message,
    }
    localStorage.setItem("client", JSON.stringify(clinet))
  }
  return (
    <motion.div
      className={`contact ${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="navbar">
        <Navbar />
      </div>
      <div className="contact-container">
        <div className="title">
          <h2>Contact.</h2>
          <p>Get in touch or send email directly to <span>mazen.hossn.121@gmail.com</span></p>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-group">
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="input-group">
              <textarea rows="5" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}>

              </textarea>
            </div>
            <div className="button">
              <button>Send Message</button>
            </div>
          </form>
        </div>
        <div className="go_back">
          <Link to={"/"}>
            <p>Go Back</p>
          </Link>
          <span>
            <EastIcon />
          </span>
        </div>
        <div className="links">
          <ul>
            <a href="https://twitter.com/mazen_hossny"><XIcon /></a>
            <a href="https://www.facebook.com/mazen.hossny.7"><FacebookOutlinedIcon /></a>
            <a href="https://www.linkedin.com/in/mazen-hossny-54a8a02b7/"><LinkedInIcon /></a>
            <a href="https://www.instagram.com/hossny_mazen/"><InstagramIcon /></a>
            <a href=""><GitHubIcon /></a>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
// import React from "react";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import Navbar from "../navbar/Navbar";
// import EastIcon from "@mui/icons-material/East";
// import InstagramIcon from '@mui/icons-material/Instagram';
// import XIcon from '@mui/icons-material/X';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import { Link } from "react-router-dom";
// import './contact.css';
// import { useTheme } from '../../Theme'; // Corrected the import

// const Contact = () => {
//   const { theme, toggleTheme } = useTheme();
//   const [name, setName] = useState("");  // Initialized with empty string
//   const [email, setEmail] = useState("");  // Initialized with empty string
//   const [message, setMessage] = useState("");   // Initialized with empty string

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setName("");
//     setEmail("");
//     setMessage("");
//     const client = {
//       name: name,
//       email: email,
//       message: message,
//     }
//     localStorage.setItem("client", JSON.stringify(client))
//   }

//   return (
//     <motion.div
//       className={`contact ${theme}`}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <div className="navbar">
//         <Navbar />
//       </div>
//       <div className="contact-container">
//         <div className="title">
//           <h2>Contact.</h2>
//           <p>Get in touch or send email directly to <span>mazen.hossn.121@gmail.com</span></p>
//         </div>
//         <div className="form">
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> {/* Fixed */}
//             </div>
//             <div className="input-group">
//               <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> {/* Fixed */}
//             </div>
//             <div className="input-group">
//               <textarea rows="5" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea> {/* Fixed */}
//             </div>
//             <div className="button">
//               <button>Send Message</button>
//             </div>
//           </form>
//         </div>
//         <div className="go_back">
//           <Link to={"/"}>
//             <p>Go Back</p>
//           </Link>
//           <span>
//             <EastIcon />
//           </span>
//         </div>
//         <div className="links">
//           <ul>
//             <a href="https://twitter.com/mazen_hossny"><XIcon /></a>
//             <a href="https://www.facebook.com/mazen.hossny.7"><FacebookOutlinedIcon /></a>
//             <a href="https://www.linkedin.com/in/mazen-hossny-54a8a02b7/"><LinkedInIcon /></a>
//             <a href="https://www.instagram.com/hossny_mazen/"><InstagramIcon /></a>
//             <a href="https://github.com/mazen-hossny"><GitHubIcon /></a> {/* Fixed */}
//           </ul>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Contact;
