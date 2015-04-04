module.exports = {
  friendlyName: 'Get All Tests',
  description: 'Get all Tests connected to your StatusCake account.',
  extendedDescription: '',
  inputs: {
    statusCakeUser: {
      example: 'mcavoy',
      description: 'The user ID of your StatusCake account,',
      required: true
    },
    apiKey: {
      example: 'phae6aesa5ohgh1vov7aeM7Kaec2eeca',
      description: 'Your StatusCake API key.',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    wrongOrNoKey: {
      description: 'Invalid or unprovided API key. All calls must have a key.'
    },
    success: {
      description: 'Returns all your Tests.',
      example: " [ { TestID: 378573, Paused: false, TestType: 'HTTP', WebsiteName: 'node-statuscake test', ContactGroup: null, ContactID: 0, Public: 0, Status: 'Up', NormalisedResponse: 0, Uptime: 100 } ]"
    },
  },
  fn: function (inputs, exits) {
    var statuscake = require("statuscake");
    statuscake
      .username(inputs.statusCakeUser)
      .key(inputs.apiKey)
      .tests(function (err, data) {
        if (err) {
          return exits.error(err);
        }
        return exits.success(data);
      });
  },
};
