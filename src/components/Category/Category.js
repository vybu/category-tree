import React from 'react';
import PropTypes from 'prop-types';
import './category.css';

class Category extends React.Component {
    state = {
        isAddNewVisible: false
    };

    showAddNew = () => this.setState(() => ({ isAddNewVisible: true }));

    static PropTypes = {
        node: PropTypes.object.isRequired,
        getSubcategories: PropTypes.func,
        subcategories: PropTypes.array,
        handleAddSubcategory: PropTypes.func
    };

    handleAddSubcategory = () => {
        this.props.handleAddSubcategory(this.props.node, this.newSubcategoryName.value);
    };

    render() {
        const { node, getSubcategories, subcategories, handleAddSubcategory } = this.props;
        return (
            <div className="Category">
                - {node.category}
                {this.state.isAddNewVisible
                    ? <div className="Category-addNewForm">
                          <button className="Category-addButton" onClick={this.handleAddSubcategory}>
                              Add New Subcategory
                          </button>
                          <input
                              className="Category-addInput"
                              ref={ref => (this.newSubcategoryName = ref)}
                              type="text"
                          />
                      </div>
                    : <span className="Category-showAddNewForm" onClick={this.showAddNew}>+</span>}
                {getSubcategories &&
                    getSubcategories().map(([node, getSubcategories]) =>
                        <Category
                            key={node.id}
                            handleAddSubcategory={handleAddSubcategory}
                            node={node}
                            getSubcategories={getSubcategories}
                        />
                    )}
                {subcategories &&
                    subcategories.map(node =>
                        <Category
                            key={node.id}
                            handleAddSubcategory={handleAddSubcategory}
                            node={node}
                            subcategories={node.subcategories}
                        />
                    )}
            </div>
        );
    }
}

export default Category;
