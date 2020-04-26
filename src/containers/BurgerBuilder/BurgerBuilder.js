import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import Aux from '../../hoc/Aux/Aux';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ingredients = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });
    const totalPrice = useSelector(state => {
        return state.burgerBuilder.totalPrice;
    });
    const error = useSelector(state => {
        return state.burgerBuilder.error;
    });
    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null;
    });

    const onIngredientAdded = (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName));
    const onIngredientInit = () => dispatch(burgerBuilderActions.initIngredients());
    const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path));

    useEffect(() => {
        onIngredientInit();
    }, []);

    const updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    const purchasingHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchasingCancelHandler = () => {
        setPurchasing(false);
    };

    const purchasingContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...ingredients,
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients cant be loaded</p> : <Spinner/>;

    if (ingredients) {
        burger =
            <Aux>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchasableState(ingredients)}
                    ordered={purchasingHandler}
                    isAuth={isAuthenticated}
                    price={totalPrice}
                />
            </Aux>
        ;

        orderSummary = <OrderSummary
            price={totalPrice}
            ingredients={ingredients}
            purchasingCanceled={purchasingCancelHandler}
            purchasingContinue={purchasingContinueHandler}
        />;
    }

    return (
        <Aux>
            <Modal show={purchasing}
                modalClosed={purchasingCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

export default (WithErrorHandler(BurgerBuilder, axios));
