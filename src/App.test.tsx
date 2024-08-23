import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("./utils/debouncer");

const searchPrompt = "searching for results";
const errorPrompt = "something went wrong";
const mockResponse = {
  products: [
    {
      id: 6,
      title: "Calvin Klein CK One",
      description:
        "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
      category: "fragrances",
      price: 49.99,
      discountPercentage: 0.32,
      rating: 4.85,
      stock: 17,
      tags: ["fragrances", "perfumes"],
      brand: "Calvin Klein",
      sku: "DZM2JQZE",
      weight: 5,
      dimensions: {
        width: 11.53,
        height: 14.44,
        depth: 6.81,
      },
      warrantyInformation: "5 year warranty",
      shippingInformation: "Ships overnight",
      availabilityStatus: "In Stock",
      reviews: [
        {
          rating: 5,
          comment: "Great value for money!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Sophia Brown",
          reviewerEmail: "sophia.brown@x.dummyjson.com",
        },
        {
          rating: 3,
          comment: "Very disappointed!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Madison Collins",
          reviewerEmail: "madison.collins@x.dummyjson.com",
        },
        {
          rating: 1,
          comment: "Poor quality!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Maya Reed",
          reviewerEmail: "maya.reed@x.dummyjson.com",
        },
      ],
      returnPolicy: "No return policy",
      minimumOrderQuantity: 20,
      meta: {
        createdAt: "2024-05-23T08:56:21.619Z",
        updatedAt: "2024-05-23T08:56:21.619Z",
        barcode: "2210136215089",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/3.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png",
    },
  ],
  total: 1,
  skip: 0,
  limit: 1,
};

test("shows loading", async () => {
  render(
    <App
      fetcher={jest.fn(() => {
        return new Promise(() => {});
      })}
    />,
  );
  const input = await screen.findByRole("textbox");
  fireEvent.change(input, { target: { value: "Yo mama" } });

  expect(await screen.findByText(searchPrompt)).toBeTruthy();
});

test("can clear the results", async () => {
  render(
    <App
      fetcher={jest.fn(() => {
        return new Promise(() => {});
      })}
    />,
  );
  const input = await screen.findByRole("textbox");
  fireEvent.change(input, { target: { value: "Yo mama" } });

  expect(await screen.findByText(searchPrompt)).toBeTruthy();

  const clearButton = await screen.findByRole("button");

  fireEvent.click(clearButton);

  expect(screen.queryByText("Hello world!")).not.toBeTruthy();
});

test("shows the results", async () => {
  const mockFetcher = jest.fn();
  mockFetcher.mockResolvedValue({
    json: () => mockResponse,
  });

  render(<App fetcher={mockFetcher} />);

  const input = await screen.findByRole("textbox");
  fireEvent.change(input, { target: { value: "Yo mama" } });

  await waitFor(async () => {
    expect(await screen.findByText("Calvin Klein CK One")).toBeTruthy();
  });
});

test("shows error if there is one", async () => {
  const mockFetcher = jest.fn();
  mockFetcher.mockImplementation(() => {
    throw new Error("boom");
  });

  render(<App fetcher={mockFetcher} />);

  const input = await screen.findByRole("textbox");
  fireEvent.change(input, { target: { value: "Y" } });

  await waitFor(async () => {
    expect(await screen.findByText(errorPrompt)).toBeTruthy();
  });
});
