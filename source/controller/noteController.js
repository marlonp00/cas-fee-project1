import {noteDataService} from '../services/noteDataService.js'

export class NoteController {
	
	async showNotes(req, res) {
        console.log("SHOW NOTES");
        let state = {"state": "OK"};

        res.json(await noteDataService.all(state));
        
    };

    async getNote(req, res) {
        res.json(await noteDataService.all());
    };

    async createNote(req, res) {
        let createdDate = req.body.createdDate;
        let title = req.body.title;
        let text = req.body.text;
        let importance = req.body.importance;
        let dueDate = req.body.dueDate;
        let state = req.body.state;
        res.json(await noteDataService.add(dueDate, createdDate, title, text, importance, state));
    };

    async editNote(req, res) {
        let id = req.params.id;
        let dueDate = req.body.dueDate;
        let title = req.body.title;
        let text = req.body.text;
        let importance = req.body.importance;

        console.log(id, dueDate, title, text, importance);

        res.json(await noteDataService.update(id, dueDate, title, text, importance));
    }

    async showNote(req, res) {
        res.json(await noteDataService.get(req.params.id));
    };

    async deleteNote(req, res) {
        console.log("delete noteController");
        res.json(await noteDataService.delete(req.params.id));
    };
}

export const noteController = new NoteController();
