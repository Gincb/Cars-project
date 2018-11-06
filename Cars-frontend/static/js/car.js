class Car {
    constructor(_car) {
        this.id = this.getNewID();
        this.brand = _car.brand;
        this.model = _car.model;
        this.engine = _car.engine;
        this.price = _car.price;
        this.used = _car.used;
    }

    printInfo() {
        console.log('This car is ${this.brand} ')
    }

    getNewID() {
        let newID = 0;
        for (let i = 1; i < 10000000000; i++) {

            let existingCar = CARS.find(function(x) {
                return x.id === i;
            });

            if (typeof existingCar === 'undefined') {
                //found
                newID = i;
                break;
            }
        }
        return newID;
    }
}