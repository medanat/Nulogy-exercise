function MarkupCalculator () {
  // Predefined flat markup on all jobs
  this.flatMarkup = 0.05;
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
      basePlusMarkup;

  if (basePrice < 0) {
    throw new Error("invalid base price");
  }

  basePlusMarkup = this.calculateFlatMarkup(basePrice);

  return basePlusMarkup;
};

MarkupCalculator.prototype.calculateFlatMarkup = function (basePrice) {
  return basePrice * (1 + this.flatMarkup);
};