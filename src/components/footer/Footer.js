import './Footer.css';

const Footer = () => {
  const Foter = () => new Date().getFullYear();

  return (
    <footer>
      <div className="footer">
        ©
        {Foter()}
        &nbsp;
        <p>Designed and Developed with 💖 by</p>
        <a style={{ color: 'blue' }} href="https://www.linkedin.com/in/brytebee/">&nbsp;Bright</a>
        <p> &nbsp;&</p>
        <a style={{ color: 'blue' }} href="https://www.linkedin.com/in/aniekan-udo-665b65213/">
          &nbsp;Anny
        </a>
      </div>
    </footer>
  );
};
export default Footer;
