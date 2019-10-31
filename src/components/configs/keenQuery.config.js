
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
    timeframe: "this_7_days",
    interval: 'daily',
  },
  searchInOrg: {
    analysisType: 'count',
    eventCollection: 'search',
    timeframe: "this_7_days",
    interval: 'daily',  
  },
  contactInOrg: {
      analysisType: 'count',
      eventCollection: 'contact',
      timeframe: "this_7_days",
      interval: 'daily',
  },
  contactByType: {
    analysisType: 'count',
    eventCollection: 'contact',
    timeframe: "this_7_days",
    groupBy: ["item.type"],
  }
}