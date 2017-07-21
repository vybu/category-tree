import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './App.css';
import { recursiveTraverseHelper, category } from './core';
import Category from './components/Category';

class App extends Component {

    static propTypes = {
      testTree: PropTypes.array
    }

    constructor(props) {
        super(props);

        this.state = {
            showRecursiveImplementation: true,
            tree: _.cloneDeep(this.props.testTree)
        };
    }

    handleAddSubcategory = (node, name) => {
        node.subcategories.push(category.createCategory(name));
        this.forceUpdate();
    };

    handleToggleImplementation = () => {
        this.setState(({ showRecursiveImplementation }) => ({
            showRecursiveImplementation: !showRecursiveImplementation,
            tree: _.cloneDeep(this.props.testTree)
        }));
    };

    render() {
        return (
            <div className="App">
                <button onClick={this.handleToggleImplementation}>Toggle implementation</button>
                {this.state.showRecursiveImplementation &&
                    <div>
                        <h1>Recursive Tree</h1>
                        {recursiveTraverseHelper(this.state.tree, 'subcategories').map(([node, getSubcategories]) =>
                            <Category
                                key={node.id}
                                node={node}
                                getSubcategories={getSubcategories}
                                handleAddSubcategory={this.handleAddSubcategory}
                            />
                        )}
                    </div>}

                {!this.state.showRecursiveImplementation &&
                    <div>
                        <h1>Iterative</h1>
                        {this.state.tree.map(node =>
                            <Category
                                key={node.id}
                                node={node}
                                subcategories={node.subcategories}
                                handleAddSubcategory={this.handleAddSubcategory}
                            />
                        )}
                    </div>}
            </div>
        );
    }
}

export default App;
