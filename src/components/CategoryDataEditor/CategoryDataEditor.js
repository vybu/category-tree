import React from 'react';
import PropTypes from 'prop-types';
import { lib } from '../../core';
import './CategoryDataEditor.css';

class CategoryDataEditor extends React.Component {
    static propTypes = {
        data: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isValidJson: true,
            isValidStructure: true,
            value: this.props.data
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState(() => ({ value: nextProps.data }));
        }
    }

    handleEdit = ev => {
        const value = ev.target.value;
        let isValidJson = true;
        let isValidStructure = true;
        let valueJson;

        try {
            valueJson = JSON.parse(value);
        } catch (error) {
            isValidJson = false;
        }

        if (isValidJson && lib.validateCategoryTreeStructure(valueJson)) {
            this.props.onChange(valueJson);
        } else if (isValidJson) {
            isValidStructure = false;
        }

        this.setState(() => ({ isValidJson, isValidStructure, value }));
    };

    render() {
        const { value, isValidJson, isValidStructure } = this.state;
        return (
            <div className="CategoryDataEditor">
                <textarea
                    className="CategoryDataEditor-input"
                    name="category-editor"
                    onChange={this.handleEdit}
                    value={value}
                />
                <div className={`CategoryDataEditor-validityBadge`}>
                    <span className={isValidStructure ? 'is-valid' : 'is-invalid'}>
                        {isValidStructure ? 'Structure Valid' : 'Structure invalid'}
                    </span>
                    &nbsp;/&nbsp;
                    <span className={isValidJson ? 'is-valid' : 'is-invalid'}>
                        {isValidJson ? 'JSON Valid' : 'JSON Invalid'}
                    </span>
                </div>
                <div className="CategoryDataEditor-guide">
                    <h2>How to:</h2>
                    <p>You can add and/or edit category tree in the panel above. It has to be a
                    valid JSON structure, where each node has a <strong>value</strong> field (string or number) and
                    <strong> subcategories</strong> field (array).</p>
                    
                    <p>You can also edit existing tree in the panel on the right side.</p>
                </div>
                
            </div>
        );
    }
}

export default CategoryDataEditor;
