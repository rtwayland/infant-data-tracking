angular.module('app')
    .service('NapService', function($firebaseObject, $firebaseArray, $q) {
        var root = firebase.database().ref('data');
        var naps = root.child('naps');
        var napData = $firebaseObject(naps);

        this.submitTime = function(entryObj) {
            var defer = $q.defer();

            napData.$loaded()
                .then(function() {
                    if (napData.data) {
                        var dataArray = $firebaseArray(naps.child('data'));
                        dataArray.$loaded()
                            .then(function() {
                                dataArray.$add(entryObj)
                                .then(function (ref) {
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
                        .then(function (ref) {
                          defer.resolve(ref);
                        });
                    }
                })
                .catch(function(err) {
                    console.error(err);
                });

                return defer.promise;
        };
    });
