import React from 'react';
import PropTypes from 'prop-types';
import AddSubcategoryForm from './AddSubcategoryForm.js';
import './Category.css';

class Category extends React.Component {
    static PropTypes = {
        id: PropTypes.string.isRequired,
        value: PropTypes.objectOf([PropTypes.string, PropTypes.value]).isRequired,
        handleAddSubcategory: PropTypes.func,
        handleRemoveSubcategory: PropTypes.func
    };

    state = {
        isAddNewVisible: false
    };

    toggleAddNew = () => this.setState(({ isAddNewVisible }) => ({ isAddNewVisible: !isAddNewVisible }));

    handleAddSubcategory = subcategoryName => {
        this.props.handleAddSubcategory(this.props.id, subcategoryName);
        this.toggleAddNew();
    };

    handleRemoveSubcategory = () => {
        this.props.handleRemoveSubcategory(this.props.id);
    };

    render() {
        const { value, children } = this.props;
        return (
            <div className="Category">
                <span>
                    &#187; {value}
                </span>
                <span className="Category-editAction" onClick={this.toggleAddNew}>
                    add
                </span>
                <span className="Category-editAction" onClick={this.handleRemoveSubcategory}>
                    remove
                </span>
                {this.state.isAddNewVisible && <AddSubcategoryForm onSubmit={this.handleAddSubcategory} />}
                <div className="Category-subcategories">
                    {children}
                </div>
            </div>
        );
    }
}

export default Category;
