import React from 'react';
import PropTypes from 'prop-types';
import {wrapDisplayName, setDisplayName} from 'recompose';
import _ from 'lodash';
import { lib } from '../../core';
import './CategoryList.css';

export function withCategoryListBase(WrappedComponent) {
    class CategoryListBase extends React.Component {
        static PropTypes = {
            data: PropTypes.object.isRequired,
            onChange: PropTypes.func
        };

        handleAddSubcategory = (nodeId, name) => {
            const newData = _.cloneDeep(this.props.data);
            const [nodeToUpdate] = lib.findNodeById(newData, nodeId);
            if (nodeToUpdate === null) return;
            nodeToUpdate.subcategories.push(lib.createNode(name));

            this.props.onChange && this.props.onChange(newData);
        };

        handleRemoveSubcategory = nodeId => {
            const newData = _.cloneDeep(this.props.data);
            const [nodeToRemove, nodeContainer] = lib.findNodeById(newData, nodeId);
            if (nodeToRemove === null) return;
            nodeContainer.splice(nodeContainer.indexOf(nodeToRemove), 1);

            this.props.onChange && this.props.onChange(newData);
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    handleRemoveSubcategory={this.handleRemoveSubcategory}
                    handleAddSubcategory={this.handleAddSubcategory}
                />
            );
        }
    }

    setDisplayName(wrapDisplayName(WrappedComponent, 'withCategoryListBase'))(WrappedComponent);

    return CategoryListBase;
}
