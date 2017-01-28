angular.module('app')
    .service('NapService', function($firebaseObject, $firebaseArray, $q, moment) {
        var root = firebase.database().ref('data');
        var naps = root.child('naps');
        var napData = $firebaseObject(naps);

        /***************** GET NAPS *****************/
        this.getNaps = function() {
            var defer = $q.defer();
            var dataArray = $firebaseArray(naps.child('data'));
            dataArray.$loaded()
                .then(function() {
                    var newArray = [];
                    for (var i = 0; i < dataArray.length; i++) {
                        var obj = {
                            duration: convertMsToMin(dataArray[i].duration),
                            timestamp: Date.parse(dataArray[i].timestamp)
                        }
                        newArray.push(obj);
                    }
                    defer.resolve(newArray);
                })
                .catch(function(err) {
                    console.log(err);
                });

            return defer.promise;
        };

        /***************** SUBMIT TIME *****************/
        this.submitTime = function(entryObj) {
            var defer = $q.defer();

            napData.$loaded()
                .then(function() {
                    if (napData.data) {
                        var dataArray = $firebaseArray(naps.child('data'));
                        dataArray.$loaded()
                            .then(function() {
                                dataArray.$add(entryObj)
                                    .then(function(ref) {
                                        defer.resolve(ref);
                                    });
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                    } else {
                        console.log('Naps obj not created');
                        napData.data = [];
                        napData.data.push(entryObj);
                        napData.$save()
                            .then(function(ref) {
                                defer.resolve(ref);
                            });
                    }
                })
                .catch(function(err) {
                    console.error(err);
                });

            return defer.promise;
        };

        function convertMsToMin(ms) {
            var duration = moment.duration(ms);
            var hours = duration.hours();
            var minutes = duration.minutes();

            if (hours && minutes) {
                return hours + ' hr ' + minutes + ' min';
            } else if (hours) {
                return hours + ' hr';
            } else if (minutes) {
                return minutes + ' min';
            } else {
                return '0';
            }
        }
    });
