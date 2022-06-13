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

    putValueRecursively(key, value, testNode) {
        // Check to see if it goes on the left
        if (key.localeCompare(testNode.key) < 0) {
            if (testNode.left == null) {
                testNode.left = new Node(key, value, testNode, null, null);
                this.size++;
                return;
            }
            else {
                this.putValueRecursively(key, value, testNode.left);
            }
        }
        else if (key.localeCompare(testNode.key) == 0) {
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
                this.putValueRecursively(key, value, testNode.right);
            }
        }
    }

    putValue(key, value) {
        // make root if first one
        if (this.root == null) {
            this.root = new Node(key, value, null, null, null);
            this.size++;
            return;
        }
        // add to the existing tree
        this.putValueRecursively(key, value, this.root);
    }

    getValueRecursively(key, testNode) {
        if (key.localeCompare(testNode.key) < 0) {
            if (testNode.left == null) {
                return null;
            }
            else {
                return this.getValueRecursively(key, testNode.left);
            }
        }
        else if (key.localeCompare(testNode.key) == 0) {
            return testNode.data;
        }
        else {
            if (testNode.right == null) {
                return null;
            }
            else {
                return this.getValueRecursively(key, testNode.right);
            }
        }
    }
    
    getValue(key) {
        if (this.root == null) {
            return null;
        }
        else {
            return this.getValueRecursively(key, this.root);
        }
    }

    removeValue(key) {

        let traveller = new Node;
        traveller = this.root;

        let found = false;

        console.log("\nIterate through tree to remove value: \n");
        while (!found) {
            console.log("\nkey: " + key + ", traveller->key:  " + traveller.key + "\n");

            //changed compare to localeCompare
            if (key.localeCompare(traveller.key) == 0) {
                // If there is a left, get the largest on the left
                if (traveller.left != null) {

                    // find the largest
                    let largest = new Node;
                    largest = traveller.left;
                    while (largest.right != null) {
                        largest = largest.right;
                    }
                    
                    // move the key and the data
                    traveller.key = largest.key;
                    traveller.data = largest.data;
                    
                    // fix tree 
                    if (largest == largest.parent.left) {
                        largest.parent.left = largest.left;
                    }
                    else {
                        largest.parent.right = largest.left;
                    }
                    largest = null;
                }
                // put the smallest on the right 
                else if (traveller.right != null) {
                    // find the smallest first 
                    let smallest = new Node;
                    smallest = traveller.right;
                    while (smallest.left != null) {
                        smallest = smallest.left;
                    }
                    
                    
                    // first move key and find data 
                    traveller.key = smallest.key;
                    traveller.data = smallest.data;
                    
                    // fix tree
                    if (smallest == smallest.parent.right) {
                        smallest.parent.right = smallest.right;
                    }
                    else {
                        smallest.parent.left = smallest.right;
                    }
                    smallest = null;
                }
                // see if it's a leaf (last in tree)
                else {
                    // check if root 
                    if (traveller == this.root) {
                        this.root = null;
                    }
                    // check left
                    else if (traveller == traveller.parent.left) {
                        traveller.parent.left = null;
                        traveller = null;
                    }
                    // check right 
                    else {
                        traveller.parent.right = null;
                        traveller = null;
                    }
                }
                this.size--;
                found = true;
            }
            else if (key.localeCompare(traveller.key) < 0) {
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

    // toString for printing
    // Needs to be recursive to iterate through the binary tree
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