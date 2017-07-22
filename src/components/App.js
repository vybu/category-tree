import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';
import './App.css';
import { lib } from '../core';
import { RecursiveCategoryList, IterativeCategoryList } from './CategoryList';
import ImplementationSwitcher from './ImplementationSwitcher';
import CategoryDataEditor from './CategoryDataEditor';

class App extends React.Component {
    static propTypes = {
        categoryTree: PropTypes.array
    };

    constructor(props) {
        super(props);
        // prevent data mutation and add uniq ids for better reconciler performance and editing
        const categoryTree = _.cloneDeep(this.props.categoryTree);
        lib.ensureIdsForNodes(categoryTree);

        this.state = {
            categoryTree
        };
    }

    handleDataChange = newCategoryTree => {
        lib.ensureIdsForNodes(newCategoryTree);        
        this.setState(() => ({ categoryTree: newCategoryTree }));
    };

    render() {
        const data = this.state.categoryTree;

        return (
            <div className="App">
                <div className="CategoryListView">
                    <Redirect from="/" exact to="/recursive-implementation" />

                    <Route
                        path="/recursive-implementation"
                        render={() => <RecursiveCategoryList onChange={this.handleDataChange} data={data} />}
                    />
                    <Route
                        path="/iterative-implementation"
                        render={() => <IterativeCategoryList onChange={this.handleDataChange} data={data} />}
                    />
                    <ImplementationSwitcher />
                </div>

                <CategoryDataEditor
                    onChange={this.handleDataChange}
                    data={JSON.stringify(lib.removeIdsForNodes(_.cloneDeep(data)), null, 2)}
                />
            </div>
        );
    }
}

export default App;
