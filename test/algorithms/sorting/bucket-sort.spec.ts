import { bucketSort } from '../../../src/index';
import { testSortAlgorithm } from './sort-algorithm-tests';

testSortAlgorithm(bucketSort, 'Bucket Sort', {reverseCompare: false});
