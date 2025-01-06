// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler



function validateCreditCardNumber(creditCardNumber) {
    /*
    Luhn's algorithm:
    1. Multiply every other digit by 2, starting with the number’s second-to-last digit, and then add those products’ digits together.
    
    2. Add the sum to the sum of the digits that weren’t multiplied by 2.
    
    3. If the total’s last digit is 0 (or, put more formally, if the total modulo 10 is congruent to 0), the number is valid!
    */
    
    let total = 0;
    
    
    for (let j = 1; j <= creditCardNumber.length; j++) {
        const currPos = creditCardNumber.length - j;
        //console.log("======")
        //console.log(`curr digit ${creditCardNumber[currPos]}`);
        if (j % 2 == 1) {
            //console.log('normal add');
            total += parseInt(creditCardNumber[currPos]);
            continue;
        } else {
            let doubled = 2 * parseInt(creditCardNumber[currPos]);
            while (doubled > 0) {
                total = total + (doubled % 10);
                doubled = Math.floor(doubled / 10);
            }
            //total = total + 2 * parseInt(creditCardNumber[currPos]);
            //total += (2 * parseInt(creditCardNumber[currPos]));
        }
    }
    //console.log(total);
    return total % 10 == 0
}


function isValidMastercard(ccNumber) {
    //console.log(validateCreditCardNumber(ccNumber));
    //console.log(ccNumber.length);
    //console.log(ccNumber[0]);
    /* valid cc number by Luhn's, 16 digits, starts with a 5 */
    return validateCreditCardNumber(ccNumber) && ccNumber.length === 16 && ccNumber[0] === '5';
}
function isValidAmex(ccNumber) {
    return validateCreditCardNumber(ccNumber) && ccNumber.length === 16 && (ccNumber.substring(0, 2) === '34' || ccNumber.substring(0,2) === '37');
}

function determineCreditCard(ccNumber) {
    if (isValidMastercard(ccNumber)) {
        return "MASTERCARD";
    }
    else if (isValidAmex(ccNumber)) {
        return "AMEX";
    }
    return "INVALID";
}

//console.log(validateCreditCardNumber('79927398713'));
console.log(determineCreditCard('5418878773156819'))



const myObj = {
    name: 'ObjectsAreCool!',
    lesson: 'learned',
    calculate: ((a, b) => a * b)
}

console.log(`${myObj.name}`);
console.log(`${myObj.lesson}`);
console.log(`${myObj.calculate(3, -15)}`);


function createPerson(name, age, numberOfToes) {
    return {
        name: name,
        age: age,
        numberOfToes: numberOfToes
    };
}

console.log(createPerson('Bob', 10, 2));


function Cube(sideLength) {
    this.sideLength = sideLength;
    this.calculateVolume = () => Math.pow(this.sideLength, 3);
    this.setSide = (len) => this.sideLength = len;
}

c = new Cube(5);
console.log(c.calculateVolume());
c.setSide(12);
console.log(c.calculateVolume());

function Machine() {
    this.isOn = false;
    this.turnOn = () => {
        if (this.isOn) {
            console.log("Machine is already on!");
        }
        else {
            console.log("Machine is on!");
            this.isOn = true;
        }
    }
    this.turnOff = () => {
        if (!this.isOn) {
            console.log("Machine is already off!");
            
        } else {
            console.log("Machine is off!");
            this.isOn = false;
        }
    }
    this.compute = (map) => {
        if (!this.isOn) {
            console.log("Machine must be on to run compute!");
        } else {
            const result = {};
            map.forEach((elem) => {
                let key = elem[0];
                let val = elem[1];
                result[key] = val;
            })
            return result;
        }
        
    }
};



m = new Machine();
console.log(m.__proto__);
m.turnOn();
m.turnOn();
m.turnOff();
m.turnOff();
m.turnOn();
console.log(m.compute([['name', 'John'], ['age', 5], ['wife', 'Jill']]));
console.log(m.compute([]));


function Pet() {
    let animal = 'Bear';
    this.type = 'Black';
    this.dangerous = true;
    this.age = 2;
    
    Object.defineProperty(this, 'animal', {
        get: function () {
            return animal;
        }
    });
}

p = new Pet();
console.log(p.animal);
p.animal = 'teddy';
console.log(p.animal);



function Human() {};

Human.prototype.eat = function() {
    console.log('Eating');
};
Human.prototype.sleep = function() {
    console.log('Sleeping');
};

function Child() {};
Child.prototype.cry = function() {
    console.log('Crying');
};
Child.prototype.drinkMilk = function() {
    console.log('Drinking');
};

Object.setPrototypeOf(Child.prototype, Human.prototype);

function Adult() {};
Adult.prototype.goToWork = function () {
    console.log("Going to work");
};
Adult.prototype.driveCar = function() {
    console.log('Driving');
};



class Observer {
    constructor() {
        this.eventMap = {}; //mapping from event name to set of functions
    }
    
    subscribe(func, eventName) {
        if (!this.eventMap.hasOwnProperty(eventName)) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push({name: func.name, f: func});
    }
    
    execute(eventName) {
        if (!this.eventMap.hasOwnProperty(eventName)) {
            throw Error(`event ${eventName} not recognized by observer`);
        }
        this.eventMap[eventName].forEach((func) => func.f());
    }
    
    unsubscribe(eventName, tokenOfFuncToBeRemoved) {
        if (!this.eventMap.hasOwnProperty(eventName)) {
            throw Error(`event ${eventName} not recognized by observer`);
        }
        let filtered = []
        for (let i = 0; i < this.eventMap[eventName].length; i++) {
            if (this.eventMap[eventName][i].name !== tokenOfFuncToBeRemoved) {
                filtered.push(this.eventMap[eventName][i]);
            }
        }
        this.eventMap[eventName] = filtered;
    }
}

const observer = new Observer();

const firstFunction = () => console.log('First Function!');
const secondFunction = () => console.log('Second Function!');
const thirdFunction = () => console.log('Third Function!');

const firstFuncToken = observer.subscribe(firstFunction, 'firstTwoFuncs');
const seconfFuncToken = observer.subscribe(secondFunction, 'firstTwoFuncs');

observer.subscribe(thirdFunction, 'thirdFunc');

observer.execute('firstTwoFuncs');
// First Function! Second Function!
observer.execute('thirdFunc');
// Third Function!

observer.unsubscribe('firstTwoFuncs', firstFuncToken);
observer.execute('firstTwoFuncs');
// Second Function!
