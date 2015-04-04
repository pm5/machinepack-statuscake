module.exports = {
  friendlyName: 'Get Tests',
  description: 'Get all Tests connected to your StatusCake account.',
  extendedDescription: '',
  moreInfoUrl: 'http://statuscake.com/api/Tests/Get%20All%20Tests.md',
  cacheable: true,
  inputs: {
    statusCakeUser: {
      example: 'mcavoy',
      description: 'The user ID of your StatusCake account,',
      required: true
    },
    apiKey: {
      example: 'phae6aesa5ohgh1vov7aeM7Kaec2eeca',
      description: 'Your StatusCake API key.',
      required: true,
      whereToGet: {
        url: 'https://www.statuscake.com/App/APIKey.php',
        description: 'Copy "Below is your API Key" from your dashboard.'
      },
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    wrongOrNotUser: {
      description: 'Invalid or unprovided API key or username. All calls must have a valid StatusCake API key and username.'
    },
    success: {
      description: 'Returns all your Tests.',
      example: [
        {
          TestID: 378573,
          Paused: false,
          TestType: 'HTTP',
          WebsiteName: 'node-statuscake test',
          ContactGroup: null,
          ContactID: 0,
          Public: 0,
          Status: 'Up',
          NormalisedResponse: 0,
          Uptime: 100
        }
      ]
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
        if (undefined !== data.ErrNo && 0 === data.ErrNo) {
          return exits.wrongOrNotUser(data.Error);
        }
        return exits.success(data);
      });
  },
};
