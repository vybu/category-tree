import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './ImplementationSwitcher.css';
const ImplementationSwitcher = ({ location: { pathname } }) => {
    const isActiveRecursive = pathname === '/recursive-implementation';

    return (
        <div className="ImplementationSwitcher">
            Implementation:
            <Link
                to="/recursive-implementation"
                className={`ImplementationSwitcher-choice ${isActiveRecursive ? 'is-active' : ''}`}
            >
                recursive
            </Link>
            <Link
                to="/iterative-implementation"
                className={`ImplementationSwitcher-choice ${!isActiveRecursive ? 'is-active' : ''}`}
            >
                iterative
            </Link>
        </div>
    );
};

export default withRouter(ImplementationSwitcher);
