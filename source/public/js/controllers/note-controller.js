import {noteService} from '../services/note-service.js';

// *** ----------------------------------------------------------------- *** //
// *** --- RENDER NOTES ----------------------------------------------- *** //

export class noteController {

    constructor() {
    
        this.contentContainer = document.getElementById('content-wrapper');

        this.title = document.querySelector("#title");
        this.description = document.querySelector("#description");
        this.importance = document.querySelector("important");
        this.duedate = document.querySelector("#duedate");
        this.cancelNote = document.querySelector("#cancelNote");
        this.newNote = document.querySelector("#newNote");
        this.createForm = document.getElementById("create-form");
        this.noteList= document.getElementById('note-list-template');
        this.createNoteButton = document.querySelector("#saveNote");

        this.editTitle = document.querySelector("#edit-title");
        this.editDescription = document.querySelector("#edit-description");
        this.editImportance = document.querySelector("edit-important");
        this.editDuedate = document.querySelector("#edit-duedate");
        this.editCancelNote = document.querySelector("#edit-cancelNote");
        this.editNewNote = document.querySelector("#edit-newNote");
        this.editForm = document.getElementById("edit-form");
        this.editSaveNoteButton = document.querySelector("#edit-saveNote");

        this.finishDateFilter = document.getElementById("finishDateFilter");
        this.createdDateFilter = document.getElementById("createdDateFilter");
        this.importanceFilter = document.getElementById("importanceFilter");

        this.toggle = document.getElementById("color-themes");
        this.root = document.body;


        this.noteTemplateCompiled = Handlebars.compile(this.noteList.innerHTML);


 // *** ----------------------------------------------------------------- *** //
// *** --- THEME LOGIC ----------------------------------------------- *** //
        if(this.cancelNote) {
            this.cancelNote.addEventListener('click', () => { 
                this.createForm.style.display = "none"; 
            });
        }

        if(this.editCancelNote) {
            this.editCancelNote.addEventListener('click', () => { 
                this.editForm.style.display = "none"; 
            });
        }

        this.toggle.addEventListener('change', () => { 
            if(this.root.classList.contains("light-theme")) {
                this.root.classList.toggle("dark-theme");
            } else {
                this.root.classList.toggle("light-theme");
            }
        });
  

        if(this.finishDateFilter) {
            this.finishDateFilter.addEventListener("click", async event => { 
                event.preventDefault();
                this.showNotesByFinishedDate();
            });
        }

        if(this.createdDateFilter) {
            this.createdDateFilter.addEventListener("click", async event => { 
                event.preventDefault();
                this.showNotesByCreatedDate();
            });
        }

        if(this.importanceFilter) {
            this.importanceFilter.addEventListener("click", async event => { 
                event.preventDefault();
                this.showNotesByImportance();
            });
        }

        if (this.editSaveNoteButton) {
            this.editSaveNoteButton.addEventListener("click", async event => { 
                event.preventDefault();
                
                let title = this.editTitle.value;
                let description = this.editDescription.value;
                let importance = 0;
                let dueDate = this.editDuedate.value;

                var radios = document.getElementsByName('editimportant');

                for (var i = 0, length = radios.length; i < length; i++) {
                    if (radios[i].checked) {
                        importance = radios[i].value;
                        break;
                    }
                }

                await noteService.editNote(this.editForm.dataset.id, dueDate, title, description, importance);
                this.renderNotesView();
                this.editForm.style.display = "none"; 
                this.clearEditForm();
            })
        }

        if (this.newNote) {
            this.newNote.addEventListener("click", event => { 
                this.createForm.style.display = "block"; 
                console.log("newnote");
            })
        }

        if (this.createNoteButton) {
            this.createNoteButton.addEventListener("click", async event => {
                event.preventDefault();
                this.createForm.style.display = "none"; 

                let title = this.title.value;
                let description = this.description.value;
                let importance = 0;
                let dueDate = this.duedate.value;
                let createdDate = moment().format("YYYY-MM-DD"); 

                var radios = document.getElementsByName('important');

                for (var i = 0, length = radios.length; i < length; i++) {
                    if (radios[i].checked) {
                        importance = radios[i].value;
                        break;
                    }
                }

                await noteService.createNote(dueDate, createdDate, title, description, importance, "OK");
                
                this.renderNotesView();   
                this.clearCreateForm(); 
            });
        }
    }

    
  

  



    async showNotesByFinishedDate(){
        let notes = await noteService.showNotes();
        let sorted = notes.sort((a, b) => {
            let fa = a.duedate.toLowerCase(),
                fb = b.duedate.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        
        this.contentContainer.innerHTML = this.noteTemplateCompiled({
            notes: sorted
        },
        {
            allowProtoPropertiesByDefault: true
        })

        this.addNotesListeners();
    }

    async showNotesByCreatedDate(){
        let notes = await noteService.showNotes();
        let sorted = notes.sort((a, b) => {
            let fa = a.createddate.toLowerCase(),
                fb = b.createddate.toLowerCase();
        
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        
        this.contentContainer.innerHTML = this.noteTemplateCompiled({
            notes: sorted
        },
        {
            allowProtoPropertiesByDefault: true
        })

        this.addNotesListeners();
    }

    async showNotesByImportance(){
        let notes = await noteService.showNotes();
        let sorted = notes.sort((a, b) => {
            return b.importance - a.importance;
        });

        console.log(sorted);
        
        this.contentContainer.innerHTML = this.noteTemplateCompiled({
            notes: sorted
        },
        {
            allowProtoPropertiesByDefault: true
        })

        this.addNotesListeners();
    }

    async showNotes() {
        console.log("shownotes erreicht");
        this.contentContainer.innerHTML = this.noteTemplateCompiled({
               notes: await noteService.showNotes()
            },
            {
                allowProtoPropertiesByDefault: true
            });

        this.addNotesListeners();
    }

    async showEditNote(id) {
        let noteJSON = await noteService.showNote(id);
        
        let duedate = noteJSON.duedate;
        let title = noteJSON.title;
        let text = noteJSON.text;
        let importance = noteJSON.importance;

        this.editTitle.value = title;
        this.editDescription.value = text;
        
        // Set radio buttons for importance
        var editRadios = document.getElementsByName('editimportant');
        for (let radio of editRadios) {
            if (radio.value === importance){
                radio.checked = true;
            }
        }
        
        this.editDuedate.value = duedate;
        this.editForm.dataset.id = id;
        
        // Displas edit form
        this.editForm.style.display = "block"; 
    }

    clearCreateForm() {
        this.title.value = "";
        this.description.value = "";
        let radios = document.getElementsByName('important');
        for (let radio of radios){
            radio.checked = false;
        }
        this.duedate.value = "";
    }

    clearEditForm() {
        this.editTitle.value = "";
        this.editDescription.value = "";
        let radios = document.getElementsByName('editimportant');
        for (let radio of radios){
            radio.checked = false;
        }
        this.editDuedate.value = "";
    }

    addNotesListeners() {
        let editNoteButtons = document.getElementsByClassName("edit-btn");
        let deleteNoteButtons = document.getElementsByClassName("delete-btn");

        for (let deleteNoteButton of deleteNoteButtons) {
            deleteNoteButton.addEventListener("click", event => { 
                event.preventDefault();
                let currentid = deleteNoteButton.dataset.id;
                noteService.deleteNote(currentid); 
                this.renderNotesView(); 
            });
        }

        for (let editNoteButton of editNoteButtons) {
            editNoteButton.addEventListener("click", event => { 
                event.preventDefault();
                let currentid = editNoteButton.dataset.id;
                this.showEditNote(currentid);
            });
        }
    }
        
    showNote() {
        this.contentContainer.innerHTML = this.noteTemplateCompiled({
                notes:  noteService.showNote(id)
            },
            {
                allowProtoPropertiesByDefault: true
            });

        console.log(this.contentContainer);
    }


    renderNotesView() {
        this.showNotes();
    }

    initialize() { 
        this.renderNotesView(); 
    }
}

// create one-and-only instance
new noteController().initialize();
