module.exports = {
  friendlyName: 'Get Tests details',
  description: 'Get detail information about a Test.',
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
    },
    id: {
      example: 34567,
      description: 'ID of the StatusCake Test.',
      required: true
    },
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    success: {
      description: 'Returns information about a Test.',
    },
  },
  fn: function (inputs,exits) {
    var statuscake = require("statuscake");
    statuscake
      .username(inputs.statusCakeUser)
      .key(inputs.apiKey)
      .testsDetails(inputs.id, function (err, data) {
        if (err) return exits.error(err);
        return exits.success(data);
      });
  },
};
