import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <FaGithub />
        </li>
        <li>
          <FaLinkedin />
        </li>
        <li>
          <FaTwitter />
        </li>
        <li>
          <FaInstagram />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>YouX</span> &copy; 2024
      </p>
    </footer>
  );
}

export default Footer;
