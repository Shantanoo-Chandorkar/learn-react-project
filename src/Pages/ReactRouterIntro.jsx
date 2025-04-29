import { Link } from 'react-router-dom';
import './styles/ReactRouterIntro.css';

function ReactRouterIntro() {
  return (
    <div className="react-router-intro-container">
      <h2 className="react-router-intro-title">Welcome to React Router</h2>
      <ul className="react-router-intro-list">
        <li><Link to="/react-router/info">More on React Router</Link></li>
        <li><Link to="/react-router/best-practices">React Router Best Practices</Link></li>
        <li><Link to="/react-form">React Form</Link></li>
        <li><Link to="/multi-form">Multi-Page Form</Link></li>
        <li><Link to="/multi-step-flow">Multi-Step Flow</Link></li>
      </ul>
    </div>
  );
}

export default ReactRouterIntro;
