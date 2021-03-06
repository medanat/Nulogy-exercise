describe("MarkupCalculator", function () {
  var markupCalculator;

  beforeEach(function () {
    markupCalculator = new MarkupCalculator();
  });


  describe("base price", function () {

    it("should not throw an error when given valid base price", function () {
      var calculation = function () {
            return markupCalculator.validateBasePrice(100);
          };

      expect(calculation).not.toThrowError("invalid base price");
    });

    it("should throw an error when given invalid base price", function () {
      var calculation = function () {
            return markupCalculator.validateBasePrice(-100);
          };

      expect(calculation).toThrowError("invalid base price");
    });
  });


  describe("flat markup", function () {

    it("should return a result", function () {
      var result = markupCalculator.calculateFlatMarkup(1);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
    });

    it("should calculate the flat markup correctly for positive integers", function () {
      var result = markupCalculator.calculateFlatMarkup(100);

      expect(result).toEqual(5);
    });

    it("should calculate the flat markup correctly for value zero", function () {
      var result = markupCalculator.calculateFlatMarkup(0);

      expect(result).toEqual(0);
    });

    it("should return NaN when no parameters are passed", function () {
      var result = markupCalculator.calculateFlatMarkup();

      expect(result).toEqual(NaN);
    });
  });


  describe("people markup", function () {

    it("should return a result", function () {
      var result = markupCalculator.calculatePeopleMarkup(1, 1);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
    });

    it("should not throw an error when given valid people number", function () {
      var calculation = function () {
            return markupCalculator.calculatePeopleMarkup(100, 1);
          };

      expect(calculation).not.toThrowError("invalid people number");
    });

    it("should throw an error when given invalid people number", function () {
      var calculation = function () {
            return markupCalculator.calculatePeopleMarkup(100, -3);
          };

      expect(calculation).toThrowError("invalid people number");
    });

    it("should calculate the people markup correctly when given valid input", function () {
      var result = markupCalculator.calculatePeopleMarkup(100, 2);

      expect(result).toEqual(2.4);
    });

    it("should return NaN when no parameters are passed", function () {
      var result = markupCalculator.calculatePeopleMarkup();

      expect(result).toEqual(NaN);
    });
  });


  describe("category markup", function () {

    it("should return a result", function () {
      var result = markupCalculator.calculateCategoryMarkup(1, 'abc');

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
    });

    it("should calculate the category markup correctly for pharmaceuticals", function () {
      var result = markupCalculator.calculateCategoryMarkup(100, 'drugs');

      expect(result).toEqual(7.5);
    });

    it("should calculate the category markup correctly for food", function () {
      var result = markupCalculator.calculateCategoryMarkup(100, 'food');

      expect(result).toEqual(13);
    });

    it("should calculate the category markup correctly for electronics", function () {
      var result = markupCalculator.calculateCategoryMarkup(100, 'electronics');

      expect(result).toEqual(2);
    });

    it("should calculate the category markup correctly for non-marked up categories", function () {
      var result = markupCalculator.calculateCategoryMarkup(100, 'books');

      expect(result).toEqual(0);
    });

    it("should calculate the category markup correctly when no category is provided", function () {
      var result = markupCalculator.calculateCategoryMarkup(100);

      expect(result).toEqual(0);
    });

    it("should return NaN when no parameters are passed", function () {
      var result = markupCalculator.calculateCategoryMarkup();

      expect(result).toEqual(NaN);
    });
  });


  describe("calculate total markup", function () {

    it("should return a result", function () {
      var input = {},
          result = markupCalculator.calculate(input);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
    });

    it("should return a correct result of zero when not given any parameters", function () {
      var input = {},
          result = markupCalculator.calculate(input);

      expect(result).toEqual(0);
    });


    it("should return a correct result and default to 1 person when only given base price and no category specified", function () {
      var input = {
            basePrice: 1000
          },
          result = markupCalculator.calculate(input);

      expect(result).toEqual(1062.6);
    });

    it("should return a correct result and default to 1 person when only given base price and a marked up category", function () {
      var input = {
            basePrice: 1000,
            category: 'electronics'
          },
          result = markupCalculator.calculate(input);

      expect(result).toEqual(1083.6);
    });

    it("should return a correct result for values: $1299.99, 3 people, food", function () {
      var input = {
            basePrice: 1299.99,
            people: 3,
            category: 'food'
          },
          result = markupCalculator.calculate(input);

      expect(result).toEqual(1591.58);
    });

    it("should return a correct result for values: $5432.00, 1 person, drugs", function () {
      var input = {
            basePrice: 5432.00,
            people: 1,
            category: 'drugs'
          },
          result = markupCalculator.calculate(input);

      expect(result).toEqual(6199.81);
    });

    it("should return a correct result for values: $12456.95, 4 people, books", function () {
      var input = {
            basePrice: 12456.95,
            people: 4,
            category: 'books'
          },
          result = markupCalculator.calculate(input);

      expect(result).toEqual(13707.63);
    });

    it("should throw an error when given invalid base price", function () {
      var input = {
            basePrice: -100,
            people: 1,
            category: 'food'
          },
          calculation = function () {
            return markupCalculator.calculate(input);
          };

      expect(calculation).toThrowError("invalid base price");
    });

    it("should throw an error when given invalid people number", function () {
      var input = {
            basePrice: 100,
            people: -12,
            category: 'food'
          },
          calculation = function () {
            return markupCalculator.calculate(input);
          };

      expect(calculation).toThrowError("invalid people number");
    });
  });
});
