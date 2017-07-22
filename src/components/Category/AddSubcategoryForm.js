import React from 'react';
import PropTypes from 'prop-types';

class AddSubcategoryForm extends React.Component {
    static PropTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.newSubcategoryName.value);
    };

    render() {
        return (
            <form className="Category-addNewForm" onSubmit={this.handleSubmit}>
                <input
                    className="Category-addInput"
                    ref={ref => (this.newSubcategoryName = ref)}
                    placeholder="Name"
                    type="text"
                    required
                />
                <button className="Category-addButton" type="submit">
                    Add New Subcategory
                </button>
            </form>
        );
    }
}

export default AddSubcategoryForm;
