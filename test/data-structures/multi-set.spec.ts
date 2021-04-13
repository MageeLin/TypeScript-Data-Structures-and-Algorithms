import "mocha";
import { expect } from "chai";
import { MultiSet } from "../../src/index";
import MyObj from "./my-obj";

describe("MultiSet", () => {
  let multiSet: MultiSet<number>;

  beforeEach(() => {
    multiSet = new MultiSet<number>();
  });

  it("starts empty", () => {
    expect(multiSet.size()).to.equal(0);
    expect(multiSet.dimension()).to.equal(0);
    expect(multiSet.isEmpty()).to.equal(true);
  });

  it("adds elements", () => {
    for (let i = 1; i < 5; i++) {
      multiSet.add(i, 2);
      expect(multiSet.size()).to.equal(i * 2);
    }

    expect(multiSet.isEmpty()).to.equal(false);
  });

  it("deletes elements", () => {
    for (let i = 1; i < 5; i++) {
      multiSet.add(i, 3);
    }

    for (let i = 1; i < 5; i++) {
      expect(multiSet.remove(i, 3)).to.equal(true);
    }

    // elements do not exist
    for (let i = 1; i < 5; i++) {
      expect(multiSet.remove(i)).to.equal(false);
    }

    for (let i = 1; i < 5; i++) {
      expect(multiSet.delete(i)).to.equal(false);
    }

    expect(multiSet.isEmpty()).to.equal(true);
  });

  it("returns if element exists", () => {
    for (let i = 1; i < 5; i++) {
      multiSet.add(i, 2);
      expect(multiSet.has(i)).to.equal(true);
    }

    for (let i = 1; i < 5; i++) {
      expect(multiSet.remove(i, 2)).to.equal(true);
      expect(multiSet.has(i)).to.equal(false);
    }
  });

  it("returns the correct size", () => {
    expect(multiSet.size()).to.equal(0);

    for (let i = 1; i < 5; i++) {
      multiSet.add(i, 3);
      expect(multiSet.size()).to.equal(i * 3);
    }
    const max = 5;
    for (let i = 1; i < max; i++) {
      multiSet.remove(i, 3);
      expect(multiSet.size()).to.equal((max - i - 1) * 3);
    }

    expect(multiSet.size()).to.equal(0);
    expect(multiSet.isEmpty()).to.equal(true);
  });



  it("returns the correct dimension", () => {
    expect(multiSet.size()).to.equal(0);

    for (let i = 1; i < 5; i++) {
      multiSet.add(i, 3);
      expect(multiSet.dimension()).to.equal(i);
    }
    const max = 5;
    for (let i = 1; i < max; i++) {
      multiSet.remove(i, 3);
      expect(multiSet.dimension()).to.equal(max - i - 1);
    }

    expect(multiSet.dimension()).to.equal(0);
    expect(multiSet.isEmpty()).to.equal(true);
  });



  it("returns if it is empty", () => {
    expect(multiSet.isEmpty()).to.equal(true);

    for (let i = 1; i < 5; i++) {
      multiSet.add(i, 2);
      expect(multiSet.isEmpty()).to.equal(false);
    }

    for (let i = 1; i < 5; i++) {
      multiSet.remove(i, 2);
      expect(multiSet.isEmpty()).to.equal(!(i < 4));
    }

    expect(multiSet.size()).to.equal(0);
    expect(multiSet.isEmpty()).to.equal(true);
  });

  it("clears the multiSet", () => {
    multiSet.clear();
    expect(multiSet.isEmpty()).to.equal(true);

    multiSet.add(1, 3);
    multiSet.add(2, 5);

    multiSet.clear();
    expect(multiSet.isEmpty()).to.equal(true);
  });

  function addValues(min: number, max: number) {
    multiSet = new MultiSet();

    for (let i = min; i <= max; i++) {
      multiSet.add(i);
    }

    return multiSet;
  }

  it("union between empty multiSets", () => {
    const set1 = new MultiSet();
    const set2 = new MultiSet();

    let setResult = set1.union(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.union(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it("union between equal multiSets", () => {
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

  it("union between different multiSets", () => {
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

  it("union between multiSets with common values", () => {
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

  it("intersection between empty multiSets", () => {
    const set1 = new MultiSet();
    const set2 = new MultiSet();

    let setResult = set1.intersection(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.intersection(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it("intersection between equal multiSets", () => {
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

  it("intersection different multiSets", () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    let setResult = set1.intersection(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.intersection(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it("intersection between multiSets with common values", () => {
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

  it("difference between empty multiSets", () => {
    const set1 = new MultiSet();
    const set2 = new MultiSet();

    let setResult = set1.difference(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.difference(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it("difference between equal multiSets", () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    let setResult = set1.difference(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.difference(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it("difference different multiSets", () => {
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

  it("difference between multiSets with common values", () => {
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

  it("isSubsetOf between empty multiSets", () => {
    const set1 = new MultiSet();
    const set2 = new MultiSet();

    expect(set1.isSubsetOf(set2)).to.equal(true);
    expect(set2.isSubsetOf(set1)).to.equal(true);
  });

  it("isSubsetOf between equal multiSets", () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    expect(set1.isSubsetOf(set2)).to.equal(true);
    expect(set2.isSubsetOf(set1)).to.equal(true);
  });

  it("isSubsetOf different multiSets", () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    expect(set1.isSubsetOf(set2)).to.equal(false);
    expect(set2.isSubsetOf(set1)).to.equal(false);
  });

  it("isSubsetOf between multiSets with common values", () => {
    const set1 = addValues(1, 8);
    const set2 = addValues(3, 6);
    expect(set1.isSubsetOf(set2)).to.equal(false);
    expect(set2.isSubsetOf(set1)).to.equal(true);

    const set3 = addValues(1, 5);
    const set4 = addValues(3, 6);
    expect(set3.isSubsetOf(set4)).to.equal(false);
    expect(set4.isSubsetOf(set3)).to.equal(false);
  });

  it("returns toString primitive types", () => {
    expect(multiSet.toString()).to.equal("");

    multiSet.add(1);
    expect(multiSet.toString()).to.equal("1");

    multiSet.add(2);
    expect(multiSet.toString()).to.equal("1,2");

    multiSet.clear();
    expect(multiSet.toString()).to.equal("");
  });

  it("returns toString primitive types: string", () => {
    const ds = new MultiSet<string>();
    ds.add("el1");
    expect(ds.toString()).to.equal("el1");

    ds.add("el2");
    expect(ds.toString()).to.equal("el1,el2");
  });

  it("returns toString objects", () => {
    const ds = new MultiSet<MyObj>();
    expect(ds.toString()).to.equal("");

    ds.add(new MyObj(1, 2));
    expect(ds.toString()).to.equal("1|2");

    ds.add(new MyObj(3, 4));
    expect(ds.toString()).to.equal("1|2,3|4");
  });
});
