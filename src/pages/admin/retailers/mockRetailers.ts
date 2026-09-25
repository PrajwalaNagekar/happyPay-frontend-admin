import type { AdminRetailer } from "../../../types/admin/retailer";

const dummyNames = [
  "Rahul Sharma", "Priya Patel", "Amit Singh", "Neha Gupta", "Vikram Reddy",
  "Anjali Desai", "Suresh Kumar", "Pooja Verma", "Ravi Raj", "Sneha Joshi"
];

export let DUMMY_RETAILERS: AdminRetailer[] = dummyNames.map((name, i) => ({
  id: `RET${String(i + 1).padStart(4, '0')}`,
  fullName: name,
  email: `${name.split(' ')[0].toLowerCase()}${i + 1}@example.com`,
  mobile: `987654321${i}`,
  panCard: `ABCDE1234${String.fromCharCode(65 + i)}`,
  kycStatus: i < 2 ? "approved" : (i % 2 === 0 ? "approved" : "pending"),
  status: i < 2 ? "approved" : (i % 3 === 0 ? "pending" : "approved"),
  role: i < 2 ? "distributor" : "retailer",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  aadhaarVerified: true,
  shop: {
    name: `${name.split(' ')[0]}'s Shop`,
    address: {
      addressLine: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra"
    }
  }
})) as AdminRetailer[];

export const updateDummyRetailerStatus = (id: string, newStatus: AdminRetailer['status']) => {
  DUMMY_RETAILERS = DUMMY_RETAILERS.map((item) => 
    item.id === id ? { ...item, status: newStatus } as AdminRetailer : item
  );
};
