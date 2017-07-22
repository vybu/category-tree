const tree = [
    {
        value: 'Category1',
        subcategories: [
            {
                value: 'Subcategory1',
                subcategories: []
            },
            {
                value: 'Subcategory2',
                subcategories: []
            },
            {
                value: 'Subcategory3',
                subcategories: [
                    {
                        value: 'SubSubcategory1',
                        subcategories: []
                    }
                ]
            }
        ]
    },
    {
        value: 'Category2',
        subcategories: []
    },
    {
        value: 'Category3',
        subcategories: []
    },
    {
        value: 'Category4',
        subcategories: [
            {
                value: 'Subcategory1',
                subcategories: []
            },
            {
                value: 'Subcategory2',
                subcategories: []
            }
        ]
    }
];

export default tree;
