import { radixSort } from '../../../src/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(radixSort, 'Radix Sort', {reverseCompare: false});

