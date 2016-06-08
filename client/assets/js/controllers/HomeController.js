(function() {
  'use strict';

/**
 * @ngdoc function
 * @name boatlogApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the boatlogApp
 */
angular.module('boatlogApp')
  .controller('HomeController', function ($scope, $rootScope, UserLog, currentAuth, Ref) {

    $rootScope.pageTitle = 'Home';

    $scope.isLoggedIn = (currentAuth !== null);
    $scope.currentAuth = currentAuth;




    var log_import = [
      {
        "rundate": new Date("3/28/2015").getTime(),
        "section": "Staircase",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 135,
        "miles": 4.5,
        "flow": 1700,
        "notes": "R3 w/ Jerry & Ted, Miranda on cat"
      },
      {
        "rundate": new Date("4/18/2015").getTime(),
        "section": "Main Payette",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 80,
        "miles": 7,
        "flow": 1500,
        "notes": "Vinny's first trip. Adrianne's maiden voyage. Grammy rafting again"
      },
      {
        "rundate": new Date("5/4/2015").getTime(),
        "section": "Grand Canyon",
        "river": "Colorado",
        "numruns": 1,
        "days": 19,
        "vertical": 1917,
        "miles": 280,
        "flow": "9500-16500",
        "notes": 0
      },
      {
        "rundate": new Date("5/30/2015").getTime(),
        "section": "Grandjean",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 798,
        "miles": 20,
        "flow": 1500,
        "notes": "Brooke and I on cat. Fun flow. Kinda cloudy and cool. Lots of others on river. Went with Ben & Rob"
      },
      {
        "rundate": new Date("5/31/2015").getTime(),
        "section": "Cabarton",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 220,
        "miles": 10,
        "flow": 1800,
        "notes": "Brook'e first IK trip. Took Murphy - he was a PITA"
      },
      {
        "rundate": new Date("6/5/2015").getTime(),
        "section": "Hells Canyon",
        "river": "Snake",
        "numruns": 1,
        "days": 3,
        "vertical": 384,
        "miles": 32,
        "flow": 13000,
        "notes": "John Miller, Kelly Stultz, Roger & Anita, Tom Bolen, Tori, Jamie, Dave Brown, Chris Gerono, Kurt"
      },
      {
        "rundate": new Date("6/9/2015").getTime(),
        "section": "NF Lower 5",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 474,
        "miles": 5,
        "flow": 1700,
        "notes": "Ben, Matt Steer. Adjust oars, boat felt great."
      },
      {
        "rundate": new Date("6/13/2015").getTime(),
        "section": "SF Salmon",
        "river": "Salmon",
        "numruns": 1,
        "days": 3,
        "vertical": 1655,
        "miles": 59,
        "flow": 2.8,
        "notes": "Jerry, Ben, Jesse"
      },
      {
        "rundate": new Date("6/20/2015").getTime(),
        "section": "Staircase",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 135,
        "miles": 4.5,
        "flow": 1300,
        "notes": "R2 w/Miranda, Rob & Val on cat"
      },
      {
        "rundate": new Date("6/21/2015").getTime(),
        "section": "SF Payette Canyon",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 390,
        "miles": 10,
        "flow": 1000,
        "notes": "R5 w/Drew, Emily, Matt & Merideth Steers. Craig Godson on cat"
      },
      {
        "rundate": new Date("6/22/2015").getTime(),
        "section": "Main Payette",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 80,
        "miles": 7,
        "flow": 3300,
        "notes": "Work trip - Scott, Jensen, Wes, Katrina, Mike Wabst"
      },
      {
        "rundate": new Date("6/26/2015").getTime(),
        "section": "Cabarton",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 220,
        "miles": 10,
        "flow": 1800,
        "notes": "Tevedal Reunion Float"
      },
      {
        "rundate": new Date("6/28/2015").getTime(),
        "section": "Staircase",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 135,
        "miles": 4.5,
        "flow": 1300,
        "notes": "R2 w/Miranda, Adrianne's first staircase run"
      },
      {
        "rundate": new Date("7/1/2015").getTime(),
        "section": "NF Lower 5",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 474,
        "miles": 5,
        "flow": 1800,
        "notes": "Ben & I"
      },
      {
        "rundate": new Date("7/2/2015").getTime(),
        "section": "Main Payette",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 80,
        "miles": 7,
        "flow": 3100,
        "notes": "Moonlight float, Ted"
      },
      {
        "rundate": new Date("7/4/2015").getTime(),
        "section": "SF Payette Canyon",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 390,
        "miles": 10,
        "flow": 1100,
        "notes": "R2 w/Jerry"
      },
      {
        "rundate": new Date("7/16/2015").getTime(),
        "section": "NF Lower 5",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 474,
        "miles": 5,
        "flow": 2000,
        "notes": 0
      },
      {
        "rundate": new Date("7/19/2015").getTime(),
        "section": "Cabarton",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 220,
        "miles": 10,
        "flow": 2000,
        "notes": 0
      },
      {
        "rundate": new Date("7/25/2015").getTime(),
        "section": "Staircase+Main",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 245,
        "miles": 14,
        "flow": 0,
        "notes": 0
      },
      {
        "rundate": new Date("8/1/2015").getTime(),
        "section": "SF Payette Canyon",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 390,
        "miles": 10,
        "flow": 1150,
        "notes": "Sam, JP, Trish Cramer, Miranda, R5, Ted, Shaun, Miller, Kurt, Matt"
      },
      {
        "rundate": new Date("8/2/2015").getTime(),
        "section": "NF Lower 5",
        "river": "Payette",
        "numruns": 2,
        "days": 1,
        "vertical": 948,
        "miles": 10,
        "flow": 1960,
        "notes": "Steve Rich"
      },
      {
        "rundate": new Date("8/8/2015").getTime(),
        "section": "SF Payette Canyon",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 390,
        "miles": 10,
        "flow": 1150,
        "notes": "R2 w/Miranda, ted in IK, Deb in cat"
      },
      {
        "rundate": new Date("8/15/2015").getTime(),
        "section": "Staircase+Main",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 245,
        "miles": 14,
        "flow": 0,
        "notes": "Anna & Dan"
      },
      {
        "rundate": new Date("8/17/2015").getTime(),
        "section": "Main Payette",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 80,
        "miles": 7,
        "flow": 3100,
        "notes": "FED (Scott, Wes, Adam, Philip)"
      },
      {
        "rundate": new Date("8/29/2015").getTime(),
        "section": "Cabarton",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 220,
        "miles": 10,
        "flow": 1200,
        "notes": "Dayna, Bill, Vince, Lucy, Adrianne, Jake, Anne, Gary, Carly"
      },
      {
        "rundate": new Date("9/6/2015").getTime(),
        "section": "NF Middle 6",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 577,
        "miles": 6,
        "flow": 1250,
        "notes": 0
      },
      {
        "rundate": new Date("9/7/2015").getTime(),
        "section": "NF Middle 6 / Lower 7",
        "river": "Payette",
        "numruns": 2,
        "days": 1,
        "vertical": 1274,
        "miles": 13,
        "flow": 1250,
        "notes": 0
      },
      {
        "rundate": new Date("9/8/2015").getTime(),
        "section": "NF Lower 7",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 697,
        "miles": 7,
        "flow": 1250,
        "notes": 0
      },
      {
        "rundate": new Date("9/10/2015").getTime(),
        "section": "NF Middle 3",
        "river": "Payette",
        "numruns": 1,
        "days": 1,
        "vertical": 322,
        "miles": 2.3,
        "flow": 1140,
        "notes": "Slide to Pect. Ben, Kris & Luke Henthron. Luke's 1st on these rapids."
      },
      {
        "rundate": new Date("9/13/2015").getTime(),
        "section": "Middle Fork",
        "river": "Salmon",
        "numruns": 1,
        "days": 8,
        "vertical": 2865,
        "miles": 100,
        "flow": "1.42-1.76",
        "notes": 0
      },
      {
        "rundate": new Date("10/16/2015").getTime(),
        "section": "Rogue Wild and Scenic",
        "river": "Rogue",
        "numruns": 1,
        "days": 4,
        "vertical": 460,
        "miles": 34,
        "flow": 0,
        "notes": 0
      }
    ];

    if ($scope.isLoggedIn) {
      var log = new UserLog(currentAuth.uid);

      log.$loaded(function(runs) {
        $scope.runs = runs.getLast(5);
        $scope.totals = runs.getTotals();
      });


      _.each(log_import, function(logentry) {

        //log.$add(logentry);

      });


    }



  });

  })();
