const express = require("express");
const app = express();
const cors = require("cors");
bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const products = [
  {
    id: 1,
    name: "first product",
    sku: "sku1",
    price: 22,
  },
  {
    id: 2,
    name: "second product",
    sku: "sku2",
    price: 30,
  },
  {
    id: 3,
    name: "third product",
    sku: "sku3",
    price: 50,
  },
  {
    id: 4,
    name: "fourth product",
    sku: "sku4",
    price: 11,
  },
  {
    id: 5,
    name: "fifth product",
    sku: "sku5",
    price: 60,
  },
];

const suppliers = [
  {
    id: 1,
    name: "first supplier",
    phone: 4634533,
    address: "address1",
  },
  {
    id: 2,
    name: "second supplier",
    phone: 8796472,
    address: "address2",
  },
  {
    id: 3,
    name: "third supplier",
    phone: 469983,
    address: "address3",
  },
  {
    id: 4,
    name: "fourth supplier",
    phone: 1114533,
    address: "address4",
  },
  {
    id: 5,
    name: "fifth supplier",
    phone: 4634211,
    address: "address5",
  },
];

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "user@test.com" && password === "password") {
    res.json({ message: "Login successful", idToken: "token123", auth: true });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/stats", (req, res) => {
  res.json([
    { stat: 245, title: "Products" },
    { stat: 122, title: "Orders" },
    { stat: 10, title: "Suppliers" },
  ]);
});

app.get("/orders", (req, res) => {
  res.json([
    { stat: 83, title: "Delivered" },
    { stat: 50, title: "Pending" },
    { stat: 11, title: "Cancelled" },
  ]);
});

app.get("/profits", (req, res) => {
  res.json({
    labels: ["2006'", "2007", "2008", "2009", "2010", "2011", "2012"],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: "Convenience Goods" },
      { data: [28, 48, 40, 19, 86, 27, 90], label: "Impulse Goods" },
    ],
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.put("/products/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const itemToUpdate = products.find((item) => item.id === itemId);

  if (!itemToUpdate) {
    return res.status(404).json({ error: "Item not found" });
  }

  itemToUpdate.name = updatedItem.name;
  itemToUpdate.sku = updatedItem.sku;
  itemToUpdate.price = updatedItem.price;

  res.json({ message: "Item updated successfully", item: itemToUpdate });
});

app.post("/products", (req, res) => {
  const newItem = req.body;

  products.push(newItem);

  res.status(200).json({ message: "Item added successfully" });
});

app.delete("/products/:id", (req, res) => {
  const itemId = parseInt(req.params.id);

  const itemIndex = products.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    products.splice(itemIndex, 1);
    res.status(200).json({ message: "Item deleted successfully" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.get("/suppliers", (req, res) => {
  res.json(suppliers);
});

app.put("/suppliers/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const itemToUpdate = suppliers.find((item) => item.id === itemId);

  if (!itemToUpdate) {
    return res.status(404).json({ error: "Item not found" });
  }

  itemToUpdate.name = updatedItem.name;
  itemToUpdate.phone = updatedItem.phone;
  itemToUpdate.address = updatedItem.address;

  res.json({ message: "Item updated successfully", item: itemToUpdate });
});

app.delete("/suppliers/:id", (req, res) => {
  const itemId = parseInt(req.params.id);

  const itemIndex = suppliers.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    suppliers.splice(itemIndex, 1);
    res.status(200).json({ message: "Item deleted successfully" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.post("/suppliers", (req, res) => {
  const newItem = req.body;

  suppliers.push(newItem);

  res.status(200).json({ message: "Item added successfully" });
});

app.get("/sales-stats", (req, res) => {
  res.json([
    { stat: "75%", title: "Performance" },
    { stat: "$25,000", title: "Cost" },
    { stat: "$32,000", title: "Revenue" },
  ]);
});

app.get("/revenue", (req, res) => {
  res.json({
    labels: ["1'", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 90, 99, 100, 65, 89],
        label: "Goal",
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90, 88, 31, 65, 77, 80],
        label: "Achieved",
      },
    ],
  });
});

app.get("/sales-types", (req, res) => {
  res.json({
    labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    datasets: [
      { data: [350, 450, 100] },
      { data: [50, 150, 120] },
      { data: [250, 130, 70] },
    ],
  });
});

app.get("/cupons", (req, res) => {
  res.json([
    { title: "10% Cupon", stat: 25 },
    { title: "15% Cupon", stat: 28 },
    { title: "25% Cupon", stat: 62 },
  ]);
});

app.get("/monthly-orders", (req, res) => {
  res.json({
    labels: ["1'", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 90, 99, 100, 65, 89],
        label: "Goal",
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90, 88, 31, 65, 77, 80],
        label: "Achieved",
      },
    ],
  });
});

app.get("/customer-stats", (req, res) => {
  res.json([
    {
      title: "Customer Satisfaction",
      stat: "100%",
    },
    { title: "Number of Orders", stat: 1000 },
    { title: "Commission", stat: 500 },
    { title: "Returned Customers", stat: 50 },
  ]);
});

app.get("/inventory-stats", (req, res) => {
  res.json([
    {
      title: "Available",
      stat: 1614,
    },
    { title: "Reserved", stat: 380 },
    { title: "Sell Rate", stat: "94.67%" },
    { title: "Return Rate", stat: "1.10%" },
    { title: "Out-of-stock", stat: "10K" },
  ]);
});

app.get("/purchases", (req, res) => {
  res.json([
    {
      vendor: "first vendor",
      category: "first cat",
      product: "first product",
      qnty: 10,
      productRate: 33,
      sellRate: 44,
    },
    {
      vendor: "second vendor",
      category: "second cat",
      product: "second product",
      qnty: 10,
      productRate: 33,
      sellRate: 44,
    },
    {
      vendor: "third vendor",
      category: "third cat",
      product: "third product",
      qnty: 10,
      productRate: 33,
      sellRate: 44,
    },
  ]);
});

app.listen(5000, () => console.log("server started on port 5000"));
