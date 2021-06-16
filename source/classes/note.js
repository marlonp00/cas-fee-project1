// *** ----------------------------------------------------------------- *** //
// *** --- RENDER NOTES ----------------------------------------------- *** //

export class Note {

    constructor(duedate, created, title, text) {
      this.duedate = duedate;
      this.created = created;
      this.title = title;
      this.text = text;
      this.state = "OK";
  }
    // GETTER METHODS
    getDueDate = () => {
        return this.duedate;
    }
    getCreated = () => {
        return this.created;
    }
    getTitle = () => {
        return this.title;
    }
    getText = () => {
        return this.text;
    }
    getState = () => {
        return this.state;
    }
    
    // SETTER METHODS
    setDueDate = (date) => {
        this.date = date;
    }
    setCreated = (created) => {
        this.created = created;
    }
    setTitle = (title) => {
        this.title = title;
    }
    setText = (text) => {
        this.text = text;
    }
    setState = (setState) => {
        this.setState = setState;
    }

    toJSON() {
        return {
            date: this.date,
            created: this.created,
            title: this.title,
            text: this.text
        };
    }

}