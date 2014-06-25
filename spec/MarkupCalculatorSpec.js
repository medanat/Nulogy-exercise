describe("MarkupCalculator", function () {
  var markupCalculator;

  beforeEach(function () {
    markupCalculator = new MarkupCalculator();
  });

  it("should return a result", function () {
    var input = {},
        result = markupCalculator.calculate(input);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
  });

});
