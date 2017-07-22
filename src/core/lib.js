import uuid from 'uuid/v4';
import _ from 'lodash';
import { INTERNAL_ID_KEY } from './constants.js';

function traverseTree(treeStructure, fn) {
    treeStructure.forEach(node => {
        fn(node);
        traverseTree(node.subcategories, fn);
    });
}

export function createNode(name) {
    return { value: name, subcategories: [], [INTERNAL_ID_KEY]: uuid() };
}

export function findNodeById(treeStructure, id) {
    return treeStructure.reduce((result, node) => {
        if (result[0] !== null) return result;

        return node[INTERNAL_ID_KEY] === id ? [node, treeStructure] : findNodeById(node.subcategories, id);
    }, [null, null]);
}

export function ensureIdsForNodes(treeStructure) {
    traverseTree(treeStructure, node => {
        if (!node.hasOwnProperty(INTERNAL_ID_KEY)) {
            node[INTERNAL_ID_KEY] = uuid();
        }
    });

    return treeStructure;
}

export function removeIdsForNodes(treeStructure) {
    traverseTree(treeStructure, node => {
        if (node.hasOwnProperty(INTERNAL_ID_KEY)) {
            delete node[INTERNAL_ID_KEY];
        }
    });

    return treeStructure;
}

export function validateCategoryTreeStructure(treeStructure) {
    return treeStructure.every(node => {
        if ((_.isString(node.value) || _.isNumber(node.value)) && _.isArray(node.subcategories)) {
            return validateCategoryTreeStructure(node.subcategories);
        }

        return false;
    });
}
