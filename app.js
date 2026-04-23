import React, { useEffect, useMemo, useState } from 'react';

const customers = [
  { id: 'olympus', name: 'OLYMPUS' },
  { id: 'vedan', name: 'Vedan' },
  { id: 'other', name: 'Khách khác' },
];

const olympusRoutes = [
  { id: 1, route: 'Lục Quân', officialFare: 250000, commercialFare: 200000 },
  { id: 2, route: 'Hương Phước/Golf/Cổng 11/Bến Gỗ/Big C/FPT', officialFare: 400000, commercialFare: 300000 },
  { id: 3, route: 'Suối Tiên', officialFare: 450000, commercialFare: 300000 },
  { id: 4, route: 'Nhơn Trạch/Thái Lạc', officialFare: 300000, commercialFare: 200000 },
  { id: 5, route: 'Ấp Mới/Ngã tư 67', officialFare: 400000, commercialFare: 300000 },
  { id: 6, route: 'Ấp Mới (2 chiều)', officialFare: 700000, commercialFare: 600000 },
  { id: 7, route: 'Tam Hiệp/Hố Nai/BV Đồng Nai/7B', officialFare: 500000, commercialFare: 350000 },
  { id: 8, route: 'Đưa ca 3 Trảng Bom về', officialFare: 550000, commercialFare: 400000 },
  { id: 9, route: 'Biên Hòa/Trảng Bom', officialFare: 550000, commercialFare: 400000 },
  { id: 10, route: 'Suối Tiên ca 1', officialFare: 900000, commercialFare: 700000 },
  { id: 11, route: 'Biên Hòa 2 lượt', officialFare: 950000, commercialFare: 700000 },
  { id: 12, route: 'Ca 1 Biên Hòa 1 lượt', officialFare: 550000, commercialFare: 400000 },
  { id: 13, route: 'Vincom Q9/Ngã tư Thái Bình', officialFare: 700000, commercialFare: 550000 },
  { id: 14, route: 'Vincom Q9/Ngã tư Thái Bình (2 lượt)', officialFare: 1100000, commercialFare: 850000 },
  { id: 15, route: 'Hàng Xanh/Cao tốc', officialFare: 800000, commercialFare: 650000 },
  { id: 16, route: 'Hàng Xanh/Cao tốc (2 chiều)', officialFare: 1200000, commercialFare: 900000 },
  { id: 17, route: 'Căn hộ', officialFare: 850000, commercialFare: 700000 },
  { id: 18, route: 'Học viện HC/Gò Vấp', officialFare: 900000, commercialFare: 800000 },
  { id: 19, route: 'Học viện HC/Gò Vấp (2 chiều)', officialFare: 1300000, commercialFare: 1000000 },
  { id: 20, route: 'Tân Phú/Lotte LĐH/HTLO', officialFare: 1000000, commercialFare: 900000 },
  { id: 21, route: 'Tân Phú/Lotte LĐH/HTLO (2 chiều)', officialFare: 1600000, commercialFare: 1200000 },
];

const companyVehicles = [
  { id: 1, model: 'Hyundai Custin', plate: '60K642.96', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 2, model: 'Kia Carnival', plate: '60K642.95', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 3, model: 'Hyundai Custin', plate: '60H340.53', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 4, model: 'Innova', plate: '60A526.56', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 5, model: 'Xpander', plate: '60K642.57', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 6, model: 'Xpander', plate: '60H149.50', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 7, model: 'Ford Transit', plate: '60H372.87', actualType: '16 chỗ', pricingGroup: '7 chỗ' },
  { id: 8, model: 'Xe công ty khác', plate: 'Khác', actualType: 'Khác', pricingGroup: '7 chỗ' },
];

const externalVehicles = [
  { id: 101, model: 'Caren', plate: '60K471.30', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 102, model: 'Xpander', plate: '60K280.88', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 103, model: 'Xpander', plate: '60K518.02', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 104, model: 'Xpander', plate: '99A540.25', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 105, model: 'Fortuner', plate: '60A349.26', actualType: '7 chỗ', pricingGroup: '7 chỗ' },
  { id: 106, model: 'Xe khác', plate: 'Khác', actualType: 'Khác', pricingGroup: '7 chỗ' },
];

const vedanAirportPrices = {
  '4 chỗ': 900000,
  '7 chỗ': 1000000,
  '16 chỗ': 1700000,
};

const vedanPackages = [
  { maxKm: 50, maxHours: 4, prices: { '4 chỗ': 950000, '7 chỗ': 1100000, '16 chỗ': 1600000 } },
  { maxKm: 100, maxHours: 8, prices: { '4 chỗ': 1400000, '7 chỗ': 1550000, '16 chỗ': 2300000 } },
  { maxKm: 125, maxHours: 10, prices: { '4 chỗ': 1587000, '7 chỗ': 1737000, '16 chỗ': 2600000 } },
  { maxKm: 150, maxHours: 12, prices: { '4 chỗ': 1775000, '7 chỗ': 1925000, '16 chỗ': 2850000 } },
  { maxKm: 200, maxHours: 14, prices: { '4 chỗ': 2150000, '7 chỗ': 2300000, '16 chỗ': 3350000 } },
];
const vedanOverKm = { '4 chỗ': 7500, '7 chỗ': 7500, '16 chỗ': 10000 };
const vedanOverHour = { '4 chỗ': 60000, '7 chỗ': 60000, '16 chỗ': 100000 };

const fuelConsumption = {
  '7 chỗ': { litersPer100Km: 10, fuelLabel: 'Xăng' },
  '16 chỗ': { litersPer100Km: 12, fuelLabel: 'Dầu' },
  '29 chỗ': { litersPer100Km: 22, fuelLabel: 'Dầu' },
  '45 chỗ': { litersPer100Km: 35, fuelLabel: 'Dầu' },
};

const kmPricing = {
  '7 chỗ': { normal: 9000, over300: 8100 },
  '16 chỗ': { normal: 15000, over300: 13500 },
  '29 chỗ': { normal: 22500, over300: 20250 },
  '45 chỗ': { normal: 35000, over300: 31500 },
};

const tourVehicleTypes = ['4 chỗ', '7 chỗ', '16 chỗ', '29 chỗ', '45 chỗ'];

const tollRoutes = [
  { id: 1, from: 'TP.HCM', to: 'Vũng Tàu', km: 200, tolls: { '7 chỗ': 250000, '16 chỗ': 350000, '29 chỗ': 500000, '45 chỗ': 800000 } },
  { id: 2, from: 'Bệnh viện Biên Hòa', to: 'Nha Trang', km: 420, tolls: { '7 chỗ': 900000, '16 chỗ': 1200000, '29 chỗ': 1500000, '45 chỗ': 2200000 } },
  { id: 3, from: 'Biên Hòa', to: 'TP.HCM', km: 100, tolls: { '7 chỗ': 150000, '16 chỗ': 250000, '29 chỗ': 350000, '45 chỗ': 500000 } },
  { id: 4, from: 'Biên Hòa', to: 'Đà Lạt', km: 620, tolls: { '7 chỗ': 1200000, '16 chỗ': 1700000, '29 chỗ': 2400000, '45 chỗ': 3400000 } },
  { id: 5, from: 'Biên Hòa', to: 'Đà Nẵng', km: 900, tolls: { '7 chỗ': 1500000, '16 chỗ': 2200000, '29 chỗ': 3000000, '45 chỗ': 4500000 } },
  { id: 6, from: 'Biên Hòa', to: 'Phan Thiết', km: 360, tolls: { '7 chỗ': 550000, '16 chỗ': 850000, '29 chỗ': 1200000, '45 chỗ': 1800000 } },
  { id: 7, from: 'TP.HCM', to: 'Nha Trang', km: 900, tolls: { '7 chỗ': 1500000, '16 chỗ': 2200000, '29 chỗ': 3000000, '45 chỗ': 4400000 } },
  { id: 8, from: 'Bệnh viện Biên Hòa', to: 'TP.HCM', km: 70, tolls: { '7 chỗ': 120000, '16 chỗ': 200000, '29 chỗ': 280000, '45 chỗ': 420000 } },
];

const ui = {
  card: 'bg-white rounded-3xl border border-slate-200 shadow-sm p-4',
  input: 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none',
};

const fmt = (v) => Number(v || 0).toLocaleString('vi-VN');

const createTripForm = () => ({
  date: new Date().toISOString().slice(0, 10),
  customerId: 'olympus',
  tripType: 'company',
  tripSourceType: 'preset',
  vehicleId: companyVehicles[0].id,
  routePresetId: olympusRoutes[0].id,
  routeName: olympusRoutes[0].route,
  pickup: '',
  dropoff: '',
  distanceKm: '',
  durationHours: '',
  customerRequestedGroup: '7 chỗ',
  officialFare: olympusRoutes[0].officialFare,
  commercialFare: olympusRoutes[0].commercialFare,
  tollCost: '',
  otherCost: '',
  note: '',
});

const createTourForm = () => ({
  date: new Date().toISOString().slice(0, 10),
  vehicleType: '7 chỗ',
  vehicleCount: '',
  driver: '',
  pickup: '',
  dropoff: '',
  price: '',
  bookingPerson: '',
  paid: false,
  closed: false,
});

const createQuoteForm = () => ({
  routeId: tollRoutes[0].id,
  from: tollRoutes[0].from,
  to: tollRoutes[0].to,
  vehicleType: '7 chỗ',
  estimatedKm: tollRoutes[0].km,
  tollFee: tollRoutes[0].tolls['7 chỗ'],
  fuelPrice: '',
  desiredProfit: '',
});

function getVehicleById(id, tripType) {
  const list = tripType === 'company' ? companyVehicles : externalVehicles;
  return list.find((item) => item.id === Number(id)) || list[0];
}

function calculateVedanFlexibleFare(requestedGroup, kmValue, hourValue) {
  const km = Number(kmValue || 0);
  const hours = Number(hourValue || 0);
  const matched = vedanPackages.find((pkg) => km <= pkg.maxKm && hours <= pkg.maxHours) || vedanPackages[vedanPackages.length - 1];
  const baseFare = matched.prices[requestedGroup] || 0;
  const extraKm = Math.max(0, km - matched.maxKm);
  const extraHours = Math.max(0, hours - matched.maxHours);
  const overKmFee = extraKm * (vedanOverKm[requestedGroup] || 0);
  const overHourFee = extraHours > 0 ? (vedanOverHour[requestedGroup] || 0) : 0;
  return {
    packageLabel: `≤${matched.maxKm}km / ≤${matched.maxHours}h`,
    baseFare,
    overKmFee,
    overHourFee,
    totalFare: baseFare + overKmFee + overHourFee,
  };
}

function calculateTripProfit(trip) {
  if (trip.tripType === 'external') {
    return Number(trip.officialFare || 0) - Number(trip.commercialFare || 0);
  }
  return Number(trip.officialFare || 0) - Number(trip.tollCost || 0) - Number(trip.otherCost || 0);
}

function calculateQuote(form) {
  const km = Number(form.estimatedKm || 0);
  const pricing = kmPricing[form.vehicleType] || kmPricing['7 chỗ'];
  const pricePerKm = km > 300 ? pricing.over300 : pricing.normal;
  const litersPer100Km = fuelConsumption[form.vehicleType]?.litersPer100Km || 10;
  const liters = (km * litersPer100Km) / 100;
  const fuelCost = liters * Number(form.fuelPrice || 0);
  const tollFee = Number(form.tollFee || 0);
  const desiredProfit = Number(form.desiredProfit || 0);
  const kmBasedPrice = km * pricePerKm;
  const baseCost = fuelCost + tollFee;
  const suggestedPrice = baseCost + desiredProfit;
  return { pricePerKm, litersPer100Km, liters, fuelCost, tollFee, desiredProfit, kmBasedPrice, baseCost, suggestedPrice };
}

export default function SamAnhApp() {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [trips, setTrips] = useState([]);
  const [tourTrips, setTourTrips] = useState([]);
  const [tripForm, setTripForm] = useState(createTripForm());
  const [tourForm, setTourForm] = useState(createTourForm());
  const [quoteForm, setQuoteForm] = useState(createQuoteForm());

  useEffect(() => {
    const tripSaved = localStorage.getItem('sam-anh-trips-v3');
    const tourSaved = localStorage.getItem('sam-anh-tour-v3');
    if (tripSaved) setTrips(JSON.parse(tripSaved));
    if (tourSaved) setTourTrips(JSON.parse(tourSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem('sam-anh-trips-v3', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('sam-anh-tour-v3', JSON.stringify(tourTrips));
  }, [tourTrips]);

  const currentCustomer = customers.find((c) => c.id === tripForm.customerId) || customers[0];
  const currentVehicle = getVehicleById(tripForm.vehicleId, tripForm.tripType);
  const vehicleOptions = tripForm.tripType === 'company' ? companyVehicles : externalVehicles;
  const vedanCalc = currentCustomer.id === 'vedan' && tripForm.tripSourceType === 'flexible'
    ? calculateVedanFlexibleFare(tripForm.customerRequestedGroup, tripForm.distanceKm, tripForm.durationHours)
    : null;
  const quoteCalc = calculateQuote(quoteForm);

  const dashboard = useMemo(() => {
    const totalRevenue = trips.reduce((sum, t) => sum + Number(t.officialFare || 0), 0);
    const totalProfit = trips.reduce((sum, t) => sum + calculateTripProfit(t), 0);
    const companyRevenue = trips.filter((t) => t.tripType === 'company').reduce((sum, t) => sum + Number(t.officialFare || 0), 0);
    const externalRevenue = trips.filter((t) => t.tripType === 'external').reduce((sum, t) => sum + Number(t.officialFare || 0), 0);
    const companyProfit = trips.filter((t) => t.tripType === 'company').reduce((sum, t) => sum + calculateTripProfit(t), 0);
    const externalProfit = trips.filter((t) => t.tripType === 'external').reduce((sum, t) => sum + calculateTripProfit(t), 0);
    return { totalRevenue, totalProfit, companyRevenue, externalRevenue, companyProfit, externalProfit };
  }, [trips]);

  const reportData = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const month = today.slice(0, 7);
    const calcBlock = (list) => ({
      totalTrips: list.length,
      companyRevenue: list.filter((t) => t.tripType === 'company').reduce((s, t) => s + Number(t.officialFare || 0), 0),
      externalRevenue: list.filter((t) => t.tripType === 'external').reduce((s, t) => s + Number(t.officialFare || 0), 0),
      companyProfit: list.filter((t) => t.tripType === 'company').reduce((s, t) => s + calculateTripProfit(t), 0),
      externalProfit: list.filter((t) => t.tripType === 'external').reduce((s, t) => s + calculateTripProfit(t), 0),
      totalProfit: list.reduce((s, t) => s + calculateTripProfit(t), 0),
    });
    const todayTrips = trips.filter((t) => t.date === today);
    const monthTrips = trips.filter((t) => String(t.date || '').startsWith(month));
    const vehicleMap = {};
    const customerMap = {};
    trips.forEach((t) => {
      const vk = t.vehicleLabel || 'Chưa rõ xe';
      const ck = t.customerName || 'Chưa rõ khách';
      if (!vehicleMap[vk]) vehicleMap[vk] = { name: vk, totalTrips: 0, revenue: 0, profit: 0, tripType: t.tripType };
      if (!customerMap[ck]) customerMap[ck] = { name: ck, totalTrips: 0, revenue: 0, profit: 0 };
      vehicleMap[vk].totalTrips += 1;
      vehicleMap[vk].revenue += Number(t.officialFare || 0);
      vehicleMap[vk].profit += calculateTripProfit(t);
      customerMap[ck].totalTrips += 1;
      customerMap[ck].revenue += Number(t.officialFare || 0);
      customerMap[ck].profit += calculateTripProfit(t);
    });
    return {
      today: calcBlock(todayTrips),
      month: calcBlock(monthTrips),
      byVehicle: Object.values(vehicleMap).sort((a, b) => b.totalTrips - a.totalTrips),
      byCustomer: Object.values(customerMap).sort((a, b) => b.totalTrips - a.totalTrips),
    };
  }, [trips]);

  const setTripCustomer = (customerId) => {
    const customer = customers.find((c) => c.id === customerId) || customers[0];
    setTripForm((prev) => {
      const next = { ...prev, customerId };
      if (customer.id === 'olympus') {
        const preset = olympusRoutes[0];
        next.tripSourceType = 'preset';
        next.routePresetId = preset.id;
        next.routeName = preset.route;
        next.officialFare = preset.officialFare;
        next.commercialFare = prev.tripType === 'external' ? preset.commercialFare : 0;
      }
      if (customer.id === 'vedan') {
        next.tripSourceType = 'airport';
        next.customerRequestedGroup = '7 chỗ';
        next.routeName = 'Đưa đón sân bay';
        next.distanceKm = '';
        next.durationHours = '';
        next.officialFare = vedanAirportPrices['7 chỗ'];
        next.commercialFare = prev.tripType === 'external' ? '' : 0;
      }
      if (customer.id === 'other') {
        next.tripSourceType = 'custom';
        next.routeName = '';
        next.officialFare = '';
        next.commercialFare = prev.tripType === 'external' ? '' : 0;
      }
      return next;
    });
  };

  const setTripType = (tripType) => {
    const firstVehicle = tripType === 'company' ? companyVehicles[0] : externalVehicles[0];
    setTripForm((prev) => ({
      ...prev,
      tripType,
      vehicleId: firstVehicle.id,
      commercialFare: tripType === 'company' ? 0 : prev.commercialFare,
    }));
  };

  const setTripVehicle = (vehicleId) => {
    setTripForm((prev) => ({ ...prev, vehicleId: Number(vehicleId) }));
  };

  const setOlympusPreset = (routePresetId) => {
    const preset = olympusRoutes.find((r) => r.id === Number(routePresetId)) || olympusRoutes[0];
    setTripForm((prev) => ({
      ...prev,
      routePresetId: preset.id,
      routeName: preset.route,
      officialFare: preset.officialFare,
      commercialFare: prev.tripType === 'external' ? preset.commercialFare : 0,
    }));
  };

  const setTripSourceType = (tripSourceType) => {
    setTripForm((prev) => {
      const next = { ...prev, tripSourceType };
      if (prev.customerId === 'olympus') {
        if (tripSourceType === 'preset') {
          const preset = olympusRoutes.find((r) => r.id === prev.routePresetId) || olympusRoutes[0];
          next.routeName = preset.route;
          next.officialFare = preset.officialFare;
          next.commercialFare = prev.tripType === 'external' ? preset.commercialFare : 0;
        } else {
          next.routeName = '';
          next.officialFare = '';
          next.commercialFare = prev.tripType === 'external' ? '' : 0;
        }
      }
      if (prev.customerId === 'vedan') {
        if (tripSourceType === 'airport') {
          next.routeName = 'Đưa đón sân bay';
          next.officialFare = vedanAirportPrices[next.customerRequestedGroup] || 0;
        } else {
          next.routeName = '';
          next.officialFare = '';
          next.distanceKm = '';
          next.durationHours = '';
        }
      }
      return next;
    });
  };

  const updateTripField = (field, value) => {
    setTripForm((prev) => {
      const next = { ...prev, [field]: value };
      if (next.customerId === 'vedan') {
        if (field === 'customerRequestedGroup' && next.tripSourceType === 'airport') {
          next.officialFare = vedanAirportPrices[value] || 0;
        }
        if (next.tripSourceType === 'flexible') {
          next.officialFare = calculateVedanFlexibleFare(next.customerRequestedGroup, next.distanceKm, next.durationHours).totalFare;
        }
      }
      return next;
    });
  };

  const saveTrip = () => {
    const customer = customers.find((c) => c.id === tripForm.customerId) || customers[0];
    const vehicle = getVehicleById(tripForm.vehicleId, tripForm.tripType);
    const payload = {
      ...tripForm,
      id: Date.now(),
      customerName: customer.name,
      vehicleLabel: `${vehicle.model} - ${vehicle.plate}`,
      actualType: vehicle.actualType,
      pricingGroup: vehicle.pricingGroup,
      officialFare: Number(tripForm.officialFare || 0),
      commercialFare: Number(tripForm.commercialFare || 0),
      tollCost: Number(tripForm.tollCost || 0),
      otherCost: Number(tripForm.otherCost || 0),
      distanceKm: Number(tripForm.distanceKm || 0),
      durationHours: Number(tripForm.durationHours || 0),
    };
    setTrips((prev) => [payload, ...prev]);
    setTripForm(createTripForm());
    setSelectedTab('trips');
  };

  const deleteTrip = (id) => setTrips((prev) => prev.filter((t) => t.id !== id));

  const saveTourTrip = () => {
    setTourTrips((prev) => [{ ...tourForm, id: Date.now(), price: Number(tourForm.price || 0) }, ...prev]);
    setTourForm(createTourForm());
    setSelectedTab('tour');
  };

  const setQuoteRoute = (routeId) => {
    const route = tollRoutes.find((r) => r.id === Number(routeId)) || tollRoutes[0];
    setQuoteForm((prev) => ({
      ...prev,
      routeId: route.id,
      from: route.from,
      to: route.to,
      estimatedKm: route.km,
      tollFee: route.tolls[prev.vehicleType] || 0,
    }));
  };

  const updateQuoteField = (field, value) => {
    setQuoteForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'vehicleType' || field === 'routeId') {
        const route = tollRoutes.find((r) => r.id === Number(next.routeId)) || tollRoutes[0];
        next.tollFee = route.tolls[value] ?? route.tolls[next.vehicleType] ?? 0;
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-md mx-auto p-4 pb-28">
        <div className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur py-3">
          <div className="rounded-3xl bg-blue-700 text-white p-5 shadow-lg">
            <div className="text-sm opacity-90">Ứng dụng điều hành và báo giá</div>
            <h1 className="text-2xl font-bold mt-1">SAM ANH</h1>
            <p className="text-sm opacity-90 mt-2">Olympus • Vedan • Xe du lịch • Báo giá cước</p>
          </div>
        </div>

        {selectedTab === 'dashboard' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className={ui.card}><div className="text-xs text-slate-500">Tổng doanh thu</div><div className="text-lg font-semibold">{fmt(dashboard.totalRevenue)} đ</div></div>
              <div className={ui.card}><div className="text-xs text-slate-500">Tổng lợi nhuận</div><div className={`text-lg font-semibold ${dashboard.totalProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(dashboard.totalProfit)} đ</div></div>
              <div className={ui.card}><div className="text-xs text-slate-500">Doanh thu xe công ty</div><div className="text-lg font-semibold">{fmt(dashboard.companyRevenue)} đ</div></div>
              <div className={ui.card}><div className="text-xs text-slate-500">Doanh thu xe ngoài</div><div className="text-lg font-semibold">{fmt(dashboard.externalRevenue)} đ</div></div>
            </div>
            <div className={ui.card}>
              <div className="font-semibold mb-2">Khách hàng</div>
              <div className="space-y-2 text-sm">{customers.map((c) => <div key={c.id}>{c.name}</div>)}</div>
            </div>
          </div>
        )}

        {selectedTab === 'entry' && (
          <div className="mt-4 space-y-4">
            <div className={ui.card}>
              <h2 className="text-lg font-bold mb-4">Nhập chuyến xe</h2>
              <div className="space-y-3">
                <input className={ui.input} type="date" value={tripForm.date} onChange={(e) => updateTripField('date', e.target.value)} />
                <select className={ui.input} value={tripForm.customerId} onChange={(e) => setTripCustomer(e.target.value)}>{customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                <select className={ui.input} value={tripForm.tripType} onChange={(e) => setTripType(e.target.value)}><option value="company">Xe công ty</option><option value="external">Xe thuê ngoài</option></select>
                <select className={ui.input} value={tripForm.vehicleId} onChange={(e) => setTripVehicle(e.target.value)}>{vehicleOptions.map((v) => <option key={v.id} value={v.id}>{v.model} - {v.plate}</option>)}</select>
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">Loại xe thực tế: <span className="font-semibold text-slate-900">{currentVehicle.actualType}</span><br />Nhóm giá áp dụng: <span className="font-semibold text-slate-900">{currentVehicle.pricingGroup}</span></div>

                {currentCustomer.id === 'olympus' && (
                  <>
                    <select className={ui.input} value={tripForm.tripSourceType} onChange={(e) => setTripSourceType(e.target.value)}><option value="preset">Tuyến có sẵn</option><option value="custom">Tuyến phát sinh</option></select>
                    {tripForm.tripSourceType === 'preset' ? (
                      <select className={ui.input} value={tripForm.routePresetId} onChange={(e) => setOlympusPreset(e.target.value)}>{olympusRoutes.map((r) => <option key={r.id} value={r.id}>{r.route}</option>)}</select>
                    ) : (
                      <input className={ui.input} placeholder="Tên tuyến phát sinh" value={tripForm.routeName} onChange={(e) => updateTripField('routeName', e.target.value)} />
                    )}
                  </>
                )}

                {currentCustomer.id === 'vedan' && (
                  <>
                    <select className={ui.input} value={tripForm.tripSourceType} onChange={(e) => setTripSourceType(e.target.value)}><option value="airport">Đưa đón sân bay</option><option value="flexible">Chuyến thường linh hoạt</option></select>
                    <select className={ui.input} value={tripForm.customerRequestedGroup} onChange={(e) => updateTripField('customerRequestedGroup', e.target.value)}><option value="4 chỗ">Yêu cầu khách hàng: 4 chỗ</option><option value="7 chỗ">Yêu cầu khách hàng: 7 chỗ</option><option value="16 chỗ">Yêu cầu khách hàng: 16 chỗ</option></select>
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">Xe thực tế chạy: <span className="font-semibold text-slate-900">{currentVehicle.actualType}</span><br />Giá áp theo yêu cầu khách hàng: <span className="font-semibold text-slate-900">{tripForm.customerRequestedGroup}</span></div>
                    {tripForm.tripSourceType === 'airport' ? (
                      <div className="rounded-2xl bg-blue-50 p-3 text-sm text-blue-800">Giá sân bay áp theo yêu cầu khách hàng, không theo xe thực tế điều đi.</div>
                    ) : (
                      <>
                        <input className={ui.input} placeholder="Điểm đi" value={tripForm.pickup} onChange={(e) => updateTripField('pickup', e.target.value)} />
                        <input className={ui.input} placeholder="Điểm đến" value={tripForm.dropoff} onChange={(e) => updateTripField('dropoff', e.target.value)} />
                        <input className={ui.input} inputMode="numeric" placeholder="Số km thực tế" value={tripForm.distanceKm} onChange={(e) => updateTripField('distanceKm', e.target.value)} />
                        <input className={ui.input} inputMode="numeric" placeholder="Số giờ thực tế" value={tripForm.durationHours} onChange={(e) => updateTripField('durationHours', e.target.value)} />
                        <input className={ui.input} placeholder="Tên chuyến / ghi chú tuyến" value={tripForm.routeName} onChange={(e) => updateTripField('routeName', e.target.value)} />
                        {vedanCalc && <div className="rounded-2xl bg-blue-50 p-4 text-sm space-y-1"><div>Gói áp dụng: <span className="font-semibold">{vedanCalc.packageLabel}</span></div><div>Giá cơ bản: <span className="font-semibold">{fmt(vedanCalc.baseFare)} đ</span></div><div>Phụ thu km: <span className="font-semibold">{fmt(vedanCalc.overKmFee)} đ</span></div><div>Phụ thu giờ: <span className="font-semibold">{fmt(vedanCalc.overHourFee)} đ</span></div><div className="text-base font-bold text-blue-800">Tổng giá Vedan: {fmt(vedanCalc.totalFare)} đ</div></div>}
                      </>
                    )}
                  </>
                )}

                {currentCustomer.id === 'other' && <input className={ui.input} placeholder="Tên tuyến / chuyến" value={tripForm.routeName} onChange={(e) => updateTripField('routeName', e.target.value)} />}

                <input className={ui.input} inputMode="numeric" placeholder="Giá cước chính" value={tripForm.officialFare} onChange={(e) => updateTripField('officialFare', e.target.value)} />
                {tripForm.tripType === 'external' ? <input className={ui.input} inputMode="numeric" placeholder="Giá thương mại / thuê xe ngoài" value={tripForm.commercialFare} onChange={(e) => updateTripField('commercialFare', e.target.value)} /> : <><input className={ui.input} inputMode="numeric" placeholder="Phí cầu đường" value={tripForm.tollCost} onChange={(e) => updateTripField('tollCost', e.target.value)} /><input className={ui.input} inputMode="numeric" placeholder="Chi phí khác" value={tripForm.otherCost} onChange={(e) => updateTripField('otherCost', e.target.value)} /></>}
                <textarea className={`${ui.input} min-h-24`} placeholder="Ghi chú" value={tripForm.note} onChange={(e) => updateTripField('note', e.target.value)} />
                <div className="rounded-2xl bg-slate-50 p-4 text-sm"><div className="text-slate-500">Lợi nhuận tạm tính</div><div className={`font-bold text-lg mt-1 ${calculateTripProfit(tripForm) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(calculateTripProfit(tripForm))} đ</div></div>
                <button onClick={saveTrip} className="w-full rounded-2xl bg-blue-700 text-white font-semibold py-3">Lưu chuyến xe</button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'trips' && (
          <div className="mt-4 space-y-4">
            {trips.length === 0 && <div className={ui.card}>Chưa có chuyến xe nào.</div>}
            {trips.map((t) => {
              const profit = calculateTripProfit(t);
              return <div key={t.id} className={ui.card}><div className="flex items-start justify-between gap-3"><div><div className="text-sm text-slate-500">{t.date}</div><div className="font-bold mt-1">{t.customerName}</div><div className="text-sm mt-1">{t.routeName || `${t.pickup || ''} ${t.dropoff ? `→ ${t.dropoff}` : ''}`.trim() || 'Chuyến chưa đặt tên'}</div><div className="text-sm text-slate-600 mt-1">{t.vehicleLabel}</div></div><div className={`text-xs px-3 py-1 rounded-full ${t.tripType === 'company' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{t.tripType === 'company' ? 'Xe công ty' : 'Xe thuê ngoài'}</div></div><div className="grid grid-cols-2 gap-3 mt-4 text-sm"><div className="bg-slate-50 rounded-2xl p-3"><div className="text-slate-500 text-xs">Giá cước chính</div><div className="font-semibold">{fmt(t.officialFare)} đ</div></div>{t.tripType === 'external' ? <div className="bg-slate-50 rounded-2xl p-3"><div className="text-slate-500 text-xs">Giá thương mại</div><div className="font-semibold">{fmt(t.commercialFare)} đ</div></div> : <div className="bg-slate-50 rounded-2xl p-3"><div className="text-slate-500 text-xs">Cầu đường + khác</div><div className="font-semibold">{fmt(Number(t.tollCost || 0) + Number(t.otherCost || 0))} đ</div></div>}</div><div className="mt-3 text-sm text-slate-600">Nhóm giá: <span className="font-semibold text-slate-900">{t.pricingGroup}</span>{t.customerName === 'Vedan' ? <> • Yêu cầu KH: <span className="font-semibold text-slate-900">{t.customerRequestedGroup}</span></> : null}{t.distanceKm ? <> • Km: <span className="font-semibold text-slate-900">{t.distanceKm}</span></> : null}</div><div className={`mt-3 font-bold ${profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{profit >= 0 ? 'Lãi' : 'Lỗ'}: {fmt(profit)} đ</div><button onClick={() => deleteTrip(t.id)} className="mt-4 w-full rounded-2xl border border-red-200 text-red-600 py-2 font-semibold">Xóa chuyến</button></div>;
            })}
          </div>
        )}

        {selectedTab === 'report' && (
          <div className="mt-4 space-y-4">
            <div className={ui.card}><div className="font-bold mb-3">Báo cáo hôm nay</div><div className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Tổng chuyến</div><div className="font-semibold">{reportData.today.totalTrips}</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Tổng lợi nhuận</div><div className={`font-semibold ${reportData.today.totalProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(reportData.today.totalProfit)} đ</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Doanh thu xe công ty</div><div className="font-semibold">{fmt(reportData.today.companyRevenue)} đ</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Doanh thu xe ngoài</div><div className="font-semibold">{fmt(reportData.today.externalRevenue)} đ</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Lợi nhuận xe công ty</div><div className="font-semibold">{fmt(reportData.today.companyProfit)} đ</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Lợi nhuận xe ngoài</div><div className="font-semibold">{fmt(reportData.today.externalProfit)} đ</div></div></div></div>
            <div className={ui.card}><div className="font-bold mb-3">Báo cáo tháng này</div><div className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Tổng chuyến</div><div className="font-semibold">{reportData.month.totalTrips}</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Tổng lợi nhuận</div><div className={`font-semibold ${reportData.month.totalProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(reportData.month.totalProfit)} đ</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Doanh thu xe công ty</div><div className="font-semibold">{fmt(reportData.month.companyRevenue)} đ</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Doanh thu xe ngoài</div><div className="font-semibold">{fmt(reportData.month.externalRevenue)} đ</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Lợi nhuận xe công ty</div><div className="font-semibold">{fmt(reportData.month.companyProfit)} đ</div></div><div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-500 text-xs">Lợi nhuận xe ngoài</div><div className="font-semibold">{fmt(reportData.month.externalProfit)} đ</div></div></div></div>
            <div className={ui.card}><div className="font-bold mb-3">Thống kê theo xe</div><div className="space-y-2 text-sm">{reportData.byVehicle.length === 0 ? <div>Chưa có dữ liệu.</div> : reportData.byVehicle.map((item) => <div key={item.name} className="rounded-2xl bg-slate-50 p-3"><div className="font-semibold">{item.name}</div><div className="text-slate-600">{item.tripType === 'company' ? 'Xe công ty' : 'Xe ngoài'} • {item.totalTrips} chuyến</div><div className="text-slate-600">Doanh thu: {fmt(item.revenue)} đ</div><div className={`${item.profit >= 0 ? 'text-emerald-600' : 'text-red-600'} font-semibold`}>Lợi nhuận: {fmt(item.profit)} đ</div></div>)}</div></div>
            <div className={ui.card}><div className="font-bold mb-3">Thống kê theo khách hàng</div><div className="space-y-2 text-sm">{reportData.byCustomer.length === 0 ? <div>Chưa có dữ liệu.</div> : reportData.byCustomer.map((item) => <div key={item.name} className="rounded-2xl bg-slate-50 p-3"><div className="font-semibold">{item.name}</div><div className="text-slate-600">{item.totalTrips} chuyến</div><div className="text-slate-600">Doanh thu: {fmt(item.revenue)} đ</div><div className={`${item.profit >= 0 ? 'text-emerald-600' : 'text-red-600'} font-semibold`}>Lợi nhuận: {fmt(item.profit)} đ</div></div>)}</div></div>
          </div>
        )}

        {selectedTab === 'tour' && (
          <div className="mt-4 space-y-4">
            <div className={ui.card}>
              <div className="font-bold text-lg mb-4">Xe du lịch</div>
              <div className="space-y-3">
                <input className={ui.input} type="date" value={tourForm.date} onChange={(e) => setTourForm((p) => ({ ...p, date: e.target.value }))} />
                <select className={ui.input} value={tourForm.vehicleType} onChange={(e) => setTourForm((p) => ({ ...p, vehicleType: e.target.value }))}>{tourVehicleTypes.map((v) => <option key={v}>{v}</option>)}</select>
                <input className={ui.input} placeholder="Số xe" value={tourForm.vehicleCount} onChange={(e) => setTourForm((p) => ({ ...p, vehicleCount: e.target.value }))} />
                <input className={ui.input} placeholder="Tài xế" value={tourForm.driver} onChange={(e) => setTourForm((p) => ({ ...p, driver: e.target.value }))} />
                <input className={ui.input} placeholder="Điểm đón" value={tourForm.pickup} onChange={(e) => setTourForm((p) => ({ ...p, pickup: e.target.value }))} />
                <input className={ui.input} placeholder="Điểm đến" value={tourForm.dropoff} onChange={(e) => setTourForm((p) => ({ ...p, dropoff: e.target.value }))} />
                <input className={ui.input} inputMode="numeric" placeholder="Giá tiền" value={tourForm.price} onChange={(e) => setTourForm((p) => ({ ...p, price: e.target.value }))} />
                <input className={ui.input} placeholder="Người booking" value={tourForm.bookingPerson} onChange={(e) => setTourForm((p) => ({ ...p, bookingPerson: e.target.value }))} />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={tourForm.paid} onChange={(e) => setTourForm((p) => ({ ...p, paid: e.target.checked }))} />Đã thu tiền</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={tourForm.closed} onChange={(e) => setTourForm((p) => ({ ...p, closed: e.target.checked }))} />Chốt sổ</label>
                <button onClick={saveTourTrip} className="w-full rounded-2xl bg-emerald-600 text-white py-3 font-semibold">Lưu xe du lịch</button>
              </div>
            </div>
            <div className={ui.card}><div className="font-bold mb-3">Danh sách xe du lịch</div>{tourTrips.length === 0 ? <div>Chưa có dữ liệu.</div> : tourTrips.map((t) => <div key={t.id} className="rounded-2xl bg-slate-50 p-3 mb-2 text-sm"><div className="font-semibold">{t.date} • {t.vehicleType} • {t.vehicleCount} xe</div><div>{t.pickup} → {t.dropoff}</div><div>Tài xế: {t.driver}</div><div>Booking: {t.bookingPerson}</div><div>Giá: {fmt(t.price)} đ</div><div className="mt-1">{t.paid ? '✅ Đã thu tiền' : '❌ Chưa thu tiền'} • {t.closed ? '📒 Đã chốt sổ' : '📝 Chưa chốt'}</div></div>)}</div>
          </div>
        )}

        {selectedTab === 'quote' && (
          <div className="mt-4 space-y-4">
            <div className={ui.card}>
              <div className="font-bold text-lg mb-4">Báo giá xe du lịch</div>
              <div className="space-y-3">
                <select className={ui.input} value={quoteForm.routeId} onChange={(e) => setQuoteRoute(e.target.value)}>
                  {tollRoutes.map((r) => <option key={r.id} value={r.id}>{r.from} → {r.to}</option>)}
                </select>
                <select className={ui.input} value={quoteForm.vehicleType} onChange={(e) => updateQuoteField('vehicleType', e.target.value)}>
                  {['7 chỗ', '16 chỗ', '29 chỗ', '45 chỗ'].map((v) => <option key={v}>{v}</option>)}
                </select>
                <input className={ui.input} inputMode="numeric" placeholder="KM ước tính" value={quoteForm.estimatedKm} onChange={(e) => updateQuoteField('estimatedKm', e.target.value)} />
                <input className={ui.input} inputMode="numeric" placeholder="Giá nhiên liệu hiện tại" value={quoteForm.fuelPrice} onChange={(e) => updateQuoteField('fuelPrice', e.target.value)} />
                <input className={ui.input} inputMode="numeric" placeholder="Lợi nhuận mong muốn" value={quoteForm.desiredProfit} onChange={(e) => updateQuoteField('desiredProfit', e.target.value)} />
                <input className={ui.input} inputMode="numeric" placeholder="Phí cầu đường" value={quoteForm.tollFee} onChange={(e) => updateQuoteField('tollFee', e.target.value)} />
              </div>
            </div>
            <div className={ui.card}>
              <div className="font-bold mb-3">Kết quả báo giá</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between"><span className="text-slate-600">Tuyến</span><span className="font-semibold">{quoteForm.from} → {quoteForm.to}</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-600">Đơn giá/km</span><span className="font-semibold">{fmt(quoteCalc.pricePerKm)} đ</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-600">Định mức tiêu hao</span><span className="font-semibold">{quoteCalc.litersPer100Km}L / 100km</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-600">Số lít dự kiến</span><span className="font-semibold">{quoteCalc.liters.toFixed(1)} lít</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-600">Chi phí nhiên liệu</span><span className="font-semibold">{fmt(quoteCalc.fuelCost)} đ</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-600">Phí cầu đường</span><span className="font-semibold">{fmt(quoteCalc.tollFee)} đ</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-600">Chi phí cơ bản</span><span className="font-semibold">{fmt(quoteCalc.baseCost)} đ</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-600">Giá theo km</span><span className="font-semibold">{fmt(quoteCalc.kmBasedPrice)} đ</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-600">Lợi nhuận mong muốn</span><span className="font-semibold">{fmt(quoteCalc.desiredProfit)} đ</span></div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between"><span className="font-semibold">Giá báo tương đối</span><span className="text-lg font-bold text-blue-700">{fmt(Math.max(quoteCalc.kmBasedPrice, quoteCalc.suggestedPrice))} đ</span></div>
              </div>
            </div>
            <div className={ui.card}>
              <div className="font-bold mb-3">Bảng cầu đường chuẩn</div>
              <div className="space-y-2 text-sm max-h-80 overflow-auto">
                {tollRoutes.map((r) => <div key={r.id} className="rounded-2xl bg-slate-50 p-3"><div className="font-semibold">{r.from} → {r.to}</div><div className="text-slate-600">KM: {r.km}</div><div className="text-slate-600">7 chỗ: {fmt(r.tolls['7 chỗ'])} đ • 16 chỗ: {fmt(r.tolls['16 chỗ'])} đ</div><div className="text-slate-600">29 chỗ: {fmt(r.tolls['29 chỗ'])} đ • 45 chỗ: {fmt(r.tolls['45 chỗ'])} đ</div></div>)}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'master' && (
          <div className="mt-4 space-y-4">
            <div className={ui.card}><div className="font-bold mb-3">Xe công ty</div><div className="space-y-2 text-sm">{companyVehicles.map((v) => <div key={v.id} className="rounded-2xl bg-slate-50 p-3"><div className="font-semibold">{v.model} - {v.plate}</div><div className="text-slate-600">Loại xe: {v.actualType} • Nhóm giá: {v.pricingGroup}</div></div>)}</div></div>
            <div className={ui.card}><div className="font-bold mb-3">Xe ngoài</div><div className="space-y-2 text-sm">{externalVehicles.map((v) => <div key={v.id} className="rounded-2xl bg-slate-50 p-3"><div className="font-semibold">{v.model} - {v.plate}</div><div className="text-slate-600">Loại xe: {v.actualType} • Nhóm giá: {v.pricingGroup}</div></div>)}</div></div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
          <div className="max-w-md mx-auto grid grid-cols-7 text-center py-3 text-xs text-slate-600">
            <button onClick={() => setSelectedTab('dashboard')} className={selectedTab === 'dashboard' ? 'font-semibold text-blue-700' : ''}>Tổng quan</button>
            <button onClick={() => setSelectedTab('entry')} className={selectedTab === 'entry' ? 'font-semibold text-blue-700' : ''}>Nhập liệu</button>
            <button onClick={() => setSelectedTab('trips')} className={selectedTab === 'trips' ? 'font-semibold text-blue-700' : ''}>Chuyến xe</button>
            <button onClick={() => setSelectedTab('report')} className={selectedTab === 'report' ? 'font-semibold text-blue-700' : ''}>Báo cáo</button>
            <button onClick={() => setSelectedTab('tour')} className={selectedTab === 'tour' ? 'font-semibold text-blue-700' : ''}>Xe DL</button>
            <button onClick={() => setSelectedTab('quote')} className={selectedTab === 'quote' ? 'font-semibold text-blue-700' : ''}>Báo giá</button>
            <button onClick={() => setSelectedTab('master')} className={selectedTab === 'master' ? 'font-semibold text-blue-700' : ''}>Danh mục</button>
          </div>
        </div>
      </div>
    </div>
  );
}
