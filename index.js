$("#accesscookies").click(() => {
    var pElement = $(".cookiedata");
    if (pElement.children().length > 0){ //checks to see <p> with class of cookiedata has text
        pElement.empty(); //if it does remove it
    } else {
        $.ajax({
        url: "http://localhost:8000/api/cookies",
         method: 'GET',
        success: function(data) { //The forEach() method is used to loop through the array of data
        data.forEach(function(index) { //index represents each element of the data -> the loop uses index to access the properties of each element 
          var storeName = "Caramel Dreams";  
          if (index.store_name === storeName) { 
            var cookiesName = index.name;
            console.log(cookiesName)
            pElement.append(`<p> ${cookiesName} </p>`);
          }
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
    }
  });

$("#accesscookies2").click(() => {
    var pElement = $(".cookiedata2");
    if (pElement.children().length > 0){ 
        pElement.empty(); 
    } else {
        $.ajax({
        url: "http://localhost:8000/api/cookies",
         method: 'GET',
        success: function(data) {
        data.forEach(function(index) { 
          var storeName = "CookieMunsters";   
          if (index.store_name === storeName) { 
            var cookiesName = index.name;
            console.log(cookiesName)
            pElement.append(`<p> ${cookiesName} </p>`);
          }
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
    }
  });

$("#accesscookies3").click(() => {
    var pElement = $(".cookiedata3");
    if (pElement.children().length > 0){ 
        pElement.empty(); 
    } else {
        $.ajax({
        url: "http://localhost:8000/api/cookies",
         method: 'GET',
        success: function(data) {
        data.forEach(function(index) { 
          var storeName = "Cookie Times";  
          if (index.store_name === storeName) { 
            var cookiesName = index.name;
            console.log(cookiesName)
            pElement.append(`<p> ${cookiesName} </p>`);
          }
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
    }
  });

  $("#accesscookies4").click(() => {
    var pElement = $(".cookiedata4");
    if (pElement.children().length > 0){ 
        pElement.empty(); 
    } else {
        $.ajax({
        url: "http://localhost:8000/api/cookies",
         method: 'GET',
        success: function(data) {
        data.forEach(function(index) { 
          var storeName = "Crumblesville";   
          if (index.store_name === storeName) { 
            var cookiesName = index.name;
            console.log(cookiesName)
            pElement.append(`<p> ${cookiesName} </p>`);
          }
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
    }
  });

  $("#accesscookies5").click(() => {
    var pElement = $(".cookiedata5");
    if (pElement.children().length > 0){ 
        pElement.empty(); 
    } else {
        $.ajax({
        url: "http://localhost:8000/api/cookies",
         method: 'GET',
        success: function(data) {
        data.forEach(function(index) { 
          var storeName = "Tasty Pastries";  
          if (index.store_name === storeName) { 
            var cookiesName = index.name;
            console.log(cookiesName)
            pElement.append(`<p> ${cookiesName} </p>`);
          }
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
    }
  });

  $("#glutenfreeinfo").click(() => {
    var pElement = $(".glutenfree");
    if (pElement.children().length > 0){ 
        pElement.empty(); 
    } else {
        $.ajax({
        url: "http://localhost:8000/api/cookies",
         method: 'GET',
        success: function(data) { 
        data.forEach(function(index) { 
          var glutenInfo = true;  
          if (index.gluten_free === glutenInfo) { 
            var cookiesName = index.name;
            console.log(cookiesName)
            pElement.append(`<p> ${cookiesName} </p>`);
          }
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
    }
  });