import {noteDataService} from '../services/noteDataService.js'
import {SecurityUtil} from '../utils/security.js'

export class NotesController {

    async getNote(req, res) {
        res.json((await noteDataService.all(SecurityUtil.currentUser(req)) || []))
    };

    async createNote(req, res) {
        res.json(await noteDataService.add(req.body.name, SecurityUtil.currentUser(req)));
    };

    async showNote(req, res) {
        res.json(await noteDataService.get(req.params.id, SecurityUtil.currentUser(req)));
    };

    async deleteNote(req, res) {
        res.json(await noteDataService.delete(req.params.id, SecurityUtil.currentUser(req)));
    };
}

export const notesController = new NotesController();
