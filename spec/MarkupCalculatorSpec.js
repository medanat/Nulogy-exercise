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


  describe("base price", function () {

    it("should not throw an error when given valid base price", function () {
      var input = {
            basePrice: 100
          },
          calculation = function () {
            return markupCalculator.calculate(input);
          };

      expect(calculation).not.toThrowError("invalid base price");
    });

    it("should throw an error when given invalid base price", function () {
      var input = {
            basePrice: -100
          },
          calculation = function () {
            return markupCalculator.calculate(input);
          };

      expect(calculation).toThrowError("invalid base price");
    });

    it("should default base price to zero when not given a base price parameter", function () {
      var input = {},
          result = markupCalculator.calculate(input);

      expect(result).toEqual(0);
    });
  });


  describe("flat markup", function () {

    it("should calculate the flat markup correctly when given valid input", function () {
      var result = markupCalculator.calculateFlatMarkup(100);

      expect(result).toEqual(105);
    });
  });


  describe("people markup", function () {

    it("should not throw an error when given valid people number", function () {
      var input = {
            people: 1
          },
          calculation = function () {
            return markupCalculator.calculatePeopleMarkup(input);
          };

      expect(calculation).not.toThrowError("invalid people number");
    });

    it("should throw an error when given invalid people number", function () {
      var input = {
            people: -3
          },
          calculation = function () {
            return markupCalculator.calculatePeopleMarkup(input);
          };

      expect(calculation).toThrowError("invalid people number");
    });

    it("should calculate the people markup correctly when given valid input", function () {
      var result = markupCalculator.calculatePeopleMarkup(100, 2);

      expect(result).toEqual(102.4);
    });
  });


  describe("category", function () {

  });
});
