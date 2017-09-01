(function(window){

  var getFromEntry = utils.getFromEntry;

  function filterNeeds(entry) {
    return entry.are_supplies_needed || entry.are_volunteers_needed;
  }

  function cleanNeedsData(entry){
    var name = entry.location_name;
    var address = entry.location_address;
    var addressName = name + ', ' + address;

    return {
      address: address,
      lat: parseFloat(entry.latitude),
      lng: parseFloat(entry.longitude),
      name: name,
      phone: entry.contact_for_this_location_phone_number,
      tel: (entry.contact_for_this_location_phone_number || '').replace(/\D+/g, ''),
      supplyNeeds: utils.valueOrNone(entry.tell_us_about_the_supply_needs),
      volunteerNeeds: utils.valueOrNone(entry.tell_us_about_the_volunteer_needs),
      lastUpdated: entry.timestamp,
      key: _.kebabCase(addressName),
      previousKey: _.kebabCase(name),
      source: utils.textOrLink(entry.source)
    };
  }

  function getNeedsHelpers(){
    return {
      endpoint: 'needs',
      filter: filterNeeds,
      cleanData: cleanNeedsData
    };
  }

  window.getNeedsHelpers = getNeedsHelpers;

}(window));