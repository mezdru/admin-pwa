
export const queries = {
  funnel: {
    savedQueryName: 'funnel',
  },
  userActiveInOrg: {
    savedQueryName: 'users-active---last-7-days',
  },
  searchInOrg: {
    savedQueryName: 'search_last7days',
  },
  contactInOrg: {
    savedQueryName: 'contacts-last-7-days',
  },
  contactByType: {
    analysisType: 'count',
    eventCollection: 'contact',
    timeframe: "this_7_days",
    groupBy: ["item.type"],
  }
}