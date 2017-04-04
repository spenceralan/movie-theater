// backend

class Movie {
  constructor(title, rating, isFirstRun, runTimes, baseTicketPrice) {
    this.title = title;
    this.rating = rating;
    this.isFirstRun = isFirstRun;
    this.runTimes = runTimes;
    this.tickets = new Ticket(baseTicketPrice);
  }

  genrateMovieTicketPrices(time){
    this.tickets.generatePrices(this.isMatinee(time), this.isFirstRun);
  }

  isMatinee(time){
    return time < 400;
  }

}

class Ticket {
  constructor(basePrice) {
    this.adult = basePrice;
    this.senior = basePrice;
    this.student = basePrice;
    this.child = basePrice;
  }

  generatePrices(isMatinee, isFirstRun){
    let multiplier = 1;
    isMatinee ? multiplier -=.1 : multiplier;
    isFirstRun ? multiplier += .1 : multiplier;

    this.adult = Math.floor(this.adult * multiplier);
    this.senior = Math.floor(this.senior * (multiplier - .2));
    this.student = Math.floor(this.student * (multiplier - .1));
    this.child = Math.floor(this.child * (multiplier - .4));

  }

  getPrice(ticketType){
    if(ticketType === "senior"){
      return this.senior;
    } else if (ticketType === "student") {
      return this.student;
    } else if (ticketType === "child") {
      return this.child;
    } else {
      return this.adult;
    }
  }
}

// frontend

let moviesArray = [
  ["Ghost in the Well", "PG13", true, [100, 500, 800], 15],
  ["Ha Ha Land", "PG", false, [100, 500, 800], 15],
  ["Beauty and the Hipster", "G", true, [100, 500, 800], 15],
  ["Free Range Senior Citizens", "R", false, [100, 500, 800], 15],];

let getMovie = function (movieTitle) {
  for(var i = 0; i<4;i++){
    if(movieTitle === moviesArray[i][0]){
      return moviesArray[i];
    }
  }
}

const checkoutDisplay = function(movieTitle){
  $("#showtimesDisplay").hide();
  $("#movieTitleDisplay").text(movieTitle);
  $("#checkoutDisplay").show();
}

const updatePrice = function(movieObject, selectionArray){
  let price = 0;
  price += movieObject.tickets.adult * selectionArray[0];
  price += movieObject.tickets.senior * selectionArray[1];
  price += movieObject.tickets.child * selectionArray[2];
  price += movieObject.tickets.student * selectionArray[3];
  return price;
}

$(document).ready(function(){

  $(".movieDisplay").click(function(){
    movieTitle = $(this).find("h3").text();
    checkoutDisplay(movieTitle);
    newMovieData = getMovie(movieTitle);
    let newMovie = new Movie(newMovieData[0], newMovieData[1], newMovieData[2], newMovieData[3], newMovieData[4]);

    $("#timeSelector").change(function(){
      timeValue = $("#timeSelector").val();
      newMovie.genrateMovieTicketPrices(Number(timeValue));
    });

    $(".ticketAge").change(function(){
      //calculate prices
      let selectionArray = [];
      $(".ticketAge").each(function(){
        selectionArray.push(Number($(this).val()));
      });
      //pass prices to updateTotal
      $("#totalPriceDisplay").text(`your cart total is: $${updatePrice(newMovie, selectionArray)}`);
    });



  });


});
