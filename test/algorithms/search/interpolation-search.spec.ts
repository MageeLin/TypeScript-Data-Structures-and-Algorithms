import { interpolationSearch } from '../../../src/index';
import { testSearchAlgorithm } from './search-algorithms-tests';

testSearchAlgorithm(interpolationSearch, 'Interpolation Search', { customEquals: false });

