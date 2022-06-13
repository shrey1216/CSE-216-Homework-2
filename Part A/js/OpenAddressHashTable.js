class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
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
    
    getValue(key) {


        let index = this.hashCode(key); // THIS IS THE NATURAL INDEX
        

        let count = 0;
        while (count < length) {
            let testKVP = new KeyValuePair();
            testKVP = this.hashTable[index];
            // IF IT'S null, IT CAN'T BE IN THE HASH TABLE
            if (testKVP == null) {
                return null;
             }
            // IF A KVP USES THIS KEY, RETURN ITS VALUE
             else if (testKVP.key.localeCompare(key) == 0) {
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
 
    
    removeValue(key) {
        let index = this.hashCode(key); // THIS IS THE NATURAL INDEX
        let count = 0;

        while (count < length) {
            let testKVP = new KeyValuePair();
            testKVP = this.hashTable[index];
            // IF IT'S null, IT CAN'T BE IN THE HASH TABLE
            if (testKVP == null) {
                return;
            }
            // IF A KVP USES THIS KEY, REMOVE IT

            else if (testKVP.getKey().localeCompare(key) == 0) {
                // DELETE THE KVP (but not the value)
                testKVP = null;
                
                // EMPTY THAT LOCATION
                this.hashTable[index] = null;
                
                // DECREMENT THE SIZE
                this.size--;
                
                // AND REHASH THE TABLE
                let temp = new KeyValuePair[length];
                temp = new KeyValuePair[this.length]

                let counter = 0;
                // FIRST GET ALL THE EXISTING VALUES AND PUT THEM
                // WHERE WE CAN GET THEM WHILE EMPTYING THE HASH TABLE
                for (let i = 0; i < length; i++) {
                    
                    let item = new KeyValuePair();
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

                    let item = new KeyValuePair();
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

    putValue(key, item) {
        try {

        //FIGURE OUT HOW TO DO THIS CORRECTLY
        let index = this.hashCode(key); // THIS IS THE NATURAL INDEX

        let count = 0;
        let testKVP = this.hashTable[index];
        while (count < this.length) {
            // IF IT'S AVAILABLE, PUT IT HERE
            if (testKVP == null) {
                this.hashTable[index] = new KeyValuePair(key, item);
                this.size++;
                return;
            }
            // IF ANOTHER KVP ALREADY USES THIS KEY, REPLACE IT
            else if (testKVP.getKey().localeCompare(key) == 0) {
                this.hashTable[index].value = item;
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
        let temp = [this.hashTable.length];
        for (let i = 0; i < temp.length; i++) {
            temp[i] = new KeyValuePair(this.hashTable[i].getKey(), this.hashTable[i].getValue());
        }
        length = length * 2;

        this.hashTable = [length];

        // FIRST CLEAR IT OUT
        for (let i = 0; i < length; i++) {
            this.hashTable[i] = null;
        }
        // THEN MOVE ALL THE OLD VALUES OVER
        let numToCopy = this.size;
        this.size = 0;
        let kvp = new KeyValuePair();
        for (let i = 0; i < numToCopy; i++) {
            kvp = temp[i];
            let keyToMove = kvp.getKey();
  
            let valueToMove = kvp.value;
            this.putValue(keyToMove, valueToMove);
            //FIGURE OUT HOW TO DELETE!
        }
        //to free the contents of a variable, you can set it to null. 
       
        // AND REMEMBER TO ADD THE NEW ONE
        this.putValue(key, item);
    }
    catch(e) {

    }
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