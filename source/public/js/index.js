// *** ----------------------------------------------------------------- *** //
// *** --- THEME LOGIC ----------------------------------------------- *** //


let isLight = true;

class toggleTheme {

  constructor(themeMode){
    this.toggle = document.querySelector("#color-themes");
    this.themeMode = themeMode;
    this.root = document.body;

  }

  initEventHandlers() {
    this.toggle.addEventListener('change', (toggleEvent) => { 
      if(this.root.classList.contains("light-theme")) {
        this.root.classList.toggle("light-theme");
      }
       else {
        this.root.classList.toggle("dark-theme");
       }
    });
  }

  changeTheme() {
    this.themeMode ? themeWhite = this.themeMode = themeDark : this.themeMode = themeWhite;
  }
  
  
}