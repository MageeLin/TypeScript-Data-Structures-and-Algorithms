import 'mocha';
import { expect } from 'chai';
import { HashTable } from '../../src/index';
import MyObj from './my-obj';

describe('HashTable', () => {
  it('starts empty', () => {
    const hashTable = new HashTable<number, number>();
    expect(hashTable.size()).to.equal(0);
    expect(hashTable.isEmpty()).to.equal(true);
  });

  it('generates hashcode', () => {
    // numbers
    let hashTable: any = new HashTable<number, number>();
    expect(hashTable.hashCode(1)).to.equal(1);
    expect(hashTable.hashCode(10)).to.equal(10);
    expect(hashTable.hashCode(100)).to.equal(100);
    expect(hashTable.hashCode(1000)).to.equal(1000);

    // strings
    hashTable = new HashTable<string, number>();
    expect(hashTable.hashCode('1')).to.equal(347);
    expect(hashTable.hashCode('10')).to.equal(356);
    expect(hashTable.hashCode('100')).to.equal(653);
    expect(hashTable.hashCode('1000')).to.equal(324);
    expect(hashTable.hashCode('a')).to.equal(395);
    expect(hashTable.hashCode('A')).to.equal(363);
    expect(hashTable.hashCode('Aba')).to.equal(529);

    // objects
    hashTable = new HashTable<MyObj, MyObj>();
    const myObjList = [];
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1));
    }
    expect(hashTable.hashCode(myObjList[0])).to.equal(124);
    expect(hashTable.hashCode(myObjList[1])).to.equal(201);
    expect(hashTable.hashCode(myObjList[2])).to.equal(278);
    expect(hashTable.hashCode(myObjList[3])).to.equal(355);
    expect(hashTable.hashCode(myObjList[4])).to.equal(432);
  });

  it('puts undefined and null keys and values', () => {
    const hashTable = new HashTable<string, number>();

    expect(hashTable.put('undefined', undefined)).to.equal(false);
    expect(hashTable.get('undefined')).to.equal(undefined);

    expect(hashTable.put('undefined', 1)).to.equal(true);
    expect(hashTable.get('undefined')).to.equal(1);

    expect(hashTable.put('null', null)).to.equal(false);
    expect(hashTable.get('null')).to.equal(undefined);

    expect(hashTable.put('null', 1)).to.equal(true);
    expect(hashTable.get('null')).to.equal(1);

    hashTable.clear();
    expect(hashTable.put(undefined, undefined)).to.equal(false);
    expect(hashTable.get(undefined)).to.equal(undefined);

    expect(hashTable.put(undefined, 1)).to.equal(false);
    expect(hashTable.get(undefined)).to.equal(undefined);

    expect(hashTable.put(null, null)).to.equal(false);
    expect(hashTable.get(null)).to.equal(undefined);

    expect(hashTable.put(null, 1)).to.equal(false);
    expect(hashTable.get(null)).to.equal(undefined);
  });

  it('puts values with number key', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    const hashTable = new HashTable<number, number>();

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size);

    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      expect(table.get(i)).to.equal(i);
    }
  });

  it('puts values with string key', () => {
    const hashTable = new HashTable<string, number>();

    expect(hashTable.put('1', 1)).to.equal(true);
    expect(hashTable.put('10', 10)).to.equal(true);
    expect(hashTable.put('100', 100)).to.equal(true);
    expect(hashTable.put('1000', 1000)).to.equal(true);

    const table = hashTable.getTable();

    expect(table.get(347)).to.equal(1);

    expect(table.get(356)).to.equal(10);

    expect(table.get(653)).to.equal(100);

    expect(table.get(324)).to.equal(1000);
  });

  it('puts values with object key', () => {
    const hashTable = new HashTable<MyObj, MyObj>();

    const myObjList = [];
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1));
      expect(hashTable.put(myObjList[i - 1], myObjList[i - 1])).to.equal(true);
    }

    const table = hashTable.getTable();

    expect(table.get(124)).to.equal(myObjList[0]);

    expect(table.get(201)).to.equal(myObjList[1]);

    expect(table.get(278)).to.equal(myObjList[2]);

    expect(table.get(355)).to.equal(myObjList[3]);

    expect(table.get(432)).to.equal(myObjList[4]);
  });

  it('does NOT handle collision, replaces values', () => {
    const hashTable = new HashTable<number, number>();

    for (let i = 0; i < 5; i++) {
      expect(hashTable.put(1, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(1);
  });

  it('removes elements', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    const hashTable = new HashTable<number, number>();

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size);

    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).to.equal(true);
    }

    // elements do not exist
    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).to.equal(false);
    }

    expect(hashTable.isEmpty()).to.equal(true);
  });

  it('returns toString primitive types', () => {
    const hashTable = new HashTable<number, number>();

    expect(hashTable.toString()).to.equal('');

    hashTable.put(1, 1);
    expect(hashTable.toString()).to.equal('{1 => 1}');

    hashTable.put(2, 2);
    expect(hashTable.toString()).to.equal('{1 => 1},{2 => 2}');

    hashTable.clear();
    expect(hashTable.toString()).to.equal('');
  });

  it('returns toString primitive types', () => {
    const hashTable = new HashTable<string, number>();

    hashTable.put('el1', 1);
    expect(hashTable.toString()).to.equal('{508 => 1}');

    hashTable.put('el2', 2);
    expect(hashTable.toString()).to.equal('{508 => 1},{509 => 2}');
  });

  it('returns toString objects', () => {
    const hashTable = new HashTable<MyObj, MyObj>();

    let myObj = new MyObj(1, 2);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).to.equal('{124 => 1|2}');

    myObj = new MyObj(3, 4);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).to.equal(
      '{124 => 1|2},{278 => 3|4}'
    );
  });
});
