import React from 'react';
import PropTypes from 'prop-types';
import { constants } from '../../core';
import { withCategoryListBase } from './categoryListBaseHOC.js';
import { Category } from '../Category';

class IterativeCategoryList extends React.Component {
    static PropTypes = {
        data: PropTypes.object.isRequired,
        handleAddSubcategory: PropTypes.func.isRequired,
        handleRemoveSubcategory: PropTypes.func.isRequired,
        onChange: PropTypes.func
    };

    getComponentTree = () => {
        const tree = this.props.data;
        const nodesToProcess = [];
        const components = [];

        const processNode = (node, renderTarget) => {
            const nextRenderTarget = [];
            renderTarget.push(
                <Category
                    key={node[constants.INTERNAL_ID_KEY]}
                    id={node[constants.INTERNAL_ID_KEY]}
                    value={node.value}                    
                    handleRemoveSubcategory={this.props.handleRemoveSubcategory}
                    handleAddSubcategory={this.props.handleAddSubcategory}
                >
                    {nextRenderTarget}
                </Category>
            );
            node.subcategories.forEach(subcategory => {
                nodesToProcess.push([nextRenderTarget, subcategory]);
            });
        };

        tree.forEach(node => processNode(node, components));

        while (nodesToProcess.length > 0) {
            const [renderTarget, node] = nodesToProcess.shift();
            processNode(node, renderTarget);
        }

        return components;
    };

    render() {
        return (
            <div className="CategoryList">
                {this.getComponentTree()}
            </div>
        );
    }
}

export default withCategoryListBase(IterativeCategoryList);
