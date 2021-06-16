import {noteService} from '../services/note-service.js';

// *** ----------------------------------------------------------------- *** //
// *** --- RENDER NOTES ----------------------------------------------- *** //

export class noteController {
    constructor() {
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
        this.contentContainer = document.getElementById('content-wrapper');
        console.log("Lutsch");

    }

    showNotes() {
        this.contentContainer.innerHTML = this.noteTemplateCompiled(
            {notes: noteService.notes},
            {allowProtoPropertiesByDefault: true});
            console.log(this.contentContainer);

    }

    renderNotesView() {
        noteService.getDummyNotes();
        this.showNotes();
    }

    initialize() { 
        this.renderNotesView();
        console.log("lutsch4");
    }

}


    // create one-and-only instance
new noteController().initialize();