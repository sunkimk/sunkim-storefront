import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("SUNKIM storefront", () => {
  it("renders the homepage with the hero, categories, and featured products", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /born to stand out/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /shop new drop/i })).toBeInTheDocument();
    expect(screen.getAllByText(/starburst hoodie/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /hoodies/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("builds public image URLs from the configured Vite base path", () => {
    const { container } = render(<App />);
    const imageSources = Array.from(container.querySelectorAll("img")).map((image) => image.getAttribute("src"));

    expect(imageSources).toContain(`${import.meta.env.BASE_URL}assets/products/starburst-hoodie.png`);
    expect(imageSources).not.toContain("/assets/products/starburst-hoodie.png");
  });

  it("switches between collection and product detail views from visible controls", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /^shop$/i }));
    expect(screen.getByRole("heading", { name: /new drop collection/i })).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: /view starburst hoodie/i })[0]);
    expect(screen.getByRole("heading", { name: /^starburst hoodie$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeEnabled();
  });

  it("supports selected states for filters, swatches, sizes, and quantity", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /^shop$/i }));
    await user.click(screen.getByRole("button", { name: /^jackets$/i }));
    expect(screen.getByRole("button", { name: /^jackets$/i })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /view electric jacket/i }));
    await user.click(screen.getByRole("button", { name: /^xl$/i }));
    expect(screen.getByRole("button", { name: /^xl$/i })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(screen.getByText("2", { selector: "output" })).toBeInTheDocument();
  });

  it("groups compact guarantee icons to the left of their text content", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(screen.getAllByRole("button", { name: /view starburst hoodie/i })[0]);

    const compactItems = container.querySelectorAll(".guarantee-strip.is-compact .guarantee-item");
    expect(compactItems).toHaveLength(3);
    compactItems.forEach((item) => {
      expect(item.firstElementChild).toHaveClass("guarantee-icon");
      expect(item.children[1]).toHaveClass("guarantee-copy");
    });
  });

  it("marks discover chips for adaptive container-based sizing", () => {
    const { container } = render(<App />);
    const discoverChips = container.querySelectorAll(".discover-rail .discover-chip");

    expect(discoverChips).toHaveLength(6);
  });

  it("marks product category chips for adaptive container-based sizing", () => {
    const { container } = render(<App />);
    const categoryChips = container.querySelectorAll('[aria-label="Product categories"] .category-chip');

    expect(categoryChips).toHaveLength(8);
  });

  it("adds products to the cart from product cards", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("button", { name: /^cart$/i })).toHaveTextContent("2");
    await user.click(screen.getByRole("button", { name: /add starburst hoodie to cart/i }));

    expect(screen.getByRole("button", { name: /^cart$/i })).toHaveTextContent("3");
  });
});
