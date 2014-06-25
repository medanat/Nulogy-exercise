function MarkupCalculator () {
  // Predefined flat markup on all jobs
  this.flatMarkup = 0.05;
  // Predefined markup per person on a job
  this.peopleMarkup = 0.012;
  // Predefined markup for specific categories
  this.categoryMarkupsMap = {
    drugs: 0.075,
    food: 0.13,
    electronics: 0.02
  };
}

/**
 * Calculate cost of a packaging job
 *   @param {object} options:
 *     basePrice {float} - defaults to 0
 *     people {integer} - defaults to 1
 *     category {string} - optional
 *   @return {float|integer}
 */
MarkupCalculator.prototype.calculate = function (options) {
  var basePrice = options.basePrice || 0,
      people = options.people || 1,
      category = options.category,
      basePlusFlat = 0,
      total = 0;

  validateBasePrice(basePrice);
  basePlusFlat = basePrice + this.calculateFlatMarkup(basePrice);
  total += basePlusFlat;
  total += this.calculatePeopleMarkup(basePlusFlat, people);
  total += this.calculateCategoryMarkup(basePlusFlat, category);

  return roundToTwoDecimalPlaces(total);
};

/**
 * Calculate flat markup price based on base price
 *   @param {integer} basePrice
 *   @return {float|integer}
 */
MarkupCalculator.prototype.calculateFlatMarkup = function (basePrice) {
  return basePrice * this.flatMarkup;
};

/**
 * Calculate people markup price based on (base price + flat markup)
 * and number of people
 *   @param {float} basePlusFlat
 *   @param {integer} people
 *   @return {float|integer}
 */
MarkupCalculator.prototype.calculatePeopleMarkup = function (basePlusFlat, people) {
  if (people < 1) {
    throw new Error("invalid people number");
  }

  return basePlusFlat * (people * this.peopleMarkup);
};


/**
 * Calculate category markup price based on (base price + flat markup)
 * and category type
 *   @param {float} basePlusFlat
 *   @param {string} category
 *   @return {float|integer}
 */
MarkupCalculator.prototype.calculateCategoryMarkup = function (basePlusFlat, category) {
  var markup = this.categoryMarkupsMap[category] || 0;

  return basePlusFlat * markup;
};



/**
 * Validate base price is a positive float or zero
 *   @param {float} basePrice
 */
function validateBasePrice (basePrice) {
  if (basePrice < 0) {
    throw new Error("invalid base price");
  }
}


/**
 * Round a number to two decimal places
 *   @param {float} number
 *   @return {float|integer}
 */
function roundToTwoDecimalPlaces (number) {
  return parseFloat(number.toFixed(2));
}