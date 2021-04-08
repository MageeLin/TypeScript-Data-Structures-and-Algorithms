import 'mocha';
import { expect } from 'chai';
import { CustomSet } from '../../src/index';
import MyObj from './my-obj';

describe('CustomSet', () => {
  let customSet: CustomSet<number>;

  beforeEach(() => {
    customSet = new CustomSet<number>();
  });

  it('starts empty', () => {
    expect(customSet.size()).to.equal(0);
    expect(customSet.isEmpty()).to.equal(true);
  });

  it('adds elements', () => {
    for (let i = 1; i < 5; i++) {
      customSet.add(i);
      expect(customSet.size()).to.equal(i);
    }

    expect(customSet.isEmpty()).to.equal(false);
  });

  it('does not allow duplicated elements', () => {
    let expected = true;
    for (let i = 1; i < 5; i++) {
      expect(customSet.add(i)).to.equal(expected);
    }

    expected = false;
    for (let i = 1; i < 5; i++) {
      expect(customSet.add(i)).to.equal(expected);
    }
  });

  it('deletes elements', () => {
    for (let i = 1; i < 5; i++) {
      customSet.add(i);
    }

    for (let i = 1; i < 5; i++) {
      expect(customSet.delete(i)).to.equal(true);
    }

    // elements do not exist
    for (let i = 1; i < 5; i++) {
      expect(customSet.delete(i)).to.equal(false);
    }

    expect(customSet.isEmpty()).to.equal(true);
  });

  it('returns if element exists', () => {
    for (let i = 1; i < 5; i++) {
      customSet.add(i);
      expect(customSet.has(i)).to.equal(true);
    }

    for (let i = 1; i < 5; i++) {
      expect(customSet.delete(i)).to.equal(true);
      expect(customSet.has(i)).to.equal(false);
    }
  });

  it('returns the correct size', () => {
    expect(customSet.size()).to.equal(0);

    for (let i = 1; i < 5; i++) {
      customSet.add(i);
      expect(customSet.size()).to.equal(i);
    }

    const max = 5;
    for (let i = 1; i < max; i++) {
      customSet.delete(i);
      expect(customSet.size()).to.equal(max - i - 1);
    }

    expect(customSet.size()).to.equal(0);
    expect(customSet.isEmpty()).to.equal(true);
  });

  it('returns if it is empty', () => {
    expect(customSet.isEmpty()).to.equal(true);

    for (let i = 1; i < 5; i++) {
      customSet.add(i);
      expect(customSet.isEmpty()).to.equal(false);
    }

    for (let i = 1; i < 5; i++) {
      customSet.delete(i);
      expect(customSet.isEmpty()).to.equal(!(i < 4));
    }

    expect(customSet.size()).to.equal(0);
    expect(customSet.isEmpty()).to.equal(true);
  });

  it('clears the customSet', () => {
    customSet.clear();
    expect(customSet.isEmpty()).to.equal(true);

    customSet.add(1);
    customSet.add(2);

    customSet.clear();
    expect(customSet.isEmpty()).to.equal(true);
  });

  function addValues(min: number, max: number) {
    customSet = new CustomSet();

    for (let i = min; i <= max; i++) {
      customSet.add(i);
    }

    return customSet;
  }

  it('union between empty customSets', () => {
    const set1 = new CustomSet();
    const set2 = new CustomSet();

    let setResult = set1.union(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.union(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('union between equal customSets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    let setResult = set1.union(set2);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.union(set1);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('union between different customSets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    let setResult = set1.union(set2);
    for (let i = 1; i <= 10; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.union(set1);
    for (let i = 1; i <= 10; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('union between customSets with common values', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(3, 6);

    let setResult = set1.union(set2);
    for (let i = 1; i <= 6; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.union(set1);
    for (let i = 1; i <= 6; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('intersection between empty customSets', () => {
    const set1 = new CustomSet();
    const set2 = new CustomSet();

    let setResult = set1.intersection(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.intersection(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('intersection between equal customSets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    let setResult = set1.intersection(set2);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.intersection(set1);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('intersection different customSets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    let setResult = set1.intersection(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.intersection(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('intersection between customSets with common values', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(3, 6);

    let setResult = set1.intersection(set2);
    for (let i = 3; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.intersection(set1);
    for (let i = 3; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('difference between empty customSets', () => {
    const set1 = new CustomSet();
    const set2 = new CustomSet();

    let setResult = set1.difference(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.difference(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('difference between equal customSets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    let setResult = set1.difference(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.difference(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('difference different customSets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    let setResult = set1.difference(set2);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.difference(set1);
    for (let i = 6; i <= 10; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('difference between customSets with common values', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(3, 6);

    let setResult = set1.difference(set2);
    for (let i = 1; i <= 2; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.difference(set1);
    for (let i = 6; i <= 6; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('isSubsetOf between empty customSets', () => {
    const set1 = new CustomSet();
    const set2 = new CustomSet();

    expect(set1.isSubsetOf(set2)).to.equal(true);
    expect(set2.isSubsetOf(set1)).to.equal(true);
  });

  it('isSubsetOf between equal customSets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    expect(set1.isSubsetOf(set2)).to.equal(true);
    expect(set2.isSubsetOf(set1)).to.equal(true);
  });

  it('isSubsetOf different customSets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    expect(set1.isSubsetOf(set2)).to.equal(false);
    expect(set2.isSubsetOf(set1)).to.equal(false);
  });

  it('isSubsetOf between customSets with common values', () => {
    const set1 = addValues(1, 8);
    const set2 = addValues(3, 6);
    expect(set1.isSubsetOf(set2)).to.equal(false);
    expect(set2.isSubsetOf(set1)).to.equal(true);

    const set3 = addValues(1, 5);
    const set4 = addValues(3, 6);
    expect(set3.isSubsetOf(set4)).to.equal(false);
    expect(set4.isSubsetOf(set3)).to.equal(false);
  });

  it('returns toString primitive types', () => {
    expect(customSet.toString()).to.equal('');

    customSet.add(1);
    expect(customSet.toString()).to.equal('1');

    customSet.add(2);
    expect(customSet.toString()).to.equal('1,2');

    customSet.clear();
    expect(customSet.toString()).to.equal('');
  });

  it('returns toString primitive types: string', () => {
    const ds = new CustomSet<string>();
    ds.add('el1');
    expect(ds.toString()).to.equal('el1');

    ds.add('el2');
    expect(ds.toString()).to.equal('el1,el2');
  });

  it('returns toString objects', () => {
    const ds = new CustomSet<MyObj>();
    expect(ds.toString()).to.equal('');

    ds.add(new MyObj(1, 2));
    expect(ds.toString()).to.equal('1|2');

    ds.add(new MyObj(3, 4));
    expect(ds.toString()).to.equal('1|2,3|4');
  });
});
