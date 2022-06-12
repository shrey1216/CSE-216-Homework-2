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
        let table = new OpenAddressHashTable()
        //let index = hashCode(key);
        //MAKE SURE THIS WORKS
        let index = table.hashCode(key); // THIS IS THE NATURAL INDEX
        let count = 0;
        while (count < length) {
            let testKVP = new KeyValuePair;
            testKVP = hashTable[index];
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
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {

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