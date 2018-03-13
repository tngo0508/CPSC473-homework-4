(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order=form]";
  var CHECKLIST_SELECTOR = "[data-coffee-order=checklist]";
  var SERVER_URL = "http://localhost:2403/coffeeorders";
  // var SERVER_URL = "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders";
  var App = window.App;
  var Truck = App.Truck;
  // var Datastore = App.Datastore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var webshim = window.webshim;
  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  webshim.polyfill("forms forms-ext");
  webshim.setOptions("forms", {
    addValidators: true,
    lazyCustomMessages: true
  });

  remoteDS.getAll(function(coffeeorders) {
    coffeeorders.forEach(function(coffeeOrder) {
      checkList.addRow.call(checkList, coffeeOrder);
    });
  });
})(window);
