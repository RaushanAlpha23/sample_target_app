# Known Bugs (Ground Truth)

## Bug 1: Missing Price on Un-discounted Products
- **File(s) and function/component:** `backend/routers/products.py` (`get_product_pricing`) and `frontend/src/components/ProductCard.jsx`
- **How to trigger it:** View the product list on the home page. Look at any product except 2, 5, or 8.
- **What you'll observe:** The price shows as blank (e.g., `Price: $ `).
- **Root cause:** The backend `pricing` endpoint returns `"price": null` if no active discount exists, instead of falling back to the base price. The frontend component blindly renders this null value without a fallback.
- **Category:** cross-layer

## Bug 2: Cart Add Silently Fails for Existing Items
- **File(s) and function/component:** `backend/routers/cart.py` (`add_to_cart`)
- **How to trigger it:** Add a product to the cart, then go back and add the exact same product again.
- **What you'll observe:** The UI says "Added to cart!", but when you view the cart, the quantity hasn't incremented.
- **Root cause:** In the backend `POST /api/cart/add` handler, if the item already exists in the database, the code increments the object's quantity but forgets to call `db.commit()` in that specific `if` branch.
- **Category:** backend-only

## Bug 3: Wrong Link ID Routes to Undefined
- **File(s) and function/component:** `frontend/src/components/ProductCard.jsx`
- **How to trigger it:** Click "View Details" on any product in the list.
- **What you'll observe:** The detail page loads completely blank.
- **Root cause:** The frontend passes `product.productId` into the navigation function instead of `product.id`. Because `productId` is undefined, it attempts to fetch `/api/products/undefined`, which 404s.
- **Category:** frontend-only

## Bug 4: Hardcoded Product List Limit
- **File(s) and function/component:** `backend/routers/products.py` (`get_products`)
- **How to trigger it:** Scroll to the bottom of the product list page.
- **What you'll observe:** Only 10 products are listed, even though 15 exist in the seed data.
- **Root cause:** The SQLAlchemy query has a `.limit(10)` hardcoded onto the end of the fetch chain.
- **Category:** backend-only

## Bug 5: String Concatenation in Cart Total
- **File(s) and function/component:** `frontend/src/components/Cart.jsx`
- **How to trigger it:** Add two or more different products to the cart and view the cart.
- **What you'll observe:** The "Total Cost" is wildly incorrect, looking like a long string of numbers (e.g., `$015.0022.50`).
- **Root cause:** The backend returns the item price formatted as a string (`"15.00"`). The frontend uses a `.reduce` accumulator that does `acc + item.price` without parsing the string to a float, resulting in string concatenation.
- **Category:** frontend-only

## Bug 6: Missing Product Name in Cart
- **File(s) and function/component:** `backend/routers/cart.py` (`get_cart`) and `frontend/src/components/Cart.jsx`
- **How to trigger it:** Add an item to the cart and view the cart.
- **What you'll observe:** The cart line item shows a dash and the price (`- $15.00 x 1`), but the product name is missing.
- **Root cause:** The backend `/api/cart` endpoint deliberately omits the product `name` from the returned JSON payload. The frontend expects it to be there and renders `{item.name}`, which resolves to blank.
- **Category:** cross-layer

## Bug 7: Unawaited Add to Cart Alert
- **File(s) and function/component:** `frontend/src/components/ProductDetail.jsx`
- **How to trigger it:** Go to a product detail page (by manually typing an ID, e.g., viewing state `detail` with ID `1`), click "Add to Cart" while offline or if the server crashes.
- **What you'll observe:** The browser immediately shows an "Added to cart!" alert even if the network request fails or hasn't finished yet.
- **Root cause:** The component fires the `fetch` request but does not `await` it or check `res.ok` before showing the success alert.
- **Category:** frontend-only

## Bug 8: Wrong Total Item Count
- **File(s) and function/component:** `backend/routers/cart.py` (`get_cart`)
- **How to trigger it:** Fix Bug 2 (or bypass it), add a quantity of 3 for a single product. Check the top of the cart page.
- **What you'll observe:** The cart header says "1 items in cart" instead of 3.
- **Root cause:** The backend calculates `total_items` using `len(items)` (number of unique rows) instead of summing the `quantity` of each item.
- **Category:** backend-only