import React from 'react';

import burgerLogo from '../../assets/Images/burger-logo.png'
import classes from './Logo.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Logo"/>
    </div>
);

export default Logo;
