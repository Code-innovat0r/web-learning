// let animal = {
//     eat: true,
//     drink: true,
//     walk: false
// }

// let kangaroo = {
//     jump: true
// }

// /* now kangaroo have the property of animal also so be can use prototype to combine this with each other and kangaroo inhert the propert of the animal*/

// kangaroo.__proto__ = animal;  //sets kangaroo.[[Prototype]] = animal


class animal{
    constructor(name){            //invole when the class object is created
        this.name = name
        console.log("object is created")
    }
    jump(){
        console.log(`Yes, ${this.name} can jump`)
    }
    eat(){
        console.log(`Yes, ${this.name} can eat`)
    }
    walk(){
        console.log(`Yes, ${this.name} can walk`)
    }
}

class Lion extends animal{   //lion inherit animal class also
    constructor(name){
        super(name) // you have to call the constructor of inherited class by supplying the required parameter before doing else
        this.name = name;
        console.log("Object of lion class is created")
    }

    roar(){
        console.log(`Yes, ${this.name} can roar`)
    }
    
    /* overriding the eat method of the inherited class */
    eat(){ //if you call this method with this class object it will invoke instead of inherited one
        super.eat() //super is a keyword use to run the method of inherited class
        console.log(`but, ${this.name} is a carnivorus`)
    }

}

let a = new Lion("lion");


/* using the getter and setter */

class getset{
    constructor(name){
        this._name = name;
        console.log("I am the getset class")
    }

    get name(){
        return this._name
    }
    set name(value){
        console.log(typeof(value))
        if(typeof(value)=='string' && value.length>4){
            this._name = value
        }
        else{
            console.log("Name must be a string and greater than 4 character")
        }
    }
}

let obj = new getset("paras")
console.log(obj.name)  // invoke getter
obj.name = "kumar" // invoke setter
console.log(obj.name)
// obj.name("pandey")// wrong way to call setter

/* instanceof tell weather the object relate to class or not, return boolean  */

console.log(l instanceof Lion)