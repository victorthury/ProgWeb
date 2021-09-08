class IntegerSet {
  constructor(upperLimit) {
    this.upperLimit = upperLimit;
    this.integerSet = Array.from(Array(upperLimit + 1), e => false)
  }

  // uma função de utilidade
  isNumberInSetRange(number) {
    return number >= 0 && number <= this.upperLimit
  }

  // Principais métodos
  insert(number) {
    if(this.isNumberInSetRange(number)) {
      this.integerSet[number] = true;
    } else {
      console.log(`Número ${number} fora do intervalo estabelecido`)
      console.log(`Insira números de 0 até ${this.upperLimit}`)
    }
  }

  remove(number) {
    if (this.isNumberInSetRange(number) && this.integerSet[number]) {
      this.integerSet[number] = false;
    } else if (!this.integerSet[number]) {
      console.log(`O número ${number} não faz parte do intervalo`)
    } else {
      console.log(`Remova números de 0 até ${this.upperLimit}`)
    }
  }

  static union (set1, set2) {
    const unionArrayUpperLimit = set1.upperLimit > set2.upperLimit ? set1.upperLimit : set2.upperLimit;
    const unionSet = new IntegerSet(unionArrayUpperLimit);
    for (let i = 0; i <= unionArrayUpperLimit; i++) {
      if (set1.integerSet[i] || set2.integerSet[i]) {
        unionSet.insert(i);
      }
    }
    return unionSet;
  }

  static intersection (set1, set2) {
    const intersectionArrayUpperLimit = set1.upperLimit > set2.upperLimit ? set1.upperLimit : set2.upperLimit;
    const intersectionSet = new IntegerSet(intersectionArrayUpperLimit);
    for (let i = 0; i <= intersectionArrayUpperLimit; i++) {
      if (set1.integerSet[i] && set2.integerSet[i]) {
        intersectionSet.insert(i);
      }
    }
    return intersectionSet;
  }

  static diff (set1, set2) {
    const diffSet = new IntegerSet(set1.upperLimit);
    for (let i = 0; i <= set1.upperLimit; i++) {
      if (set1.integerSet[i] && !set2.integerSet[i]) {
        diffSet.insert(i);
      }
    }
    return diffSet;
  }

  static translate(set) { 
    const integerSet = set.integerSet
    const translatedArray = [];

    for (let i = 0; i < integerSet.length; i++) {
      if (integerSet[i]) {
        translatedArray.push(i.toString());
      }
    }

    return translatedArray;
  }
}

// Conjunto A com teto até 10
const setA = new IntegerSet(10);

// Conjunto B com teto até 20
const setB = new IntegerSet(20);


// Insere numeros para o conjunto A
for (let i = 0; i <= 8; i++) {
  const randomNumber = Math.floor(Math.random() * Math.floor(setA.upperLimit));
  setA.insert(randomNumber);
}

// Insere numeros para o conjunto B
for (let i = 0; i <= 8; i++) {
  const randomNumber = Math.floor(Math.random() * Math.floor(setB.upperLimit));
  setB.insert(randomNumber);
}
// A união B
const unionSet1Set2 = IntegerSet.union(setA, setB);

// A interseção B

const intersectionSet1Set2 = IntegerSet.intersection(setA, setB);
// A diferença B
const diffSetASetB = IntegerSet.diff(setA, setB);

// B diferença A
const diffSetBSetA = IntegerSet.diff(setB, setA);

console.log(`Conjunto A:\n${IntegerSet.translate(setA)}\n`);
console.log(`Conjunto B:\n${IntegerSet.translate(setB)}\n`);
console.log(`A união B:\n${IntegerSet.translate(unionSet1Set2)}\n`);
console.log(`A interseção B:\n${IntegerSet.translate(intersectionSet1Set2)}\n`);
console.log(`A diferença B:\n${IntegerSet.translate(diffSetASetB)}\n`);
console.log(`B diferença A:\n${IntegerSet.translate(diffSetBSetA)}\n`);

intersectionSet1Set2.integerSet.forEach((e, i) => {
  if (intersectionSet1Set2.integerSet[i] && setA.integerSet[i]) {
    setA.remove(i);
  }
})

console.log(`Conjunto A após remover elementos da interseção com B:\n${IntegerSet.translate(setA)}\n`);
