const tree = [
    {
        category: 'Category1',
        id: '1',
        subcategories: [
            {
                category: 'Subcategory1',
                subcategories: [],
                id: '2'
            },
            {
                category: 'Subcategory2',
                subcategories: [],
                id: '3'
            },
            {
                category: 'Subcategory3',
                subcategories: [
                    {
                        category: 'SubSubcategory1',
                        subcategories: [],
                        id: '4'
                    }
                ]
            }
        ]
    },
    {
        category: 'Category2',
        subcategories: [],
        id: '5'
    }
];

export default tree;
