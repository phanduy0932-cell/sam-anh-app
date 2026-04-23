const { useState, useMemo } = React;

function App() {
  const [tab, setTab] = useState("dashboard");

  const [trips, setTrips] = useState([
    {
      id: 1,
      date: "2026-04-24",
      customer: "OLYMPUS",
      tripType: "company",
      route: "Lục Quân",
      vehicle: "Hyundai Custin - 60K642.96",
      officialFare: 250000,
      tollCost: 50000,
      otherCost: 20000
    },
    {
      id: 2,
      date: "2026-04-24",
      customer: "Vedan",
      tripType: "external",
      route: "Đưa đón sân bay",
      vehicle: "Xpander - 60K280.88",
      officialFare: 1000000,
      commercialFare: 800000
    }
  ]);

  const [tourTrips, setTourTrips] = useState([
    {
      id: 1,
      date: "2026-04-24",
      vehicleType: "29 chỗ",
      vehicleCount: "1",
      driver: "Nguyễn Văn A",
      pickup: "Biên Hòa",
      dropoff: "Nha Trang",
      price: 4500000,
      bookingPerson: "Duy",
      paid: true,
      closed: false
    }
  ]);

  const [tripForm, setTripForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    customer: "OLYMPUS",
    tripType: "company",
    route: "",
    vehicle: "",
    officialFare: "",
    commercialFare: "",
    tollCost: "",
    otherCost: ""
  });

  const [tourForm, setTourForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    vehicleType: "7 chỗ",
    vehicleCount: "",
    driver: "",
    pickup: "",
    dropoff: "",
    price: "",
    bookingPerson: "",
    paid: false,
    closed: false
  });

  const [quoteForm, setQuoteForm] = useState({
    from: "TP.HCM",
    to: "Vũng Tàu",
    vehicleType: "7 chỗ",
    estimatedKm: 200,
    tollFee: 250000,
    fuelPrice: "",
    desiredProfit: ""
  });

  const fuelConsumption = {
    "7 chỗ": 10,
    "16 chỗ": 12,
    "29 chỗ": 22,
    "45 chỗ": 35
  };

  const kmPricing = {
    "7 chỗ": { normal: 9000, over300: 8100 },
    "16 chỗ": { normal: 15000, over300: 13500 },
    "29 chỗ": { normal: 22500, over300: 20250 },
    "45 chỗ": { normal: 35000, over300: 31500 }
  };

  const tollRoutes = [
    { from: "TP.HCM", to: "Vũng Tàu", km: 200, tolls: { "7 chỗ": 250000, "16 chỗ": 350000, "29 chỗ": 500000, "45 chỗ": 800000 } },
    { from: "Bệnh viện Biên Hòa", to: "Nha Trang", km: 420, tolls: { "7 chỗ": 900000, "16 chỗ": 1200000, "29 chỗ": 1500000, "45 chỗ": 2200000 } },
    { from: "Biên Hòa", to: "TP.HCM", km: 100, tolls: { "7 chỗ": 150000, "16 chỗ": 250000, "29 chỗ": 350000, "45 chỗ": 500000 } }
  ];

  function fmt(v) {
    return Number(v || 0).toLocaleString("vi-VN");
  }

  function tripProfit(t) {
    if (t.tripType === "external") {
      return Number(t.officialFare || 0) - Number(t.commercialFare || 0);
    }
    return Number(t.officialFare || 0) - Number(t.tollCost || 0) - Number(t.otherCost || 0);
  }

  const summary = useMemo(() => {
    const totalRevenue = trips.reduce((s, t) => s + Number(t.officialFare || 0), 0);
    const totalProfit = trips.reduce((s, t) => s + tripProfit(t), 0);
    return { totalRevenue, totalProfit, totalTrips: trips.length };
  }, [trips]);

  const quoteCalc = useMemo(() => {
    const km = Number(quoteForm.estimatedKm || 0);
    const rate = km > 300 ? kmPricing[quoteForm.vehicleType].over300 : kmPricing[quoteForm.vehicleType].normal;
    const liters = km * fuelConsumption[quoteForm.vehicleType] / 100;
    const fuelCost = liters * Number(quoteForm.fuelPrice || 0);
    const tollFee = Number(quoteForm.tollFee || 0);
    const desiredProfit = Number(quoteForm.desiredProfit || 0);
    const kmPrice = km * rate;
    const baseCost = fuelCost + tollFee;
    const suggestedPrice = baseCost + desiredProfit;
    return { rate, liters, fuelCost, tollFee, baseCost, kmPrice, suggestedPrice };
  }, [quoteForm]);

  function saveTrip() {
    setTrips([
      {
        ...tripForm,
        id: Date.now(),
        officialFare: Number(tripForm.officialFare || 0),
        commercialFare: Number(tripForm.commercialFare || 0),
        tollCost: Number(tripForm.tollCost || 0),
        otherCost: Number(tripForm.otherCost || 0)
      },
      ...trips
    ]);
    setTripForm({
      date: new Date().toISOString().slice(0, 10),
      customer: "OLYMPUS",
      tripType: "company",
      route: "",
      vehicle: "",
      officialFare: "",
      commercialFare: "",
      tollCost: "",
      otherCost: ""
    });
  }

  function saveTourTrip() {
    setTourTrips([
      {
        ...tourForm,
        id: Date.now(),
        price: Number(tourForm.price || 0)
      },
      ...tourTrips
    ]);
    setTourForm({
      date: new Date().toISOString().slice(0, 10),
      vehicleType: "7 chỗ",
      vehicleCount: "",
      driver: "",
      pickup: "",
      dropoff: "",
      price: "",
      bookingPerson: "",
      paid: false,
      closed: false
    });
  }

  function handleRouteChange(index) {
    const r = tollRoutes[index];
    setQuoteForm({
      ...quoteForm,
      from: r.from,
      to: r.to,
      estimatedKm: r.km,
      tollFee: r.tolls[quoteForm.vehicleType]
    });
  }

  function handleVehicleTypeChange(v) {
    const route = tollRoutes.find(
      r => r.from === quoteForm.from && r.to === quoteForm.to
    );
    setQuoteForm({
      ...quoteForm,
      vehicleType: v,
      tollFee: route ? route.tolls[v] : quoteForm.tollFee
    });
  }

  const card = "bg-white rounded-3xl border border-slate-200 shadow-sm p-4";
  const input = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-md mx-auto p-4 pb-28">
        <div className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur py-3">
          <div className="rounded-3xl bg-blue-700 text-white p-5 shadow-lg">
            <h1 className="text-2xl font-bold">SAM ANH</h1>
            <p className="text-sm opacity-90 mt-2">Bản chạy ổn định để kiểm tra</p>
          </div>
        </div>

        {tab === "dashboard" && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className={card}>
                <div className="text-xs text-slate-500">Tổng chuyến</div>
                <div className="text-lg font-semibold">{summary.totalTrips}</div>
              </div>
              <div className={card}>
                <div className="text-xs text-slate-500">Doanh thu</div>
                <div className="text-lg font-semibold">{fmt(summary.totalRevenue)} đ</div>
              </div>
              <div className={card}>
                <div className="text-xs text-slate-500">Lợi nhuận</div>
                <div className="text-lg font-semibold text-emerald-600">{fmt(summary.totalProfit)} đ</div>
              </div>
              <div className={card}>
                <div className="text-xs text-slate-500">Xe du lịch</div>
                <div className="text-lg font-semibold">{tourTrips.length} chuyến</div>
              </div>
            </div>
          </div>
        )}

        {tab === "entry" && (
          <div className="mt-4">
            <div className={card}>
              <h2 className="text-lg font-bold mb-4">Nhập chuyến xe</h2>
              <div className="space-y-3">
                <input className={input} type="date" value={tripForm.date} onChange={e => setTripForm({ ...tripForm, date: e.target.value })} />
                <select className={input} value={tripForm.customer} onChange={e => setTripForm({ ...tripForm, customer: e.target.value })}>
                  <option>OLYMPUS</option>
                  <option>Vedan</option>
                  <option>Khách khác</option>
                </select>
                <select className={input} value={tripForm.tripType} onChange={e => setTripForm({ ...tripForm, tripType: e.target.value })}>
                  <option value="company">Xe công ty</option>
                  <option value="external">Xe thuê ngoài</option>
                </select>
                <input className={input} placeholder="Tên tuyến / chuyến" value={tripForm.route} onChange={e => setTripForm({ ...tripForm, route: e.target.value })} />
                <input className={input} placeholder="Xe" value={tripForm.vehicle} onChange={e => setTripForm({ ...tripForm, vehicle: e.target.value })} />
                <input className={input} placeholder="Giá cước chính" value={tripForm.officialFare} onChange={e => setTripForm({ ...tripForm, officialFare: e.target.value })} />
                {tripForm.tripType === "external" ? (
                  <input className={input} placeholder="Giá thuê ngoài" value={tripForm.commercialFare} onChange={e => setTripForm({ ...tripForm, commercialFare: e.target.value })} />
                ) : (
                  <>
                    <input className={input} placeholder="Phí cầu đường" value={tripForm.tollCost} onChange={e => setTripForm({ ...tripForm, tollCost: e.target.value })} />
                    <input className={input} placeholder="Chi phí khác" value={tripForm.otherCost} onChange={e => setTripForm({ ...tripForm, otherCost: e.target.value })} />
                  </>
                )}
                <button onClick={saveTrip} className="w-full rounded-2xl bg-blue-700 text-white font-semibold py-3">
                  Lưu chuyến xe
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "trips" && (
          <div className="mt-4 space-y-4">
            {trips.map(t => (
              <div key={t.id} className={card}>
                <div className="font-bold">{t.customer}</div>
                <div className="text-sm">{t.route}</div>
                <div className="text-sm text-slate-600">{t.vehicle}</div>
                <div className="mt-2 text-sm">Giá cước: {fmt(t.officialFare)} đ</div>
                <div className="font-bold text-emerald-600">Lãi: {fmt(tripProfit(t))} đ</div>
              </div>
            ))}
          </div>
        )}

        {tab === "tour" && (
          <div className="mt-4 space-y-4">
            <div className={card}>
              <h2 className="text-lg font-bold mb-4">Xe du lịch</h2>
              <div className="space-y-3">
                <input className={input} type="date" value={tourForm.date} onChange={e => setTourForm({ ...tourForm, date: e.target.value })} />
                <select className={input} value={tourForm.vehicleType} onChange={e => setTourForm({ ...tourForm, vehicleType: e.target.value })}>
                  <option>4 chỗ</option>
                  <option>7 chỗ</option>
                  <option>16 chỗ</option>
                  <option>29 chỗ</option>
                  <option>45 chỗ</option>
                </select>
                <input className={input} placeholder="Số xe" value={tourForm.vehicleCount} onChange={e => setTourForm({ ...tourForm, vehicleCount: e.target.value })} />
                <input className={input} placeholder="Tài xế" value={tourForm.driver} onChange={e => setTourForm({ ...tourForm, driver: e.target.value })} />
                <input className={input} placeholder="Điểm đón" value={tourForm.pickup} onChange={e => setTourForm({ ...tourForm, pickup: e.target.value })} />
                <input className={input} placeholder="Điểm đến" value={tourForm.dropoff} onChange={e => setTourForm({ ...tourForm, dropoff: e.target.value })} />
                <input className={input} placeholder="Giá tiền" value={tourForm.price} onChange={e => setTourForm({ ...tourForm, price: e.target.value })} />
                <input className={input} placeholder="Người booking" value={tourForm.bookingPerson} onChange={e => setTourForm({ ...tourForm, bookingPerson: e.target.value })} />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={tourForm.paid} onChange={e => setTourForm({ ...tourForm, paid: e.target.checked })} />
                  Đã thu tiền
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={tourForm.closed} onChange={e => setTourForm({ ...tourForm, closed: e.target.checked })} />
                  Chốt sổ
                </label>
                <button onClick={saveTourTrip} className="w-full rounded-2xl bg-emerald-600 text-white font-semibold py-3">
                  Lưu xe du lịch
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "quote" && (
          <div className="mt-4 space-y-4">
            <div className={card}>
              <h2 className="text-lg font-bold mb-4">Báo giá xe du lịch</h2>
              <div className="space-y-3">
                <select className={input} onChange={e => handleRouteChange(e.target.value)}>
                  {tollRoutes.map((r, i) => (
                    <option key={i} value={i}>{r.from} → {r.to}</option>
                  ))}
                </select>
                <select className={input} value={quoteForm.vehicleType} onChange={e => handleVehicleTypeChange(e.target.value)}>
                  <option>7 chỗ</option>
                  <option>16 chỗ</option>
                  <option>29 chỗ</option>
                  <option>45 chỗ</option>
                </select>
                <input className={input} placeholder="KM ước tính" value={quoteForm.estimatedKm} onChange={e => setQuoteForm({ ...quoteForm, estimatedKm: e.target.value })} />
                <input className={input} placeholder="Giá nhiên liệu hiện tại" value={quoteForm.fuelPrice} onChange={e => setQuoteForm({ ...quoteForm, fuelPrice: e.target.value })} />
                <input className={input} placeholder="Lợi nhuận mong muốn" value={quoteForm.desiredProfit} onChange={e => setQuoteForm({ ...quoteForm, desiredProfit: e.target.value })} />
                <input className={input} placeholder="Phí cầu đường" value={quoteForm.tollFee} onChange={e => setQuoteForm({ ...quoteForm, tollFee: e.target.value })} />
              </div>
            </div>

            <div className={card}>
              <div className="font-bold mb-3">Kết quả báo giá</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between"><span>Tuyến</span><span className="font-semibold">{quoteForm.from} → {quoteForm.to}</span></div>
                <div className="flex items-center justify-between"><span>Đơn giá/km</span><span className="font-semibold">{fmt(quoteCalc.rate)} đ</span></div>
                <div className="flex items-center justify-between"><span>Số lít dự kiến</span><span className="font-semibold">{quoteCalc.liters.toFixed(1)} lít</span></div>
                <div className="flex items-center justify-between"><span>Chi phí nhiên liệu</span><span className="font-semibold">{fmt(quoteCalc.fuelCost)} đ</span></div>
                <div className="flex items-center justify-between"><span>Phí cầu đường</span><span className="font-semibold">{fmt(quoteCalc.tollFee)} đ</span></div>
                <div className="flex items-center justify-between"><span>Chi phí cơ bản</span><span className="font-semibold">{fmt(quoteCalc.baseCost)} đ</span></div>
                <div className="flex items-center justify-between"><span>Giá theo km</span><span className="font-semibold">{fmt(quoteCalc.kmPrice)} đ</span></div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-semibold">Giá báo tương đối</span>
                  <span className="text-lg font-bold text-blue-700">{fmt(Math.max(quoteCalc.kmPrice, quoteCalc.suggestedPrice))} đ</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "report" && (
          <div className="mt-4">
            <div className={card}>
              <div className="font-bold mb-3">Báo cáo</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between"><span>Tổng chuyến</span><span className="font-semibold">{trips.length}</span></div>
                <div className="flex items-center justify-between"><span>Doanh thu</span><span className="font-semibold">{fmt(summary.totalRevenue)} đ</span></div>
                <div className="flex items-center justify-between"><span>Lợi nhuận</span><span className="font-semibold">{fmt(summary.totalProfit)} đ</span></div>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
          <div className="max-w-md mx-auto grid grid-cols-6 text-center py-3 text-xs text-slate-600">
            <button onClick={() => setTab("dashboard")} className={tab === "dashboard" ? "font-semibold text-blue-700" : ""}>Tổng quan</button>
            <button onClick={() => setTab("entry")} className={tab === "entry" ? "font-semibold text-blue-700" : ""}>Nhập liệu</button>
            <button onClick={() => setTab("trips")} className={tab === "trips" ? "font-semibold text-blue-700" : ""}>Chuyến xe</button>
            <button onClick={() => setTab("tour")} className={tab === "tour" ? "font-semibold text-blue-700" : ""}>Xe DL</button>
            <button onClick={() => setTab("quote")} className={tab === "quote" ? "font-semibold text-blue-700" : ""}>Báo giá</button>
            <button onClick={() => setTab("report")} className={tab === "report" ? "font-semibold text-blue-700" : ""}>Báo cáo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
