import React, {useEffect, useState} from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/products/ProductDetails";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {loadUser} from "./actions/user";
import store from "./store";
import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateUserProfile from "./components/user/updateProfile";
import ChangePassword from "./components/user/ChangePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/cart";
import Shipping from "./components/cart/shipping";
import ConfirmOrder from "./components/cart/confirmOrder";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";
import Payment from "./components/cart/payment";
import axios from 'axios';

function App() {
    const [stripe_api, setStripe] = useState();

    useEffect(() => {
        async function getStripeApiKey() {
            const {data} = await axios.get('/api/v1/stripe-api');
            setStripe(data.stripeApiKey);
        }

        getStripeApiKey().then();
        store.dispatch(loadUser()).then(r => {
        });
    }, []);

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="container container-fluid">
                    <Route path="/" component={Home} exact/>
                    <Route path="/search/:keyword" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/forgot/password" component={ForgotPassword}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/password/reset/:token" component={NewPassword}/>
                    <ProtectedRoute path="/profile" component={Profile}/>
                    <ProtectedRoute path="/me/update" component={UpdateUserProfile}/>
                    <ProtectedRoute path="/new/password" component={ChangePassword}/>
                    <ProtectedRoute path="/shipping" component={Shipping}/>
                    <ProtectedRoute path="/order/confirm" component={ConfirmOrder}/>
                    {
                        stripe_api && <Elements stripe={loadStripe(stripe_api)}>
                            <ProtectedRoute path="/payment" component={Payment}/>
                        </Elements>
                    }
                    <Route path="/cart" component={Cart}/>
                    <Route path="/product/:id" component={ProductDetails} exact/>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
