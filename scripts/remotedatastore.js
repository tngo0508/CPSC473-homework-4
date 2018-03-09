(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
    // $.ajax(this.serverUrl, {
    //   type: "POST",
    //   contentType: "application/json",
    //   data: JSON.stringify({
    //     "coffee": val.coffee,
    //     "emailAddress": val.emailAddress,
    //     "flavor": val.flavor,
    //     "id": val.id,
    //     "size": val.size,
    //     "strength": val.strength
    //   }),
    //   success: function(serverResponse) {
    //     console.log(serverResponse);
    //   },
    //   error: function(xhr) {
    //     alert(xhr.responseText);
    //   }
    // });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + "/" + key, {
      type: "DELETE"
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
