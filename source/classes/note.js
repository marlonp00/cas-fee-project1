// *** ----------------------------------------------------------------- *** //
// *** --- RENDER NOTES ----------------------------------------------- *** //

export class Note {

    constructor(duedate, createdDate, title, text, importance, state) {
      this.duedate = duedate;
      this.createddate = createdDate;
      this.title = title;
      this.text = text;
	    this.importance = importance;
      this.state = "OK";
  }
}