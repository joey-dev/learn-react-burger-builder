import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
    const checkoutCanceledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    let summary = <Redirect to="/"/>;
    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    onCheckoutCanceled={checkoutCanceledHandler}
                    onCheckoutContinue={checkoutContinueHandler}
                />
                <Route path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
    return summary;
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
};

export default connect(mapStateToProps)(Checkout);
