import { Modal } from "./UI/Modal.js";
import { Map } from "./UI/Map.js";
import { FindMap } from "./Utility/Location.js";

// Map added successfully

class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    adressForm.addEventListener("submit", this.findAdressHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
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
        const coordsObj = { lat: successResult.coords.latitude };
        // console.log(coordsObj);
        const coordinates = [
          successResult.coords.longitude,
          successResult.coords.latitude,
        ];
        console.log(coordinates);
        // this.selectPlace(coordinates);
        this.selectPlace(coordinates);
      },
      (error) => {
        modal.hide();
        alert(
          "Could not locate you manually, Pleease enter your address manually"
        );
      }
    );
  }
  async findAdressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid adress entered - please try again");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location please wait"
    );
    modal.show();
    const findMap = new FindMap();
    if (address) {
      const result = await findMap.geocoderApi.forwardGeocode({
        query: address,
      });
      if (result.features.length > 0) {
        const firstFeature = result.features[0];
        const coordinates = firstFeature.geometry.coordinates;
        findMap.maps.flyTo({ center: coordinates, zoom: 15 });
        modal.hide();
      } else {
        modal.hide();
        alert("Address not found");
      }
    }
  }
}

const placeFinder = new PlaceFinder();
