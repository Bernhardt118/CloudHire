import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import CloudHire from './pages/CloudHire';
import RegisterUser from './pages/RegisterUser';
import RegisterCompony from './pages/RegisterCompony';
import SignIn from './pages/SignIn';
import CreateContract from './pages/CreateContract';
import HomePage from './pages/HomePage';
import IndividualContracts from './pages/IndividualContracts';
import Profile from './pages/Profile';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Api from './playground/Api';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

//Trying to link frontend with backend 
// function App(){
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         fetch('http://127.0.0.1:5000/api')
//         .then(res => {
//             return res.json();
//         })
//         .then((data1) => {
//             console.log(data1.data)
//             setData(data1.data);
//         });
//     }, []);

//     return (
//         <div className="App container m-4">
//         <div className="row">
//             <div className="text-center">
//                 {data && data.map(function (data1) {
//                     return (
//                         <div>
//                             <p>{data1.name}</p>
//                             <p>{data1.degree}</p>
//                         </div>
//                     )
//                 }     
//             )}
//             </div>
//         </div>

//         </div>
//     );
// }

const routes = (
    <Router>
        <Switch>
            <Route path="/" component={CloudHire} exact={true}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/registercompany" component={RegisterCompony}/>
            <Route path="/registeruser" component={RegisterUser}/>
            <Route path="/createcontract" component={CreateContract}/>
            <Route path="/individualcontracts" component={IndividualContracts}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/homepage" component={HomePage}/>
        </Switch>
    </Router>
);


ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'));

// {data && data.map((d) => (
//     <div>
//         <p>{d.name}</p>
//         <p>{d.degree}</p>
//     </div>
// ))}

// {data && data.map((data1) => (
//     <div>
//         <p>{data1.name}</p>
//         <p>{data1.degree}</p>
//     </div>
// ))}