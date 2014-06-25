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
      total = this.calculateFlatMarkup(basePrice);

  return total;
};

MarkupCalculator.prototype.calculateFlatMarkup = function (basePrice) {
  return basePrice;
};