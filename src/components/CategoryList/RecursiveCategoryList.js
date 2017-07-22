import React from 'react';
import PropTypes from 'prop-types';
import { constants } from '../../core';
import { withCategoryListBase } from './categoryListBaseHOC.js';
import { CategoryEnhancedForRecursive } from '../Category';

class RecursiveCategoryList extends React.Component {
    static PropTypes = {
        data: PropTypes.object.isRequired,
        handleAddSubcategory: PropTypes.func.isRequired,
        handleRemoveSubcategory: PropTypes.func.isRequired
    };

    render() {
        const { data, ...propsToPass} = this.props;

        return (
            <div className="CategoryList">
                {data.map(node =>
                    <CategoryEnhancedForRecursive
                        key={node[constants.INTERNAL_ID_KEY]}
                        id={node[constants.INTERNAL_ID_KEY]}
                        value={node.value}
                        subcategories={node.subcategories}
                        {...propsToPass}
                    />
                )}
            </div>
        );
    }
}

export default withCategoryListBase(RecursiveCategoryList);
