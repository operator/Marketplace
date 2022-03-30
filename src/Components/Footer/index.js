import operator from '../../Assets/operator.svg';
import "./style.css";
const Footer = () => {
  return <footer className="bg-primary mt-auto footer">
    <div className="container text-white py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <div className="text-center col-md-4 text-md-start mb-4 pe-3">
          <img class="logo" src={operator} alt="Operator" />
        </div>
        <div className="col-md-8">
          <div className="row text-center text-md-start g-4">
            <div className="col-md-6 col-lg-3">
              <strong className="d-block mb-2 footer-heading">OPERATOR LABS</strong>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://medium.com/@Operator/introducing-operator-3e66cba9a186" target="_blank" rel="noreferrer">Intro to Operator</a></li>
                <li className="nav-item mb-2"><a href="https://operatorlabs.notion.site/Operator-Litepaper-a30233ab64a746d083a0890472f85a4f" target="_blank" rel="noreferrer">Litepaper</a></li>
                <li className="nav-item mb-2"><a href="https://jobs.ashbyhq.com/operator" target="_blank" rel="noreferrer">Careers</a></li>
                <li className="nav-item mb-2"><a href="#" target="_blank" rel="noreferrer">Privacy policy</a></li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3">
              <strong className="d-block mb-2 footer-heading">DEVELOP</strong>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" target="_blank" rel="noreferrer">Docs</a></li>
                <li className="nav-item mb-2"><a href="#" target="_blank" rel="noreferrer">Developer Tools</a></li>
                <li className="nav-item mb-2"><a href="#" target="_blank" rel="noreferrer">Reference Apps</a></li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3">
              <strong className="d-block mb-2 footer-heading">EARN</strong>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" target="_blank" rel="noreferrer">Sell on Operator</a></li>
                <li className="nav-item mb-2"><a href="#" target="_blank" rel="noreferrer">Connect your Shopify store</a></li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3">
              <strong className="d-block mb-2 footer-heading">PARTICIPATE</strong>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://discord.com/invite/et4FfJGNcw" target="_blank" rel="noreferrer">Discord</a></li>
                <li className="nav-item mb-2"><a href="https://twitter.com/Operator" target="_blank" rel="noreferrer">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
};

export default Footer;
