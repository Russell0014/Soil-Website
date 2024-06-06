const db = require("../database");
const { validateUserID } = require("../utils/users");
const {
  getSingleProduct,
  create,
  delete: deleteProduct,
} = require("../controllers/review.controller");

// don't query the db during unit tests, we'll refer to the mock review table below
jest.mock("../database");
jest.mock("../utils/users.js");

// mock reviews table
const mockReviewTable = [
  {
    user_id: 7,
    product_id: 4,
    title: "Awesome product",
    description: "Very tasty product would buy again.",
    stars: 5,
    review_created: "2024-05-30T11:58:03.000Z", // fake date
    User: {
      username: "user1@email.com", // fake username from user table
    },
  },
  {
    user_id: 9,
    product_id: 19,
    title: "Product was rotten",
    description:
      "Product was rotten when I purchased it, 'organic and fresh' is misleading.",
    stars: 1,
    review_created: "2024-05-29T11:58:03.000Z", // fake date
    User: {
      username: "user2@email.com", // fake username from user table
    },
  },
];

const mockRequestBodyProduct = [
  // valid review request
  {
    user_id: 7,
    product_id: 4,
    title: "Awesome product",
    description: "Very tasty product would buy again.",
    stars: 5,
  },
];

const mockRequestQueryProduct = [
  {
    user_id: 7,
    product_id: 4,
  },
  {
    user_id: 9,
    product_id: 19,
  },
];

module.exports = () => {
  describe("Test 'review/' route", () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
      mockRequest = {
        body: {},
        query: {},
      };

      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    describe("1. Creating a product review, test POST method", () => {
      test("Valid user adds new product review", async () => {
        // fake body req, valid review request
        mockRequest.body = mockRequestBodyProduct.at(0);

        // fake returns
        db.users.findOne.mockImplementation(() => {
          return { user_id: mockRequestQueryProduct.at(0).user_id };
        });
        // not real return below, however this would suffice for valid return
        // return for this would be too long
        db.product.findByPk.mockImplementation(() => {
          return "some valid return";
        });
        db.review.findAll.mockImplementation(() => {
          return mockReviewTable.at(0);
        });
        db.review.create.mockImplementation(() => {});

        await create(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        // notify user that review was successfully created
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: `Success. user_id: ${
            mockReviewTable.at(0).user_id
          } has reviewed product_id: ${mockReviewTable.at(0).product_id}`,
        });
      });
    });

    describe("2. Deleting a product review, test DELETE method", () => {
      test("Valid user removes existing product review", async () => {
        // fake body req, valid query request
        mockRequest.query = mockRequestQueryProduct.at(1);

        // fake returns
        db.review.findOne.mockImplementation(() => {
          const review = {
            data: mockReviewTable.at(1),
            destroy: jest.fn(), // fake the destroy function in db
          };
          return review;
        });

        await deleteProduct(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        // notify user that review was successfully removed
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: `user_id: ${
            mockRequestQueryProduct.at(1).user_id
          } review for product_id: ${
            mockRequestQueryProduct.at(1).product_id
          } removed!`,
        });
      });
    });

    describe("3. Getting the existing review(s), test GET method", () => {
      test("Valid user adds new product review", async () => {
        // fake body req
        mockRequest.query = mockRequestQueryProduct.at(0);

        // fake return
        validateUserID.mockImplementation(() => false);

        db.review.findAll.mockImplementation(() => {
          return mockReviewTable.at(0);
        });
        await getSingleProduct(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        // return the updated review row
        expect(mockResponse.json).toHaveBeenCalledWith(mockReviewTable.at(0));
      });
    });
  });
};
