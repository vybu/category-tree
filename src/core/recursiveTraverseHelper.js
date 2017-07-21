function recursiveTraverseHelper(data, childContainerAccessor, depth = 0) {
    return data.map(node => {
        return [
            node,
            () => {
                return recursiveTraverseHelper(node[childContainerAccessor], childContainerAccessor, depth + 1);
            },
            depth
        ];
    });
}

export default recursiveTraverseHelper;
