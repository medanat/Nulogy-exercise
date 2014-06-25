function MarkupCalculator () {
  // Predefined flat markup on all jobs
  this.flatMarkup = 0.05;
  // Predefined markup per person on a job
  this.peopleMarkup = 0.012;
}

/**
 * Calculate cost of a packaging job
 *   @param {object} options:
 *     basePrice {float} - defaults to 0
 *     people {integer} - defaults to 1
 *     category {string} - optional
 *
 */
MarkupCalculator.prototype.calculate = function (options) {
  var basePrice = options.basePrice || 0,
      people = options.people || 1,
      basePlusMarkup;

  if (basePrice < 0) {
    throw new Error("invalid base price");
  }

  basePlusFlat = basePrice + this.calculateFlatMarkup(basePrice);

  return basePlusFlat + this.calculatePeopleMarkup(basePlusFlat, people);
};

/**
 * Calculate flat markup price based on base price
 *   @param {integer} basePrice
 */
MarkupCalculator.prototype.calculateFlatMarkup = function (basePrice) {
  return basePrice * this.flatMarkup;
};

/**
 * Calculate people markup price based on (base price + flat markup)
 * and number of people
 *   @param {integer} basePlusFlat
 *   @param {integer} people
 */
MarkupCalculator.prototype.calculatePeopleMarkup = function (basePlusFlat, people) {
  if (people < 1) {
    throw new Error("invalid people number");
  }

  return basePlusFlat * (people * this.peopleMarkup);
};