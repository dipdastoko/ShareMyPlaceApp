import { Modal } from "./UI/Modal";

class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler);
    adressForm.addEventListener("submit", this.findAdressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Geolocation feature is not available in your browser - please use a more modern browser or manually enter an address"
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location please wait"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
        modal.hide();
        alert(
          "Could not locate you manually, Pleease enter your address manually"
        );
      }
    );
  }
  findAdressHandler() {}
}

const placeFinder = new PlaceFinder();
