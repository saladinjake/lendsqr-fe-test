import { useNavigate } from "react-router-dom";
import  "./NotFound.styles.scss";
import questionGuy from "../assets/img/svg/question-guy.svg";
import Logo from "../assets/img/svg/logo.svg";


export default function NotFound() {
  const history = useNavigate();

  return (
    <div className="notFound">
      <div className="logo">
        <img src={Logo} alt="kuda nerve logo" className="logo-image" />
      </div>
      <img src={questionGuy} className="illustration--image" alt="" />
      <p className="info-text info-text--title">Error 404!</p>
      <p className="info-text info-text--description">
        Sorry, the page you’re looking for could not be found.
      </p>
      <div>
        
      </div>
    </div>
  );
}
