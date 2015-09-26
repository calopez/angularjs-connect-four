/**
 * PollingService service provides functions to perform HTTP polling requests (simulate server PUSH)
 *
 * @module myapp
 *
 * @requires $interval
 * @requires $timeout
 *
 * @author Carlos A. Lopez <karloslopez@me.com>
 *
 * @returns instance of the PollingService service
 *
 */

define([], function () {
    'use strict';

    var PollingService = function ($rootScope, $interval) {

        /**
         * Allow perform HTTP polling request (simulate server PUSH)
         * @constructor
         * @param   {$scope}  controller $scope
         * @returns {object}
         */
        this.Polling = function (scope) {

            var defaultPollingTime = 10000,
                polls = {},
                poller,
                messageId,
                status = {
                    STARTING: 'starting',
                    POLLING: 'polling',
                    CANCELED: 'canceled'
                };

            var Poll = {
                pstatus: status.STARTING,
                startPolling: function (msgId, promise, pollingTime) {
                    messageId = msgId;
                    var self = this;

                    if (polls[msgId] === undefined) {

                        poller = function () {

                            self.pstatus = status.POLLING;

                            promise().then(function (response) {
                                $rootScope.$broadcast(msgId,  response );
                            });
                        };

                        poller();
                        polls[msgId] = $interval(poller, pollingTime || defaultPollingTime);

                        scope.$on('$destroy', function () {
                            // Make sure that the interval is destroyed too
                            console.info('destroying polling');
                            $interval.cancel(polls[msgId]);
                            self.pstatus = status.CANCELED;

                        });
                    }

                },
                stopPolling: function () {
                    $interval.cancel(polls[messageId]);
                }

            };

            return Object.create(Poll);
        };

    };

    PollingService.$inject = ['$rootScope', '$interval'];

    return PollingService;

});
