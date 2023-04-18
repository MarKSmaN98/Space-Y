import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import 'semantic-ui-css/semantic.min.css'
// import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import { BrowserRouter} from "react-router-dom";



ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );



  
{/* <App /> MUST BE wrapped around <Router> </Router> which was missing now it works : )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
); */}