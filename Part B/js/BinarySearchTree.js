class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // Updated Method for lowercase letters
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 26);
            let randomChar;

            //the lowercase alphabet starts at ascii code 97
            //extends to 26 because 26 letters in the alphabet
            randomNum += 97;
            randomChar = String.fromCharCode(randomNum);
            
            key += randomChar;
        }
        return key;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {
        // IF IT'S THE FIRST ONE MAKE IT THE ROOT
        if (this.root == null) {
            this.root = new Node(key, value, null, null, null);
            this.size++;
            return;
        }
        // ADD IT TO THE EXISTING TREE
        putValueRecursively(key, value, this.root);
    }

    putValueRecursively(key, value, testNode) {
        // DOES IT GO ON THE LEFT?
        if (key.compare(testNode.key) < 0) {
            if (testNode.left == null) {
                testNode.left = new Node(key, value, testNode, null, null);
                this.size++;
                return;
            }
            else {
                putValueRecursively(key, value, testNode.left);
            }
        }
        else if (key.compare(testNode.key) == 0) {
            testNode.data = value;
            return;
        }
        else {
            if (testNode.right == null) {
                testNode.right = new Node(key, value, testNode, null, null);
                this.size++;
                return;
            }
            else {
                putValueRecursively(key, value, testNode.right);
            }
        }
    }


    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        return null;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {

        let traveller = new Node;
        traveller = this.root;

        let found = false;

        while (!found) {
            console.log("\nkey: " + key + ", traveller->key:  " + traveller.key + "\n");

            //compare method fix
            if (key.compare(traveller.key) == 0) {
                // GET THE LARGEST ON THE LEFT, IS THERE IS A LEFT
                if (traveller.left != null) {
                    // FIND THE LARGEST
                    let largest = new Node;
                    largest = traveller.left;
                    while (largest.right != null) {
                        largest = largest.right;
                    }
                    // AT THIS POINT largest MUST
                    // BE THE LARGEST ON THE LEFT
                    // BUT IT MIGHT BE ITS PARENT LEFT
                    // OR RIGHT NODE
                    
                    // FIRST MOVE THE key AND THE data
                    traveller.key = largest.key;
                    traveller.data = largest.data;
                    
                    // THEN FIX THE TREE, NOTE largest HAS NO RIGHT
                    // IF IT'S A LEAF WE DON'T CARE ABOUT ITS CHILDREN
                    // SO WE CAN JUST KEEP ITS LEFT
                    if (largest == largest.parent.left) {
                        largest.parent.left = largest.left;
                    }
                    else {
                        largest.parent.right = largest.left;
                    }
                    largest = null;
                }
                // OR THE SMALLEST ON THE RIGHT
                else if (traveller.right != null) {
                    // FIND THE SMALLEST
                    let smallest = new Node;
                    smallest = traveller.right;
                    while (smallest.left != null) {
                        smallest = smallest.left;
                    }
                    // AT THIS POINT Smallest MUST
                    // BE THE SMALLEST ON THE RIGHT
                    // BUT IT MIGHT BE ITS PARENT RIGHT
                    // OR LEFT NODE
                    
                    // FIRST MOVE THE key AND THE data
                    traveller.key = smallest.key;
                    traveller.data = smallest.data;
                    
                    // THEN FIX THE TREE
                    if (smallest == smallest.parent.right) {
                        smallest.parent.right = smallest.right;
                    }
                    else {
                        smallest.parent.left = smallest.right;
                    }
                    smallest = null;
                }
                // IT'S A LEAF
                else {
                    // IT MIGHT BE THE ROOT (i.e. THE ONLY NODE)
                    if (traveller == this.root) {
                        this.root = null;
                    }
                    // IT MIGHT BE ON ITS PARENT'S LEFT
                    else if (traveller == traveller.parent.left) {
                        traveller.parent.left = null;
                        traveller = null;
                    }
                    // OR ITS RIGHT
                    else {
                        traveller.parent.right = null;
                        traveller = null;
                    }
                }
                this.size--;
                found = true;
            }
            else if (key.compare(traveller.key) < 0) {
                if (traveller.left == null) {
                    return;
                }
                else {
                    traveller = traveller.left;
                }
            }
            else {
                if (traveller.right == null) {
                    return;
                }
                else {
                    traveller = traveller.right;
                }
            }
        }
    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}