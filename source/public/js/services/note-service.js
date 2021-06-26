import { httpService } from './http-service.js'

export class NoteService {

    async createNote(dueDate, createdDate, title, text, importance, state) {
        return await httpService.ajax("POST", "/notes/", { dueDate: dueDate, createdDate: createdDate,  title: title, text: text, importance: importance, state: state });
    }

    async editNote(id, dueDate, title, text, importance) {
        console.log('DATA BEFORE HTTPS REQUEST: ', id, dueDate, title, text, importance);
        return await httpService.ajax("POST", `/notes/${id}`, { dueDate: dueDate, title: title, text: text, importance: importance});
    }

    async showNotes() {
        return await httpService.ajax("GET", "/notes/", undefined);
    }

    async showNote(id) {
        return await httpService.ajax("GET", `/notes/${id}`, undefined);
    }

    async deleteNote(id) {
        console.log("hello delete", id);
        return await httpService.ajax("DELETE", `/notes/${id}`, undefined);
    }
}

export const noteService = new NoteService();
