import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";


//<App /> MUST BE wrapped around <Router> </Router> which was missing now it works : )

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>
// );

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );