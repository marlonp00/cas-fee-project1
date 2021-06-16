import Datastore from 'nedb-promise';
import {Note} from '../classes/note';


export class NoteDataService {

    constructor(db) {
		 this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
	}
	
   async add(dueDate, created, title, text, callback) {
        console.log("publicAddNote start");
        let note = new Note(dueDate, created, title, text);
       return await this.db.insert(note, function (err, newDoc) {
            console.log("Note inserted!");
            if (callback) {
                callback(err, newDoc);
            }
        });
        console.log("publicAddNote end");
    }


    async delete(id, currentNote) {
        await this.db.update({_id: id, dueDate: currentNote}, {$set: {"state": "DELETED"}});
        return await this.get(id, currentNote);
    }

    async get(id, currentNote) {
        return await this.db.findOne({_id: id, orderedBy : currentNote});
    }

    async all(currentNote) {
        return await this.db.cfind({orderedBy : currentNote}).sort({ orderDate: -1 }).exec();
    }
}


export const noteDataService = new NoteDataService();


/*////////////////////*/

import Datastore from 'nedb-promise'

export class Order {
    constructor(pizzaName, orderedBy) {
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}

export class OrderStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/orders.db', autoload: true});
    }

    async add(pizzaName, orderedBy) {
        let order = new Order(pizzaName, orderedBy);
        return await this.db.insert(order);
    }

    async delete(id, currentUser) {
        await this.db.update({_id: id, orderedBy: currentUser}, {$set: {"state": "DELETED"}});
        return await this.get(id, currentUser);
    }

    async get(id, currentUser) {
        return await this.db.findOne({_id: id, orderedBy : currentUser});
    }

    async all(currentUser) {
        return await this.db.cfind({orderedBy : currentUser}).sort({ orderDate: -1 }).exec();
    }
}

export const orderStore = new OrderStore();
