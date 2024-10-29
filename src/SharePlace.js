class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler);
    adressForm.addEventListener("submit", this.findAdressHandler);
  }

  locateUserHandler() {}
  findAdressHandler() {}
}
