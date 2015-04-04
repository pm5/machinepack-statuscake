module.exports = {
  friendlyName: 'Get Tests details',
  description: 'Get detail information about a Test.',
  extendedDescription: '',
  moreInfoUrl: 'http://statuscake.com/api/Tests/Get%20Detailed%20Test%20Data.md',
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
    wrongOrNotUser: {
      description: 'Invalid or unprovided API key or username. All calls must have a valid StatusCake API key and username.'
    },
    success: {
      description: 'Returns information about a Test.',
      example: {
        Method: 'GET',
        TestID: 378573,
        TestType: 'HTTP',
        Paused: false,
        WebsiteName: 'node-statuscake test',
        URI: 'https://www.npmjs.com/package/statuscake',
        ContactGroup: null,
        ContactID: 0,
        Status: 'Up',
        Tags: [ 'devel' ],
        Uptime: 0,
        CheckRate: 86400,
        Timeout: 40,
        LogoImage: '',
        Confirmation: '3',
        WebsiteHost: '',
        NodeLocations: [ '' ],
        FindString: '',
        DoNotFind: false,
        LastTested: '2015-04-03 10:39:20',
        NextLocation: 'UNSET',
        Processing: false,
        ProcessingState: 'Complete',
        ProcessingOn: 'PL1',
        DownTimes: '0',
        Sensitive: false
      }
    },
  },
  fn: function (inputs, exits) {
    var statuscake = require("statuscake");
    statuscake
      .username(inputs.statusCakeUser)
      .key(inputs.apiKey)
      .testsDetails(inputs.id, function (err, data) {
        if (err) return exits.error(err);
        if (undefined !== data.ErrNo && 0 === data.ErrNo) {
          return exits.wrongOrNotUser(data.Error);
        }
        return exits.success(data);
      });
  },
};
