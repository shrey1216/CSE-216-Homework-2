class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {

        //let table = new OpenAddressHashTable();
        //let index = hashCode(key);
        //MAKE SURE THIS WORKS
        let index = this.hashCode(key); // THIS IS THE NATURAL INDEX
        

        let count = 0;
        while (count < length) {
            let testKVP = new KeyValuePair;
            testKVP = this.hashTable[index];
            // IF IT'S null, IT CAN'T BE IN THE HASH TABLE
            if (testKVP == null) {
                return null;
             }
            // IF A KVP USES THIS KEY, RETURN ITS VALUE
             else if (testKVP.key.compare(key) == 0) {
                 return testKVP.value;
            }
            index++;
            // WE MAY NEED TO RESET index TO LOOK IN THE FRONT OF THE HASH TABLE
            if (index == length)
                index = 0;
            count++;
            }
            // IT WAS NOT IN THE FULL HASH TABLE, SO RETURN null
        return null;
    }
 
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        let index = this.hashCode(key); // THIS IS THE NATURAL INDEX
        let count = 0;

        while (count < length) {
            let testKVP = new KeyValuePair;
            testKVP = this.hashTable[index];
            // IF IT'S null, IT CAN'T BE IN THE HASH TABLE
            if (testKVP == null) {
                return;
            }
            // IF A KVP USES THIS KEY, REMOVE IT

            //Find a better way to compare two strings (locale comare inconsistent)
            else if (testKVP.key.localeCompare(key) == 0) {
                // DELETE THE KVP (but not the value)
                testKVP = null;
                
                // EMPTY THAT LOCATION
                this.hashTable[index] = null;
                
                // DECREMENT THE SIZE
                this.size--;
                
                // AND REHASH THE TABLE
                //KeyValuePair* *temp = new KeyValuePair*[length];
                let temp = new KeyValuePair[length];
                temp = new KeyValuePair[this.length]

                let counter = 0;
                // FIRST GET ALL THE EXISTING VALUES AND PUT THEM
                // WHERE WE CAN GET THEM WHILE EMPTYING THE HASH TABLE
                for (let i = 0; i < length; i++) {
                    
                    let item = new KeyValuePair;
                    item = this.hashTable[i];

                    if (item != null) {
                        temp[counter] = item;
                        counter++;
                    }
                    this.hashTable[i] = null;
                }
                // RESET THE size
                this.size = 0;
                // AND NOW RE-PUT ALL THE VALUES
                for (let i = 0; i < counter; i++) {

                    //KeyValuePair *item = temp[i];
                    let item = new KeyValuePair;
                    item = temp[i];

                    let keyToRehash = item.key;
                    let valueToRehash = item.value;
                    putValue(keyToRehash, valueToRehash);
                    
                    // DELETE THE OLD KeyValuePair OBJECT SINCE putValue ADDS A NEW ONE
                    item = null;
                }
                // AND REMEMBER TO DELETE OUR TEMP ARRAY
                temp = null;
                return;
            }
            index++;
            // WE MAY NEED TO RESET index TO LOOK IN THE FRONT OF THE HASH TABLE
            if (index == length){
                index = 0;
            }
            count++;
        }            
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {

        //FIGURE OUT HOW TO DO THIS CORRECTLY
        //let table = new OpenAddressHashTable()
        let index = this.hashCode(key); // THIS IS THE NATURAL INDEX

        let count = 0;
        while (count < length) {
            let testKVP = new KeyValuePair;
            testKVP = this.hashTable[index];
            // IF IT'S AVAILABLE, PUT IT HERE
            if (testKVP == null) {
                this.hashTable[index] = new KeyValuePair(key, item);
                this.size++;
                return;
            }
            // IF ANOTHER KVP ALREADY USES THIS KEY, REPLACE IT
            // FIX COMPARE METHOD
            else if (testKVP.key.compare(key) == 0) {
                this.hashTable[index].value = item;
                this.size++;
                return;
            }
            index++;
            // WE MAY NEED TO RESET index TO LOOK IN THE FRONT OF THE HASH TABLE
            if (index == length)
                index = 0;
            count++;
        }
        // WE DIDN'T FIND AN EMPTY SPOT OR AN ITEM WITH THE SAME
        // KEY SO WE NEED A BIGGER HASH TABLE. SO MAKE A BIGGER
        // ONE AND PUT ALL THE OLD VALUES IN THE NEW ONE
        let temp = new KeyValuePair;
        temp = this.hashTable;
        length = length * 2;

        //this.hashTable = new KeyValuePair[length];
        this.hashTable[length] = new KeyValuePair;

        // FIRST CLEAR IT OUT
        for (let i = 0; i < length; i++) {
            this.hashTable[i] = null;
        }
        // THEN MOVE ALL THE OLD VALUES OVER
        let numToCopy = this.size;
        this.size = 0;
        for (let i = 0; i < numToCopy; i++) {
            let kvp = new KeyValuePair;
            kvp = temp[i];
            let keyToMove = kvp.key;
  
            //REMOVING S* from the beginning
            let valueToMove = kvp.value;
            putValue(keyToMove, valueToMove);
            //FIGURE OUT HOW TO DELETE!
            //delete kvp;
            kvp = null;
        }
        //delete temp;
        //to free the contents of a variable, you can set it to null. 
        //
        temp = null;
       
        // AND REMEMBER TO ADD THE NEW ONE
        this.putValue(key, item);
    }

    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};