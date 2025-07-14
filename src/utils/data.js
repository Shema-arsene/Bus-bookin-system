export const agencyRoutes = {
  ritco: {
    name: "RITCO Express",
    routes: [
      { from: "Kigali", to: "Huye", time: "07:00 AM", price: 2500 },
      { from: "Kigali", to: "Rusizi", time: "09:30 AM", price: 4000 },
      { from: "Kigali", to: "Nyagatare", time: "01:00 PM", price: 3000 },
    ],
  },
  volcano: {
    name: "Volcano Bus",
    routes: [
      { from: "Kigali", to: "Musanze", time: "08:00 AM", price: 2000 },
      { from: "Kigali", to: "Rubavu", time: "10:00 AM", price: 3500 },
      { from: "Kigali", to: "Huye", time: "12:00 PM", price: 2800 },
    ],
  },
  kbs: {
    name: "KBS Transport",
    routes: [
      { from: "Kigali", to: "Bugesera", time: "06:30 AM", price: 1500 },
      { from: "Kigali", to: "Nyamata", time: "10:15 AM", price: 1200 },
      { from: "Kigali", to: "Gatsibo", time: "03:00 PM", price: 2200 },
    ],
  },
}
