import Datastore from 'nedb-promise';
import {Note} from '../classes/note.js';


export class NoteDataService {

    constructor(db) {
		 this.db = db || new Datastore({filename: './data/notes.db', autoload: true});

	}
	
   async add(dueDate, createdDate, title, text, importance, state) {
    let note = new Note(dueDate, createdDate, title, text, importance, state);

        console.log("publicAddNote start");
       return await this.db.insert(note);

    }

    async update(id, dueDate, title, text, importance) {
        console.log(id, dueDate, title, text, importance);
        return await this.db.update({
            _id: id
        },
        {
            $set: {"duedate": dueDate, "title": title, "text": text, "importance": importance}
        },
        {});
    }

    async delete(id) {
        
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
       console.log("delete noteDataService", this.db);
        return await this.get({"state": "OK"});
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all(req) {
        console.log("Show all notes", req);

     
         let flex = this.db.find(req);
         console.log(flex);
     
        return await flex;
    }
}


export const noteDataService = new NoteDataService();


