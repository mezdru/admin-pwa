
export const queries = {
  funnel: {
    analysisType: 'funnel',
    steps: [
      {
        actorProperty: 'item.userEmitter',
        eventCollection: 'userAttached',
        timeframe: "this_14_years",
      },
      {
        actorProperty: 'item.userEmitter',
        eventCollection: 'profileCreated',
        timeframe: "this_14_years",
      },
      {
        actorProperty: 'item.userEmitter',
        eventCollection: 'profileCompleted',
        timeframe: "this_14_years",
      }
    ]
  },
  userActiveInOrg: {
    analysisType: 'count_unique',
    eventCollection: 'accessIn',
    targetProperty: 'item.userEmitter',
    timezone: 3600,
    interval: "every_7_days",
    timeframe: "this_7_weeks",
  },
  searchInOrg: {
    analysisType: 'count',
    eventCollection: 'search',
    timezone: 3600,
    interval: "every_7_days",
    timeframe: "this_7_weeks",
  },
  contactInOrg: {
    analysisType: 'count',
    eventCollection: 'contact',
    timezone: 3600,
    interval: "every_7_days",
    timeframe: "this_7_weeks",
  },
  profileView: {
    analysisType: 'count',
    eventCollection: 'view',
    timezone: 3600,
    interval: "every_7_days",
    timeframe: "this_7_weeks",
    filters: [{ "propertyName": "item.page", "operator": "eq", "propertyType": "String", "propertyValue": "profile" }],
  },
  pwaUsage: {
    analysisType: 'count',
    eventCollection: 'pwa-usage',
    timezone: 3600,
    interval: "every_7_days",
    timeframe: "this_7_weeks",
  },
  contactByType: {
    analysisType: 'count',
    eventCollection: 'contact',
    timeframe: "this_14_years",
    groupBy: ["item.type"],
  }
}