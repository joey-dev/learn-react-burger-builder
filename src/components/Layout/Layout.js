import React from 'react';
import aux from '../../hox/Aux';
import classes from './Layout.css';

const layout = (props) => (
    <aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </aux>
);

export default layout;
