const { useState, useMemo, useEffect } = React;

const STORAGE_TRIPS = "sam_anh_final_trips_v1";
const STORAGE_TOURS = "sam_anh_final_tours_v1";
const STORAGE_COSTS = "sam_anh_vehicle_costs_v1";
function fmt(value) {
  return Number(value || 0).toLocaleString("vi-VN");
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

const customers = [
  { id: "olympus", name: "OLYMPUS" },
  { id: "vedan", name: "Vedan" },
  { id: "other", name: "Khách khác" }
];

const olympusRoutes = [
  { id: 1, route: "Lục Quân", officialFare: 250000, commercialFare: 200000 },
  { id: 2, route: "Hương Phước / Golf / Cổng 11 / Bến Gỗ / Big C / FPT", officialFare: 400000, commercialFare: 300000 },
  { id: 3, route: "Suối Tiên", officialFare: 450000, commercialFare: 300000 },
  { id: 4, route: "Nhơn Trạch / Thái Lạc", officialFare: 300000, commercialFare: 200000 },
  { id: 5, route: "Ấp Mới / Ngã tư 67", officialFare: 400000, commercialFare: 300000 },
  { id: 6, route: "Ấp Mới 2 chiều", officialFare: 700000, commercialFare: 600000 },
  { id: 7, route: "Tam Hiệp / Hố Nai / BV Đồng Nai / 7B", officialFare: 500000, commercialFare: 350000 },
  { id: 8, route: "Đưa ca 3 Trảng Bom về", officialFare: 550000, commercialFare: 400000 },
  { id: 9, route: "Biên Hòa / Trảng Bom", officialFare: 550000, commercialFare: 400000 },
  { id: 10, route: "Suối Tiên ca 1", officialFare: 900000, commercialFare: 700000 },
  { id: 11, route: "Biên Hòa 2 lượt", officialFare: 950000, commercialFare: 700000 },
  { id: 12, route: "Ca 1 Biên Hòa 1 lượt", officialFare: 550000, commercialFare: 400000 },
  { id: 13, route: "Vincom Q9 / Ngã tư Thái Bình", officialFare: 700000, commercialFare: 550000 },
  { id: 14, route: "Vincom Q9 / Ngã tư Thái Bình 2 lượt", officialFare: 1100000, commercialFare: 850000 },
  { id: 15, route: "Hàng Xanh / Cao tốc", officialFare: 800000, commercialFare: 650000 },
  { id: 16, route: "Hàng Xanh / Cao tốc 2 chiều", officialFare: 1200000, commercialFare: 900000 },
  { id: 17, route: "Căn hộ", officialFare: 850000, commercialFare: 700000 },
  { id: 18, route: "Học viện HC / Gò Vấp", officialFare: 900000, commercialFare: 800000 },
  { id: 19, route: "Học viện HC / Gò Vấp 2 chiều", officialFare: 1300000, commercialFare: 1000000 },
  { id: 20, route: "Tân Phú / Lotte LĐH / HTLO", officialFare: 1000000, commercialFare: 900000 },
  { id: 21, route: "Tân Phú / Lotte LĐH / HTLO 2 chiều", officialFare: 1600000, commercialFare: 1200000 }
];

const companyVehicles = [
  { id: 1, label: "Hyundai Custin - 60K642.96", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 2, label: "Kia Carnival - 60K642.95", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 3, label: "Hyundai Custin - 60H340.53", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 4, label: "Innova - 60A526.56", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 5, label: "Xpander - 60K642.57", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 6, label: "Xpander - 60H149.50", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 7, label: "Ford Transit - 60H372.87", actualType: "16 chỗ", pricingGroup: "7 chỗ" },
  { id: 99, label: "Xe công ty khác", actualType: "Khác", pricingGroup: "7 chỗ" }
];

const externalVehicles = [
  { id: 101, label: "Caren - 60K471.30", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 102, label: "Xpander - 60K280.88", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 103, label: "Xpander - 60K518.02", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 104, label: "Xpander - 99A540.25", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 105, label: "Fortuner - 60A349.26", actualType: "7 chỗ", pricingGroup: "7 chỗ" },
  { id: 199, label: "Xe khác", actualType: "Khác", pricingGroup: "7 chỗ" }
];

const vedanAirportPrices = { "4 chỗ": 900000, "7 chỗ": 1000000, "16 chỗ": 1700000 };
const vedanPackages = [
  { maxKm: 50, maxHours: 4, prices: { "4 chỗ": 950000, "7 chỗ": 1100000, "16 chỗ": 1600000 } },
  { maxKm: 100, maxHours: 8, prices: { "4 chỗ": 1400000, "7 chỗ": 1550000, "16 chỗ": 2300000 } },
  { maxKm: 125, maxHours: 10, prices: { "4 chỗ": 1587500, "7 chỗ": 1737500, "16 chỗ": 2600000 } },
  { maxKm: 150, maxHours: 12, prices: { "4 chỗ": 1775000, "7 chỗ": 1925000, "16 chỗ": 2850000 } },
  { maxKm: 200, maxHours: 14, prices: { "4 chỗ": 2150000, "7 chỗ": 2300000, "16 chỗ": 3350000 } }
];
const vedanOverKm = { "4 chỗ": 7500, "7 chỗ": 7500, "16 chỗ": 10000 };
const vedanOverHour = { "4 chỗ": 60000, "7 chỗ": 60000, "16 chỗ": 100000 };

const tourVehicleTypes = ["4 chỗ", "7 chỗ", "16 chỗ", "29 chỗ", "45 chỗ"];

const tollRoutes = [
  { id: 1, from: "TP.HCM", to: "Vũng Tàu", km: 200, tolls: { "7 chỗ": 250000, "16 chỗ": 350000, "29 chỗ": 500000, "45 chỗ": 800000 } },
  { id: 2, from: "Bệnh viện Biên Hòa", to: "Nha Trang", km: 420, tolls: { "7 chỗ": 900000, "16 chỗ": 1200000, "29 chỗ": 1500000, "45 chỗ": 2200000 } },
  { id: 3, from: "Biên Hòa", to: "TP.HCM", km: 100, tolls: { "7 chỗ": 150000, "16 chỗ": 250000, "29 chỗ": 350000, "45 chỗ": 500000 } },
  { id: 4, from: "Biên Hòa", to: "Đà Lạt", km: 620, tolls: { "7 chỗ": 1200000, "16 chỗ": 1700000, "29 chỗ": 2400000, "45 chỗ": 3400000 } },
  { id: 5, from: "Biên Hòa", to: "Đà Nẵng", km: 900, tolls: { "7 chỗ": 1500000, "16 chỗ": 2200000, "29 chỗ": 3000000, "45 chỗ": 4500000 } },
  { id: 6, from: "Biên Hòa", to: "Phan Thiết", km: 360, tolls: { "7 chỗ": 550000, "16 chỗ": 850000, "29 chỗ": 1200000, "45 chỗ": 1800000 } }
];

const fuelConsumption = {
  "7 chỗ": { litersPer100Km: 10, fuelType: "Xăng" },
  "16 chỗ": { litersPer100Km: 12, fuelType: "Dầu" },
  "29 chỗ": { litersPer100Km: 22, fuelType: "Dầu" },
  "45 chỗ": { litersPer100Km: 35, fuelType: "Dầu" }
};

const kmPricing = {
  "7 chỗ": { normal: 9000, over300: 8100 },
  "16 chỗ": { normal: 15000, over300: 13500 },
  "29 chỗ": { normal: 22500, over300: 20250 },
  "45 chỗ": { normal: 35000, over300: 31500 }
};

function getVehicle(id, tripType) {
  const list = tripType === "company" ? companyVehicles : externalVehicles;
  return list.find(v => v.id === Number(id)) || list[0];
}

function calcVedanFare(group, kmValue, hourValue) {
  const km = Number(kmValue || 0);
  const hours = Number(hourValue || 0);
  const packageRow = vedanPackages.find(p => km <= p.maxKm && hours <= p.maxHours) || vedanPackages[vedanPackages.length - 1];
  const baseFare = packageRow.prices[group] || 0;
  const extraKm = Math.max(0, km - packageRow.maxKm);
  const extraHours = Math.max(0, hours - packageRow.maxHours);
  const kmFee = extraKm * (vedanOverKm[group] || 0);
  const hourFee = extraHours > 0 ? (vedanOverHour[group] || 0) : 0;
  return { packageLabel: `≤${packageRow.maxKm}km / ≤${packageRow.maxHours}h`, baseFare, extraKm, extraHours, kmFee, hourFee, total: baseFare + kmFee + hourFee };
}

function calcTripProfit(trip) {
  if (trip.tripType === "external") return Number(trip.officialFare || 0) - Number(trip.commercialFare || 0);
  return Number(trip.officialFare || 0) - Number(trip.tollCost || 0) - Number(trip.otherCost || 0);
}function calcVehicleCost(cost) {
  return (
    Number(cost.fuelCost || 0) +
    Number(cost.driverSalary || 0) +
    Number(cost.maintenanceCost || 0) +
    Number(cost.tollCost || 0) +
    Number(cost.otherCost || 0)
  );
}

function makeInitialCostForm() {
  return {
    month: new Date().toISOString().slice(0, 7),
    vehicle: "",
    fuelCost: "",
    driverSalary: "",
    maintenanceCost: "",
    tollCost: "",
    otherCost: ""
  };
}

function calcTripCost(trip) {
  if (trip.tripType === "external") return Number(trip.commercialFare || 0);
  return Number(trip.tollCost || 0) + Number(trip.otherCost || 0);
}
function makeInitialTripForm() {
  return { date: todayStr(), customerId: "olympus", tripType: "company", vehicleId: companyVehicles[0].id, sourceType: "preset", olympusRouteId: olympusRoutes[0].id, routeName: olympusRoutes[0].route, pickup: "", dropoff: "", vedanType: "airport", vedanGroup: "7 chỗ", distanceKm: "", durationHours: "", officialFare: olympusRoutes[0].officialFare, commercialFare: 0, tollCost: "", otherCost: "", note: "" };
}
function makeInitialTourForm() {
  return { date: todayStr(), vehicleType: "7 chỗ", vehicleCount: "", driver: "", pickup: "", dropoff: "", price: "", bookingPerson: "", paid: false, closed: false };
}
function makeInitialQuoteForm() {
  return { routeId: tollRoutes[0].id, vehicleType: "7 chỗ", estimatedKm: tollRoutes[0].km, tollFee: tollRoutes[0].tolls["7 chỗ"], fuelPrice: "", desiredProfit: "", note: "" };
}

function App() {
  const [tab, setTab] = useState("dashboard");
  const [trips, setTrips] = useState([]);
  const [tourTrips, setTourTrips] = useState([]);
  const [vehicleCosts, setVehicleCosts] = useState([]);
  const [costForm, setCostForm] = useState(makeInitialCostForm());
  const [vehicleCosts, setVehicleCosts] = useState([]);
  const [costForm, setCostForm] = useState(makeInitialCostForm());
  const [tripForm, setTripForm] = useState(makeInitialTripForm());
  const [tourForm, setTourForm] = useState(makeInitialTourForm());
  const [quoteForm, setQuoteForm] = useState(makeInitialQuoteForm());

  useEffect(() => {
    try {
      const savedTrips = localStorage.getItem(STORAGE_TRIPS);
      const savedTours = localStorage.getItem(STORAGE_TOURS);
      if (savedTrips) setTrips(JSON.parse(savedTrips));
      if (savedTours) setTourTrips(JSON.parse(savedTours));
    } catch (err) { console.log("Không đọc được dữ liệu đã lưu", err); }
  }, []);
  useEffect(() => { localStorage.setItem(STORAGE_TRIPS, JSON.stringify(trips)); }, [trips]);
  useEffect(() => { localStorage.setItem(STORAGE_TOURS, JSON.stringify(tourTrips)); }, [tourTrips]);

  const currentCustomer = customers.find(c => c.id === tripForm.customerId) || customers[0];
  const currentVehicle = getVehicle(tripForm.vehicleId, tripForm.tripType);
  const vehicleList = tripForm.tripType === "company" ? companyVehicles : externalVehicles;
  const vedanResult = calcVedanFare(tripForm.vedanGroup, tripForm.distanceKm, tripForm.durationHours);
  const quoteRoute = tollRoutes.find(r => r.id === Number(quoteForm.routeId)) || tollRoutes[0];

  const quoteCalc = useMemo(() => {
    const km = Number(quoteForm.estimatedKm || 0);
    const vehicleType = quoteForm.vehicleType;
    const priceRow = kmPricing[vehicleType] || kmPricing["7 chỗ"];
    const pricePerKm = km > 300 ? priceRow.over300 : priceRow.normal;
    const fuelRow = fuelConsumption[vehicleType] || fuelConsumption["7 chỗ"];
    const liters = (km * fuelRow.litersPer100Km) / 100;
    const fuelCost = liters * Number(quoteForm.fuelPrice || 0);
    const tollFee = Number(quoteForm.tollFee || 0);
    const desiredProfit = Number(quoteForm.desiredProfit || 0);
    const kmBasedPrice = km * pricePerKm;
    const basicCost = fuelCost + tollFee;
    const desiredPrice = basicCost + desiredProfit;
    const finalPrice = Math.max(kmBasedPrice, desiredPrice);
    return { km, pricePerKm, fuelType: fuelRow.fuelType, litersPer100Km: fuelRow.litersPer100Km, liters, fuelCost, tollFee, desiredProfit, kmBasedPrice, basicCost, desiredPrice, finalPrice };
  }, [quoteForm]);

  const reports = useMemo(() => {
    const today = todayStr();
    const month = today.slice(0, 7);
    const todayTrips = trips.filter(t => t.date === today);
    const monthTrips = trips.filter(t => String(t.date || "").startsWith(month));
    const block = (list) => {
      const company = list.filter(t => t.tripType === "company");
      const external = list.filter(t => t.tripType === "external");
      return { count: list.length, revenue: list.reduce((s, t) => s + Number(t.officialFare || 0), 0), cost: list.reduce((s, t) => s + calcTripCost(t), 0), profit: list.reduce((s, t) => s + calcTripProfit(t), 0), companyRevenue: company.reduce((s, t) => s + Number(t.officialFare || 0), 0), externalRevenue: external.reduce((s, t) => s + Number(t.officialFare || 0), 0), companyProfit: company.reduce((s, t) => s + calcTripProfit(t), 0), externalProfit: external.reduce((s, t) => s + calcTripProfit(t), 0) };
    };
    const vehicleMap = {};
    const customerMap = {};
    trips.forEach(t => {
      const vehicleKey = t.vehicleLabel || "Chưa rõ xe";
      const customerKey = t.customerName || "Chưa rõ khách";
      if (!vehicleMap[vehicleKey]) vehicleMap[vehicleKey] = { name: vehicleKey, count: 0, revenue: 0, profit: 0, type: t.tripType };
      vehicleMap[vehicleKey].count += 1;
      vehicleMap[vehicleKey].revenue += Number(t.officialFare || 0);
      vehicleMap[vehicleKey].profit += calcTripProfit(t);
      if (!customerMap[customerKey]) customerMap[customerKey] = { name: customerKey, count: 0, revenue: 0, profit: 0 };
      customerMap[customerKey].count += 1;
      customerMap[customerKey].revenue += Number(t.officialFare || 0);
      customerMap[customerKey].profit += calcTripProfit(t);
    });
    const tourTotal = tourTrips.reduce((s, t) => s + Number(t.price || 0), 0);
    const tourPaid = tourTrips.filter(t => t.paid).reduce((s, t) => s + Number(t.price || 0), 0);
    const tourUnpaid = tourTrips.filter(t => !t.paid).reduce((s, t) => s + Number(t.price || 0), 0);
    return { today: block(todayTrips), month: block(monthTrips), all: block(trips), byVehicle: Object.values(vehicleMap).sort((a, b) => b.count - a.count), byCustomer: Object.values(customerMap).sort((a, b) => b.count - a.count), tour: { count: tourTrips.length, total: tourTotal, paid: tourPaid, unpaid: tourUnpaid, closed: tourTrips.filter(t => t.closed).length, open: tourTrips.filter(t => !t.closed).length } };
  }, [trips, tourTrips]);

  function updateTrip(field, value) {
    setTripForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === "customerId") {
        if (value === "olympus") {
          const r = olympusRoutes[0];
          Object.assign(next, { sourceType: "preset", olympusRouteId: r.id, routeName: r.route, officialFare: r.officialFare, commercialFare: next.tripType === "external" ? r.commercialFare : 0, pickup: "", dropoff: "" });
        } else if (value === "vedan") {
          Object.assign(next, { sourceType: "vedan", vedanType: "airport", vedanGroup: "7 chỗ", routeName: "Đưa đón sân bay", distanceKm: "", durationHours: "", officialFare: vedanAirportPrices["7 chỗ"], commercialFare: next.tripType === "external" ? "" : 0 });
        } else {
          Object.assign(next, { sourceType: "custom", routeName: "", officialFare: "", commercialFare: next.tripType === "external" ? "" : 0 });
        }
      }
      if (field === "tripType") {
        next.vehicleId = value === "company" ? companyVehicles[0].id : externalVehicles[0].id;
        if (value === "company") next.commercialFare = 0;
        if (value === "external" && next.customerId === "olympus") {
          const r = olympusRoutes.find(x => x.id === Number(next.olympusRouteId)) || olympusRoutes[0];
          next.commercialFare = r.commercialFare;
        }
      }
      if (field === "olympusRouteId") {
        const r = olympusRoutes.find(x => x.id === Number(value)) || olympusRoutes[0];
        next.routeName = r.route;
        next.officialFare = r.officialFare;
        next.commercialFare = next.tripType === "external" ? r.commercialFare : 0;
      }
      if (field === "sourceType" && next.customerId === "olympus") {
        if (value === "preset") {
          const r = olympusRoutes.find(x => x.id === Number(next.olympusRouteId)) || olympusRoutes[0];
          next.routeName = r.route;
          next.officialFare = r.officialFare;
          next.commercialFare = next.tripType === "external" ? r.commercialFare : 0;
        } else {
          next.routeName = "";
          next.officialFare = "";
          next.commercialFare = next.tripType === "external" ? "" : 0;
        }
      }
      if (field === "vedanType") {
        if (value === "airport") {
          next.routeName = "Đưa đón sân bay";
          next.officialFare = vedanAirportPrices[next.vedanGroup] || 0;
        } else {
          next.routeName = "";
          next.officialFare = calcVedanFare(next.vedanGroup, next.distanceKm, next.durationHours).total;
        }
      }
      if (field === "vedanGroup") {
        next.officialFare = next.vedanType === "airport" ? (vedanAirportPrices[value] || 0) : calcVedanFare(value, next.distanceKm, next.durationHours).total;
      }
      if ((field === "distanceKm" || field === "durationHours") && next.customerId === "vedan" && next.vedanType === "flexible") {
        next.officialFare = calcVedanFare(next.vedanGroup, next.distanceKm, next.durationHours).total;
      }
      return next;
    });
  }

  function saveTrip() {
    const customer = customers.find(c => c.id === tripForm.customerId) || customers[0];
    const vehicle = getVehicle(tripForm.vehicleId, tripForm.tripType);
    setTrips(prev => [{ ...tripForm, id: Date.now(), customerName: customer.name, vehicleLabel: vehicle.label, actualType: vehicle.actualType, pricingGroup: vehicle.pricingGroup, officialFare: Number(tripForm.officialFare || 0), commercialFare: Number(tripForm.commercialFare || 0), tollCost: Number(tripForm.tollCost || 0), otherCost: Number(tripForm.otherCost || 0), distanceKm: Number(tripForm.distanceKm || 0), durationHours: Number(tripForm.durationHours || 0) }, ...prev]);
    setTripForm(makeInitialTripForm());
    setTab("trips");
  }
  function deleteTrip(id) { setTrips(prev => prev.filter(t => t.id !== id)); }
  function saveTourTrip() { setTourTrips(prev => [{ ...tourForm, id: Date.now(), price: Number(tourForm.price || 0) }, ...prev]); setTourForm(makeInitialTourForm()); }
  function deleteTour(id) { setTourTrips(prev => prev.filter(t => t.id !== id)); }
  function updateQuoteRoute(routeId) {
    const route = tollRoutes.find(r => r.id === Number(routeId)) || tollRoutes[0];
    setQuoteForm(prev => ({ ...prev, routeId: route.id, estimatedKm: route.km, tollFee: route.tolls[prev.vehicleType] || 0 }));
  }
  function updateQuoteVehicle(vehicleType) {
    const route = tollRoutes.find(r => r.id === Number(quoteForm.routeId)) || tollRoutes[0];
    setQuoteForm(prev => ({ ...prev, vehicleType, tollFee: route.tolls[vehicleType] || 0 }));
  }

  const card = "bg-white rounded-3xl border border-slate-200 shadow-sm p-4";
  const input = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500";
  const label = "text-sm font-semibold text-slate-600 mb-1";
  const mainButton = "w-full rounded-2xl bg-blue-700 text-white font-semibold py-3 active:scale-[0.99]";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-md mx-auto p-4 pb-32">
        <div className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur py-3">
          <div className="rounded-3xl bg-blue-700 text-white p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <img src="logo.png" alt="SAM ANH" className="w-14 h-14 rounded-2xl bg-white p-1 object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div><h1 className="text-2xl font-bold leading-tight">SAM ANH</h1><p className="text-xs opacity-90">Quản lý vận hành xe</p></div>
            </div>
          </div>
        </div>

        {tab === "dashboard" && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className={card}><div className="text-xs text-slate-500">Tổng chuyến</div><div className="text-xl font-bold">{reports.all.count}</div></div>
              <div className={card}><div className="text-xs text-slate-500">Tổng doanh thu</div><div className="text-lg font-bold">{fmt(reports.all.revenue)} đ</div></div>
              <div className={card}><div className="text-xs text-slate-500">Tổng lợi nhuận</div><div className={`text-lg font-bold ${reports.all.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>{fmt(reports.all.profit)} đ</div></div>
              <div className={card}><div className="text-xs text-slate-500">Xe DL chưa thu</div><div className="text-lg font-bold text-amber-600">{fmt(reports.tour.unpaid)} đ</div></div>
            </div>
          </div>
        )}

        {tab === "entry" && (
          <div className="mt-4 space-y-4"><div className={card}><h2 className="text-xl font-bold mb-4">Nhập chuyến xe</h2><div className="space-y-3">
            <div><div className={label}>Ngày</div><input className={input} type="date" value={tripForm.date} onChange={e => updateTrip("date", e.target.value)} /></div>
            <div><div className={label}>Khách hàng</div><select className={input} value={tripForm.customerId} onChange={e => updateTrip("customerId", e.target.value)}>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div><div className={label}>Loại xe vận hành</div><select className={input} value={tripForm.tripType} onChange={e => updateTrip("tripType", e.target.value)}><option value="company">Xe công ty</option><option value="external">Xe thuê ngoài</option></select></div>
            <div><div className={label}>Xe thực tế</div><select className={input} value={tripForm.vehicleId} onChange={e => updateTrip("vehicleId", e.target.value)}>{vehicleList.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}</select></div>
            <div className="rounded-2xl bg-blue-50 p-3 text-sm text-blue-900">Xe thực tế: <b>{currentVehicle.actualType}</b><br/>Nhóm giá: <b>{currentVehicle.pricingGroup}</b></div>

            {currentCustomer.id === "olympus" && (<><div><div className={label}>Kiểu tuyến OLYMPUS</div><select className={input} value={tripForm.sourceType} onChange={e => updateTrip("sourceType", e.target.value)}><option value="preset">Tuyến có sẵn</option><option value="custom">Tuyến phát sinh</option></select></div>{tripForm.sourceType === "preset" ? (<div><div className={label}>Tuyến</div><select className={input} value={tripForm.olympusRouteId} onChange={e => updateTrip("olympusRouteId", e.target.value)}>{olympusRoutes.map(r => <option key={r.id} value={r.id}>{r.route}</option>)}</select></div>) : (<div><div className={label}>Tên tuyến phát sinh</div><input className={input} value={tripForm.routeName} onChange={e => updateTrip("routeName", e.target.value)} /></div>)}</>)}

            {currentCustomer.id === "vedan" && (<><div><div className={label}>Loại giá Vedan</div><select className={input} value={tripForm.vedanType} onChange={e => updateTrip("vedanType", e.target.value)}><option value="airport">Đưa đón sân bay</option><option value="flexible">Chuyến thường linh hoạt</option></select></div><div><div className={label}>Yêu cầu khách hàng</div><select className={input} value={tripForm.vedanGroup} onChange={e => updateTrip("vedanGroup", e.target.value)}><option value="4 chỗ">4 chỗ</option><option value="7 chỗ">7 chỗ</option><option value="16 chỗ">16 chỗ</option></select></div>{tripForm.vedanType === "airport" ? (<div className="rounded-2xl bg-blue-50 p-4 text-sm text-blue-900">Giá sân bay áp theo yêu cầu khách hàng: <b>{fmt(tripForm.officialFare)} đ</b></div>) : (<><div><div className={label}>Điểm đi</div><input className={input} value={tripForm.pickup} onChange={e => updateTrip("pickup", e.target.value)} /></div><div><div className={label}>Điểm đến</div><input className={input} value={tripForm.dropoff} onChange={e => updateTrip("dropoff", e.target.value)} /></div><div><div className={label}>Số km thực tế</div><input className={input} inputMode="numeric" value={tripForm.distanceKm} onChange={e => updateTrip("distanceKm", e.target.value)} /></div><div><div className={label}>Số giờ thực tế</div><input className={input} inputMode="numeric" value={tripForm.durationHours} onChange={e => updateTrip("durationHours", e.target.value)} /></div><div className="rounded-2xl bg-blue-50 p-4 text-sm space-y-1 text-blue-950"><div>Gói áp dụng: <b>{vedanResult.packageLabel}</b></div><div>Giá cơ bản: <b>{fmt(vedanResult.baseFare)} đ</b></div><div>Phụ thu km: <b>{fmt(vedanResult.kmFee)} đ</b></div><div>Phụ thu giờ: <b>{fmt(vedanResult.hourFee)} đ</b></div><div className="text-base font-bold text-blue-700">Tổng giá Vedan: {fmt(vedanResult.total)} đ</div></div></>)}</>)}

            {currentCustomer.id === "other" && <div><div className={label}>Tên tuyến / chuyến</div><input className={input} value={tripForm.routeName} onChange={e => updateTrip("routeName", e.target.value)} /></div>}
            <div><div className={label}>Giá cước chính</div><input className={input} inputMode="numeric" value={tripForm.officialFare} onChange={e => updateTrip("officialFare", e.target.value)} /></div>
            {tripForm.tripType === "external" ? <div><div className={label}>Giá thuê xe ngoài / thương mại</div><input className={input} inputMode="numeric" value={tripForm.commercialFare} onChange={e => updateTrip("commercialFare", e.target.value)} /></div> : <><div><div className={label}>Phí cầu đường</div><input className={input} inputMode="numeric" value={tripForm.tollCost} onChange={e => updateTrip("tollCost", e.target.value)} /></div><div><div className={label}>Chi phí khác</div><input className={input} inputMode="numeric" value={tripForm.otherCost} onChange={e => updateTrip("otherCost", e.target.value)} /></div></>}
            <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">Lợi nhuận tạm tính</div><div className={`text-xl font-bold ${calcTripProfit(tripForm) >= 0 ? "text-emerald-600" : "text-red-600"}`}>{fmt(calcTripProfit(tripForm))} đ</div></div><button className={mainButton} onClick={saveTrip}>Lưu chuyến xe</button>
          </div></div></div>
        )}

        {tab === "trips" && <TripList trips={trips} card={card} onDelete={deleteTrip} />}
        {tab === "tour" && <TourTab card={card} input={input} label={label} mainButton={mainButton} tourForm={tourForm} setTourForm={setTourForm} tourTrips={tourTrips} saveTourTrip={saveTourTrip} deleteTour={deleteTour} />}
        {tab === "quote" && <QuoteTab card={card} input={input} label={label} quoteForm={quoteForm} setQuoteForm={setQuoteForm} updateQuoteRoute={updateQuoteRoute} updateQuoteVehicle={updateQuoteVehicle} quoteRoute={quoteRoute} quoteCalc={quoteCalc} />}
        {tab === "report" && <ReportTab card={card} reports={reports} />}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200"><div className="max-w-md mx-auto grid grid-cols-6 gap-1 px-2 py-2 text-center text-[11px] font-semibold text-slate-600">
          {[ ["dashboard","Tổng quan"], ["entry","Nhập"], ["trips","Chuyến"], ["tour","Xe DL"], ["quote","Báo giá"], ["report","Báo cáo"] ].map(([key, text]) => <button key={key} onClick={() => setTab(key)} className={`rounded-2xl py-3 ${tab === key ? "bg-blue-700 text-white" : "bg-slate-100"}`}>{text}</button>)}
        </div></div>
      </div>
    </div>
  );
}

function TripList({ trips, card, onDelete }) {
  return <div className="mt-4 space-y-4">{trips.length === 0 && <div className={card}>Chưa có chuyến xe nào.</div>}{trips.map(t => { const profit = calcTripProfit(t); const routeText = t.customerId === "vedan" && t.vedanType === "flexible" ? `${t.pickup || ""} → ${t.dropoff || ""}` : t.routeName; return <div key={t.id} className={card}><div className="flex justify-between gap-3"><div><div className="text-sm text-slate-500">{t.date}</div><div className="text-lg font-bold">{t.customerName}</div><div className="text-sm">{routeText || "Chuyến chưa đặt tên"}</div><div className="text-sm text-slate-600">{t.vehicleLabel}</div></div><div className={`h-fit px-3 py-1 rounded-full text-xs font-bold ${t.tripType === "company" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{t.tripType === "company" ? "Công ty" : "Xe ngoài"}</div></div><div className="grid grid-cols-2 gap-3 mt-4 text-sm"><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500">Giá cước</div><b>{fmt(t.officialFare)} đ</b></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500">Chi phí</div><b>{fmt(calcTripCost(t))} đ</b></div></div><div className={`mt-3 font-bold ${profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>Lợi nhuận: {fmt(profit)} đ</div><button className="mt-3 w-full rounded-2xl border border-red-200 text-red-600 py-2 font-semibold" onClick={() => onDelete(t.id)}>Xóa chuyến</button></div>; })}</div>;
}

function TourTab({ card, input, label, mainButton, tourForm, setTourForm, tourTrips, saveTourTrip, deleteTour }) {
  return <div className="mt-4 space-y-4"><div className={card}><h2 className="text-xl font-bold mb-4">Xe du lịch</h2><div className="space-y-3"><div><div className={label}>Ngày</div><input className={input} type="date" value={tourForm.date} onChange={e => setTourForm({...tourForm, date: e.target.value})} /></div><div><div className={label}>Loại xe</div><select className={input} value={tourForm.vehicleType} onChange={e => setTourForm({...tourForm, vehicleType: e.target.value})}>{tourVehicleTypes.map(v => <option key={v}>{v}</option>)}</select></div><div><div className={label}>Số xe</div><input className={input} value={tourForm.vehicleCount} onChange={e => setTourForm({...tourForm, vehicleCount: e.target.value})} /></div><div><div className={label}>Tài xế</div><input className={input} value={tourForm.driver} onChange={e => setTourForm({...tourForm, driver: e.target.value})} /></div><div><div className={label}>Điểm đón</div><input className={input} value={tourForm.pickup} onChange={e => setTourForm({...tourForm, pickup: e.target.value})} /></div><div><div className={label}>Điểm đến</div><input className={input} value={tourForm.dropoff} onChange={e => setTourForm({...tourForm, dropoff: e.target.value})} /></div><div><div className={label}>Giá tiền</div><input className={input} inputMode="numeric" value={tourForm.price} onChange={e => setTourForm({...tourForm, price: e.target.value})} /></div><div><div className={label}>Người booking</div><input className={input} value={tourForm.bookingPerson} onChange={e => setTourForm({...tourForm, bookingPerson: e.target.value})} /></div><label className="flex items-center gap-2 text-base"><input type="checkbox" checked={tourForm.paid} onChange={e => setTourForm({...tourForm, paid: e.target.checked})} /> Đã thu tiền</label><label className="flex items-center gap-2 text-base"><input type="checkbox" checked={tourForm.closed} onChange={e => setTourForm({...tourForm, closed: e.target.checked})} /> Chốt sổ</label><button className={mainButton} onClick={saveTourTrip}>Lưu xe du lịch</button></div></div>{tourTrips.map(t => <div key={t.id} className={card}><div className="font-bold">{t.date} • {t.vehicleType} • {t.vehicleCount || 1} xe</div><div>{t.pickup} → {t.dropoff}</div><div className="text-sm text-slate-600">Tài xế: {t.driver || "Chưa nhập"}</div><div className="text-sm text-slate-600">Booking: {t.bookingPerson || "Chưa nhập"}</div><div className="font-bold mt-1">Giá: {fmt(t.price)} đ</div><div className="text-sm mt-1">{t.paid ? "✅ Đã thu" : "❌ Chưa thu"} • {t.closed ? "📒 Đã chốt" : "📝 Chưa chốt"}</div><button className="mt-3 w-full rounded-2xl border border-red-200 text-red-600 py-2 font-semibold" onClick={() => deleteTour(t.id)}>Xóa</button></div>)}</div>;
}

function QuoteTab({ card, input, label, quoteForm, setQuoteForm, updateQuoteRoute, updateQuoteVehicle, quoteRoute, quoteCalc }) {
  return <div className="mt-4 space-y-4"><div className={card}><h2 className="text-xl font-bold mb-4">Báo giá xe du lịch</h2><div className="space-y-3"><div><div className={label}>Tuyến</div><select className={input} value={quoteForm.routeId} onChange={e => updateQuoteRoute(e.target.value)}>{tollRoutes.map(r => <option key={r.id} value={r.id}>{r.from} → {r.to}</option>)}</select></div><div><div className={label}>Loại xe</div><select className={input} value={quoteForm.vehicleType} onChange={e => updateQuoteVehicle(e.target.value)}>{["7 chỗ","16 chỗ","29 chỗ","45 chỗ"].map(v => <option key={v}>{v}</option>)}</select></div><div><div className={label}>KM ước tính</div><input className={input} inputMode="numeric" value={quoteForm.estimatedKm} onChange={e => setQuoteForm({...quoteForm, estimatedKm: e.target.value})} /></div><div><div className={label}>Phí cầu đường</div><input className={input} inputMode="numeric" value={quoteForm.tollFee} onChange={e => setQuoteForm({...quoteForm, tollFee: e.target.value})} /></div><div><div className={label}>Giá nhiên liệu hiện tại</div><input className={input} inputMode="numeric" value={quoteForm.fuelPrice} onChange={e => setQuoteForm({...quoteForm, fuelPrice: e.target.value})} /></div><div><div className={label}>Lợi nhuận mong muốn</div><input className={input} inputMode="numeric" value={quoteForm.desiredProfit} onChange={e => setQuoteForm({...quoteForm, desiredProfit: e.target.value})} /></div></div></div><div className={card}><div className="font-bold mb-3">Kết quả báo giá</div><div className="space-y-2 text-sm"><div className="flex justify-between"><span>Tuyến</span><b>{quoteRoute.from} → {quoteRoute.to}</b></div><div className="flex justify-between"><span>Đơn giá/km</span><b>{fmt(quoteCalc.pricePerKm)} đ</b></div><div className="flex justify-between"><span>Nhiên liệu</span><b>{quoteCalc.fuelType}</b></div><div className="flex justify-between"><span>Định mức</span><b>{quoteCalc.litersPer100Km}L / 100km</b></div><div className="flex justify-between"><span>Số lít</span><b>{quoteCalc.liters.toFixed(1)} lít</b></div><div className="flex justify-between"><span>Chi phí nhiên liệu</span><b>{fmt(quoteCalc.fuelCost)} đ</b></div><div className="flex justify-between"><span>Cầu đường</span><b>{fmt(quoteCalc.tollFee)} đ</b></div><div className="flex justify-between"><span>Chi phí cơ bản</span><b>{fmt(quoteCalc.basicCost)} đ</b></div><div className="flex justify-between"><span>Giá theo km</span><b>{fmt(quoteCalc.kmBasedPrice)} đ</b></div><div className="pt-2 border-t flex justify-between"><span className="font-bold">Giá báo tương đối</span><b className="text-blue-700 text-lg">{fmt(quoteCalc.finalPrice)} đ</b></div></div></div><div className={card}><div className="font-bold mb-3">Bảng cầu đường chuẩn</div><div className="space-y-2 text-sm">{tollRoutes.map(r => <div key={r.id} className="rounded-2xl bg-slate-50 p-3"><div className="font-semibold">{r.from} → {r.to}</div><div>KM: {r.km}</div><div>7 chỗ: {fmt(r.tolls["7 chỗ"])} • 16 chỗ: {fmt(r.tolls["16 chỗ"])}</div><div>29 chỗ: {fmt(r.tolls["29 chỗ"])} • 45 chỗ: {fmt(r.tolls["45 chỗ"])}</div></div>)}</div></div></div>;
}

function ReportTab({ card, reports }) {
  const Box = ({title, value}) => <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500">{title}</div><b>{value}</b></div>;
  return <div className="mt-4 space-y-4"><div className={card}><h2 className="text-xl font-bold mb-3">Báo cáo hôm nay</h2><div className="grid grid-cols-2 gap-3 text-sm"><Box title="Tổng chuyến" value={reports.today.count}/><Box title="Lợi nhuận" value={`${fmt(reports.today.profit)} đ`}/><Box title="DT xe công ty" value={`${fmt(reports.today.companyRevenue)} đ`}/><Box title="DT xe ngoài" value={`${fmt(reports.today.externalRevenue)} đ`}/></div></div><div className={card}><h2 className="text-xl font-bold mb-3">Báo cáo tháng này</h2><div className="grid grid-cols-2 gap-3 text-sm"><Box title="Tổng chuyến" value={reports.month.count}/><Box title="Doanh thu" value={`${fmt(reports.month.revenue)} đ`}/><Box title="Chi phí" value={`${fmt(reports.month.cost)} đ`}/><Box title="Lợi nhuận" value={`${fmt(reports.month.profit)} đ`}/><Box title="Lãi xe công ty" value={`${fmt(reports.month.companyProfit)} đ`}/><Box title="Lãi xe ngoài" value={`${fmt(reports.month.externalProfit)} đ`}/></div></div><div className={card}><h2 className="text-xl font-bold mb-3">Báo cáo xe du lịch</h2><div className="grid grid-cols-2 gap-3 text-sm"><Box title="Tổng chuyến" value={reports.tour.count}/><Box title="Tổng tiền" value={`${fmt(reports.tour.total)} đ`}/><Box title="Đã thu" value={`${fmt(reports.tour.paid)} đ`}/><Box title="Chưa thu" value={`${fmt(reports.tour.unpaid)} đ`}/><Box title="Đã chốt" value={reports.tour.closed}/><Box title="Chưa chốt" value={reports.tour.open}/></div></div><div className={card}><h2 className="text-xl font-bold mb-3">Theo xe</h2>{reports.byVehicle.length === 0 ? <div>Chưa có dữ liệu.</div> : reports.byVehicle.map(item => <div key={item.name} className="rounded-2xl bg-slate-50 p-3 mb-2 text-sm"><b>{item.name}</b><div>{item.type === "company" ? "Xe công ty" : "Xe ngoài"} • {item.count} chuyến</div><div>Doanh thu: {fmt(item.revenue)} đ</div><div className={item.profit >= 0 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>Lợi nhuận: {fmt(item.profit)} đ</div></div>)}</div><div className={card}><h2 className="text-xl font-bold mb-3">Theo khách hàng</h2>{reports.byCustomer.length === 0 ? <div>Chưa có dữ liệu.</div> : reports.byCustomer.map(item => <div key={item.name} className="rounded-2xl bg-slate-50 p-3 mb-2 text-sm"><b>{item.name}</b><div>{item.count} chuyến</div><div>Doanh thu: {fmt(item.revenue)} đ</div><div className={item.profit >= 0 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>Lợi nhuận: {fmt(item.profit)} đ</div></div>)}</div></div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
