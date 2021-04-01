import { countingSort } from '../../../src/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(countingSort, 'Counting Sort', {reverseCompare: false});
