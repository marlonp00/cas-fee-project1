import {Note} from '../classes/note.js';

export class NoteService {
  constructor() {
      this.notes = [];
  }

  getDummyNotes() {
    let dummydata = [];

    let note1 = new Note(1, '27.06.2021', '11.04.2021', 'geschenk übergeben', 'Lorem ipsum bla');

    dummydata.push(note1.toJSON());
    this.notes = dummydata;
  }

  showNote(id) {
    // URL routes /notes/:id/
    // http:localhost:3000/notes/asdaASDfaxdf

    var response = "JSON";
    var convertedNote = response.ToObject();

    return convertedNote;
  }

  addNote(id, duedate, created, title, text) {
      const note = new Note(id, duedate, created, title, text);
      this.notes.push(note);
      return note;

  }  
}

export const noteService = new NoteService();
