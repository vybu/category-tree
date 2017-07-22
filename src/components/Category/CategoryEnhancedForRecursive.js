import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category.js';
import { constants } from '../../core';

class CategoryEnhancedForRecursive extends React.Component {
    static PropTypes = {
        subcategories: PropTypes.func,
        id: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        handleAddSubcategory: PropTypes.func,
        handleRemoveSubcategory: PropTypes.func
    };

    render() {
        const { value, id, subcategories, ...propsToPass } = this.props;
        return (
            <Category id={id} value={value} {...propsToPass}>
                {this.props.subcategories.map(node =>
                    <CategoryEnhancedForRecursive
                        subcategories={node.subcategories}
                        value={node.value}
                        id={node[constants.INTERNAL_ID_KEY]}
                        key={node[constants.INTERNAL_ID_KEY]}
                        {...propsToPass}
                    />
                )}
            </Category>
        );
    }
}

export default CategoryEnhancedForRecursive;
