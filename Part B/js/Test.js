import BinarySearchTree from "./BinarySearchTree.js";
import { Person, Employee, Student } from "./People.js";

const NUM_BINS = 5;
const KEY_LENGTH = 8;

function printBST(header, tree) {
    let text = tree.toString() + "\n";
    console.log(header + "\n" + text);
    let outputDisplay = document.getElementById("output-display");
    text = text.replaceAll(/(?:\r\n|\r|\n)/g, '<br>');
    text = text.replaceAll(" ", '&nbsp;');
    outputDisplay.innerHTML += text;
}

function addPersonToBST(person, tree) {
    tree.putValue(person.key, person);
    printBST("Current Binary Search Tree:", tree);
}

let tree = new BinarySearchTree(KEY_LENGTH);

// DEMONSTRATE ADDING VALUES TO THE BST, WHICH INCLUDES THE NEED TO MAKE THE BST BIGGER
addPersonToBST(new Student(tree.generateKey(), "Kanye", "West", 4.0), tree);
addPersonToBST(new Employee(tree.generateKey(), "Paul", "McCartney", 80000), tree);
addPersonToBST(new Employee(tree.generateKey(), "Da", "Baby", 40000), tree);
addPersonToBST(new Person(tree.generateKey(), "Jay", "Z"), tree);
addPersonToBST(new Student(tree.generateKey(), "Aubrey", "Graham", 3.5), tree);
addPersonToBST(new Student(tree.generateKey(), "Travis", "Scott", 3.6), tree);
addPersonToBST(new Person(tree.generateKey(), "Olivia", "Rodrigo"), tree);
addPersonToBST(new Employee(tree.generateKey(), "Frank", "Ocean", 750000), tree);

// // DEMONSTRATE MAKING KEYS AND ADDING VALUES TO THE BST    
let jlKey = tree.generateKey();
tree.putValue(jlKey, new Student(jlKey, "NBA", "Youngboy", 1.8));
let cwKey = tree.generateKey();
tree.putValue(cwKey, new Student(cwKey, "Lil", "Baby", 2.3));
let dgKey = tree.generateKey();
tree.putValue(dgKey, new Employee(dgKey, "Harry", "Potter", 120));
printBST("\nAfter Changing 3 Items", tree);

// // DEMONSTRATE GETTING VALUES FROM THE BST
let p = tree.getValue(jlKey);
console.log("\nget " + jlKey + ": " + p.toString() + "\n");
p = tree.getValue(cwKey);
console.log("\nget " + cwKey + ": " + p.toString() + "\n");
p = tree.getValue(dgKey);
console.log("\nget " + dgKey + ": " + p.toString() + "\n");

// // NOW LET'S TRY REPLACING THE DATA IN THE ABOVE THREE
tree.putValue(jlKey, new Student(jlKey, "YB", "REPLACED", 3.5));
tree.putValue(cwKey, new Student(cwKey, "LIL BABY", "REPLACED", 3.1));
tree.putValue(dgKey, new Student(dgKey, "HARRY POTTER", "REPLACED", 3.4));
printBST("\nAfter Changing 3 Items", tree);
//youngboy, lil baby, and harry potter are replaced by their REPLACED counterparts!

// // AND DEMONSTRATE REMOVING ITEMS FROM THE BST
tree.removeValue(jlKey);
printBST("\nAfter Removing YOUNGBOY", tree);

tree.removeValue(cwKey);
printBST("\nAfter Removing LIL BABY", tree);

tree.removeValue(dgKey);
printBST("\nAfter Removing HARRY POTTER", tree);

//youngboy, lil baby, and harry potter are successfully removed!!!