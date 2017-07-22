import { lib, constants } from '../index.js';

const getTestData = () => [
    { value: 1, subcategories: [{ value: 3, subcategories: [] }] },
    { value: 2, subcategories: [] }
];

const addIds = testData => {
    testData[0][constants.INTERNAL_ID_KEY] = 'a';
    testData[1][constants.INTERNAL_ID_KEY] = 'b';
    testData[0].subcategories[0][constants.INTERNAL_ID_KEY] = 'a.1';
};

describe('lib', () => {
    let testData;

    beforeEach(() => {
        testData = getTestData();
    });
    describe('#findNodeById', () => {
        it('returns a node and its siblings by id', () => {
            addIds(testData);

            const [node1, parent1] = lib.findNodeById(testData, 'a.1');
            expect(node1).toEqual(testData[0].subcategories[0]);
            expect(parent1).toEqual(testData[0].subcategories);

            const [node2, parent2] = lib.findNodeById(testData, 'b');
            expect(node2).toEqual(testData[1]);
            expect(parent2).toEqual(testData);
        });

        it('returns null if node with given id does not exist', () => {
            addIds(testData);

            const [node1, parent1] = lib.findNodeById(testData, '--');

            expect(node1).toBe(null);
            expect(parent1).toBe(null);
        });
    });
    describe('#ensureIdsForNodes', () => {
        it('adds internal ids to every node in a tree', () => {
            lib.ensureIdsForNodes(testData);

            expect(testData[0]).toHaveProperty(constants.INTERNAL_ID_KEY);
            expect(testData[0].subcategories[0]).toHaveProperty(constants.INTERNAL_ID_KEY);
            expect(testData[1]).toHaveProperty(constants.INTERNAL_ID_KEY);
        });
    });
    describe('#removeIdsForNodes', () => {
        it('removes internal ids for every node in a tree', () => {
            addIds(testData);

            expect(testData[0]).toHaveProperty(constants.INTERNAL_ID_KEY);
            expect(testData[0].subcategories[0]).toHaveProperty(constants.INTERNAL_ID_KEY);
            expect(testData[1]).toHaveProperty(constants.INTERNAL_ID_KEY);

            lib.removeIdsForNodes(testData);

            expect(testData[0]).not.toHaveProperty(constants.INTERNAL_ID_KEY);
            expect(testData[0].subcategories[0]).not.toHaveProperty(constants.INTERNAL_ID_KEY);
            expect(testData[1]).not.toHaveProperty(constants.INTERNAL_ID_KEY);
        });
    });
    describe('#validateCategoryTreeStructure', () => {
        it('checks that each node has a "value" variable as a string or number', () => {
            const positiveResult = lib.validateCategoryTreeStructure(testData);
            expect(positiveResult).toBeTruthy();

            testData[0].value = {};
            const negativeResult = lib.validateCategoryTreeStructure(testData);
            expect(negativeResult).toBeFalsy();

            const newTestData = getTestData();
            delete newTestData[1].value;
            const negativeResult2 = lib.validateCategoryTreeStructure(newTestData);
            expect(negativeResult2).toBeFalsy();
        });
        it('checks that each node has a "subcategories" variable as an array', () => {
            const positiveResult = lib.validateCategoryTreeStructure(testData);
            expect(positiveResult).toBeTruthy();

            testData[0].subcategories = {};
            const negativeResult = lib.validateCategoryTreeStructure(testData);
            expect(negativeResult).toBeFalsy();

            const newTestData = getTestData();
            delete newTestData[1].subcategories;
            const negativeResult2 = lib.validateCategoryTreeStructure(newTestData);
            expect(negativeResult2).toBeFalsy();
        });
    });
});
