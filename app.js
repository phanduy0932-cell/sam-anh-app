const { useState, useMemo, useEffect } = React;

const fmt = (v) => Number(v || 0).toLocaleString("vi-VN");

const olympusRoutes = [
  { route: "Lục Quân", officialFare: 250000, commercialFare: 200000 },
  { route: "Hương Phước/Golf/Cổng 11/Bến Gỗ/Big C/FPT", officialFare: 400000, commercialFare: 300000 },
  { route: "Suối Tiên", officialFare: 450000, commercialFare: 300000 },
  { route: "Nhơn Trạch/Thái Lạc", officialFare: 300000, commercialFare: 200000 },
  { route: "Ấp Mới/Ngã tư 67", officialFare: 400000, commercialFare: 300000 },
  { route: "Ấp Mới 2 chiều", officialFare: 700000, commercialFare: 600000 },
  { route: "Tam Hiệp/Hố Nai/BV Đồng Nai/7B", officialFare: 500000, commercialFare: 350000 },
  { route: "Biên Hòa/Trảng Bom", officialFare: 550000, commercialFare: 400000 },
  { route: "Suối Tiên ca 1", officialFare: 900000, commercialFare: 700000 },
  { route: "Biên Hòa 2 lượt", officialFare: 950000, commercialFare: 700000 },
  { route: "Hàng Xanh/Cao tốc", officialFare: 800000, commercialFare: 650000 },
  { route: "Hàng Xanh/Cao tốc 2 chiều", officialFare: 1200000, commercialFare: 900000 },
  { route: "Tân Phú/Lotte LĐH/HTLO", officialFare: 1000000, commercialFare: 900000 },
  { route: "Tân Phú/Lotte LĐH/HTLO 2 chiều", officialFare: 1600000, commercialFare: 1200000 }
];

const companyVehicles = [
  "Hyundai Custin - 60K642.96",
  "Kia Carnival - 60K642.95",
  "Hyundai Custin - 60H340.53",
  "Innova - 60A526.56",
  "Xpander - 60K642.57",
  "Xpander - 60H149.50",
  "Ford Transit - 60H372.87",
  "Xe công ty khác"
];

const externalVehicles = [
  "Caren - 60K471.30",
  "Xpander - 60K280.88",
  "Xpander - 60K518.02",
  "Xpander - 99A540.25",
  "Fortuner - 60A349.26",
  "Xe khác"
];

const tollRoutes = [
  { from: "TP.HCM", to: "Vũng Tàu", km: 200, tolls: { "7 chỗ": 250000, "16 chỗ": 350000, "29 chỗ": 500000, "45 chỗ": 800000 } },
  { from: "Bệnh viện Biên Hòa", to: "Nha Trang", km: 420, tolls: { "7 chỗ": 900000, "16 chỗ": 1200000, "29 chỗ": 1500000, "45 chỗ": 2200000 } },
  { from: "Biên Hòa", to: "TP.HCM", km: 100, tolls: { "7 chỗ": 150000, "16 chỗ": 250000, "29 chỗ": 350000, "45 chỗ": 500000 } },
  { from: "Biên Hòa", to: "Đà Lạt", km: 620, tolls: { "7 chỗ": 1200000, "16 chỗ": 1700000, "29 chỗ": 2400000, "45 chỗ": 3400000 } },
  { from: "Biên Hòa", to: "Đà Nẵng", km: 900, tolls: { "7 chỗ": 1500000, "16 chỗ": 2200000, "29 chỗ": 3000000, "45 chỗ": 4500000 } },
  { from: "Biên Hòa", to: "Phan Thiết", km: 360, tolls: { "7 chỗ": 550000, "16 chỗ": 850000, "29 chỗ": 1200000, "45 chỗ": 1800000 } }
];

const fuelConsumption = {
  "7 chỗ": { liters: 10, fuel: "Xăng" },
  "16 chỗ": { liters: 12, fuel: "Dầu" },
  "29 chỗ": { liters: 22, fuel: "Dầu" },
  "45 chỗ": { liters: 35, fuel: "Dầu" }
};

const kmPrice = {
  "7 chỗ": { normal: 9000, long: 8100 },
  "16 chỗ": { normal: 15000, long: 13500 },
  "29 chỗ": { normal: 22500, long: 20250 },
  "45 chỗ": { normal: 35000, long: 31500 }
};

function App() {
  const [tab, setTab] = useState("dashboard");

  const [trips, setTrips] = useState(() => {
    try { return JSON.parse(localStorage.getItem("samAnhTripsFinal")) || []; }
    catch { return []; }
  });

  const [tourTrips, setTourTrips] = useState(() => {
    try { return JSON.parse(localStorage.getItem("samAnhTourFinal")) || []; }
    catch { return []; }
  });

  useEffect(() => localStorage.setItem("samAnhTripsFinal", JSON.stringify(trips)), [trips]);
  useEffect(() => localStorage.setItem("samAnhTourFinal", JSON.stringify(tourTrips)), [tourTrips]);

  const [tripForm, setTripForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    customer: "OLYMPUS",
    tripType: "company",
    routeType: "preset",
    route: olympusRoutes[0].route,
    vehicle: companyVehicles[0],
    officialFare: olympusRoutes[0].officialFare,
    commercialFare: olympusRoutes[0].commercialFare,
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

  const [quote, setQuote] = useState({
    routeIndex: 0,
    vehicleType: "7 chỗ",
    km: tollRoutes[0].km,
    toll: tollRoutes[0].tolls["7 chỗ"],
    fuelPrice: "",
    profit: ""
  });

  function profitTrip(t) {
    if (t.tripType === "external") return Number(t.officialFare || 0) - Number(t.commercialFare || 0);
    return Number(t.officialFare || 0) - Number(t.tollCost || 0) - Number(t.otherCost || 0);
  }

  const dashboard = useMemo(() => {
    const revenue = trips.reduce((s, t) => s + Number(t.officialFare || 0), 0);
    const profit = trips.reduce((s, t) => s + profitTrip(t), 0);
    return { revenue, profit, count: trips.length };
  }, [trips]);

  const quoteCalc = useMemo(() => {
    const km = Number(quote.km || 0);
    const vehicle = quote.vehicleType;
    const rate = km > 300 ? kmPrice[vehicle].long : kmPrice[vehicle].normal;
    const liters = km * fuelConsumption[vehicle].liters / 100;
    const fuelCost = liters * Number(quote.fuelPrice || 0);
    const toll = Number(quote.toll || 0);
    const profit = Number(quote.profit || 0);
    const kmTotal = km * rate;
    const costTotal = fuelCost + toll + profit;
    return { rate, liters, fuelCost, toll, kmTotal, costTotal, finalPrice: Math.max(kmTotal, costTotal) };
  }, [quote]);

  function saveTrip() {
    setTrips([{ ...tripForm, id: Date.now() }, ...trips]);
  }

  function saveTour() {
    setTourTrips([{ ...tourForm, id: Date.now(), price: Number(tourForm.price || 0) }, ...tourTrips]);
  }

  function setOlympusRoute(i) {
    const r = olympusRoutes[Number(i)];
    setTripForm({ ...tripForm, route: r.route, officialFare: r.officialFare, commercialFare: r.commercialFare });
  }

  function changeQuoteRoute(i) {
    const r = tollRoutes[Number(i)];
    setQuote({ ...quote, routeIndex: Number(i), km: r.km, toll: r.tolls[quote.vehicleType] });
  }

  function changeQuoteVehicle(v) {
    const r = tollRoutes[quote.routeIndex];
    setQuote({ ...quote, vehicleType: v, toll: r.tolls[v] });
  }

  const card = "bg-white rounded-3xl border border-slate-200 shadow-sm p-4";
  const input = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-md mx-auto p-4 pb-28">
        <div className="sticky top-0 z-10 bg-slate-100 py-3">
          <div className="rounded-3xl bg-blue-700 text-white p-5 shadow-lg">
            <h1 className="text-2xl font-bold">SAM ANH</h1>
            <p className="text-sm opacity-90 mt-2">Điều hành xe • Xe du lịch • Báo giá</p>
          </div>
        </div>

        {tab === "dashboard" && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className={card}><div className="text-xs text-slate-500">Tổng chuyến</div><div className="text-lg font-semibold">{dashboard.count}</div></div>
            <div className={card}><div className="text-xs text-slate-500">Doanh thu</div><div className="text-lg font-semibold">{fmt(dashboard.revenue)} đ</div></div>
            <div className={card}><div className="text-xs text-slate-500">Lợi nhuận</div><div className="text-lg font-semibold text-emerald-600">{fmt(dashboard.profit)} đ</div></div>
            <div className={card}><div className="text-xs text-slate-500">Xe du lịch</div><div className="text-lg font-semibold">{tourTrips.length}</div></div>
          </div>
        )}

        {tab === "entry" && (
          <div className="mt-4 space-y-4">
            <div className={card}>
              <h2 className="text-lg font-bold mb-4">Nhập chuyến xe</h2>
              <div className="space-y-3">
                <input className={input} type="date" value={tripForm.date} onChange={e => setTripForm({ ...tripForm, date: e.target.value })} />
                <select className={input} value={tripForm.customer} onChange={e => setTripForm({ ...tripForm, customer: e.target.value })}>
                  <option>OLYMPUS</option><option>Vedan</option><option>Khách khác</option>
                </select>
                <select className={input} value={tripForm.tripType} onChange={e => setTripForm({ ...tripForm, tripType: e.target.value, vehicle: e.target.value === "company" ? companyVehicles[0] : externalVehicles[0] })}>
                  <option value="company">Xe công ty</option><option value="external">Xe thuê ngoài</option>
                </select>
                <select className={input} value={tripForm.vehicle} onChange={e => setTripForm({ ...tripForm, vehicle: e.target.value })}>
                  {(tripForm.tripType === "company" ? companyVehicles : externalVehicles).map(v => <option key={v}>{v}</option>)}
                </select>

                {tripForm.customer === "OLYMPUS" && (
                  <>
                    <select className={input} value={tripForm.routeType} onChange={e => setTripForm({ ...tripForm, routeType: e.target.value })}>
                      <option value="preset">Tuyến có sẵn</option><option value="custom">Tuyến phát sinh</option>
                    </select>
                    {tripForm.routeType === "preset" ? (
                      <select className={input} onChange={e => setOlympusRoute(e.target.value)}>
                        {olympusRoutes.map((r, i) => <option key={i} value={i}>{r.route}</option>)}
                      </select>
                    ) : (
                      <input className={input} placeholder="Tên tuyến phát sinh" value={tripForm.route} onChange={e => setTripForm({ ...tripForm, route: e.target.value })} />
                    )}
                  </>
                )}

                {tripForm.customer !== "OLYMPUS" && (
                  <input className={input} placeholder="Tên tuyến / chuyến" value={tripForm.route} onChange={e => setTripForm({ ...tripForm, route: e.target.value })} />
                )}

                <input className={input} inputMode="numeric" placeholder="Giá cước chính" value={tripForm.officialFare} onChange={e => setTripForm({ ...tripForm, officialFare: e.target.value })} />
                {tripForm.tripType === "external" ? (
                  <input className={input} inputMode="numeric" placeholder="Giá thuê ngoài" value={tripForm.commercialFare} onChange={e => setTripForm({ ...tripForm, commercialFare: e.target.value })} />
                ) : (
                  <>
                    <input className={input} inputMode="numeric" placeholder="Phí cầu đường" value={tripForm.tollCost} onChange={e => setTripForm({ ...tripForm, tollCost: e.target.value })} />
                    <input className={input} inputMode="numeric" placeholder="Chi phí khác" value={tripForm.otherCost} onChange={e => setTripForm({ ...tripForm, otherCost: e.target.value })} />
                  </>
                )}
                <button onClick={saveTrip} className="w-full rounded-2xl bg-blue-700 text-white font-semibold py-3">Lưu chuyến</button>
              </div>
            </div>
          </div>
        )}

        {tab === "trips" && (
          <div className="mt-4 space-y-4">
            {trips.map(t => (
              <div className={card} key={t.id}>
                <div className="font-bold">{t.customer}</div>
                <div className="text-sm">{t.route}</div>
                <div className="text-sm text-slate-600">{t.vehicle}</div>
                <div>Giá: {fmt(t.officialFare)} đ</div>
                <div className={profitTrip(t) >= 0 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>Lãi: {fmt(profitTrip(t))} đ</div>
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
                  <option>4 chỗ</option><option>7 chỗ</option><option>16 chỗ</option><option>29 chỗ</option><option>45 chỗ</option>
                </select>
                <input className={input} placeholder="Số xe" value={tourForm.vehicleCount} onChange={e => setTourForm({ ...tourForm, vehicleCount: e.target.value })} />
                <input className={input} placeholder="Tài xế" value={tourForm.driver} onChange={e => setTourForm({ ...tourForm, driver: e.target.value })} />
                <input className={input} placeholder="Điểm đón" value={tourForm.pickup} onChange={e => setTourForm({ ...tourForm, pickup: e.target.value })} />
                <input className={input} placeholder="Điểm đến" value={tourForm.dropoff} onChange={e => setTourForm({ ...tourForm, dropoff: e.target.value })} />
                <input className={input} inputMode="numeric" placeholder="Giá tiền" value={tourForm.price} onChange={e => setTourForm({ ...tourForm, price: e.target.value })} />
                <input className={input} placeholder="Người booking" value={tourForm.bookingPerson} onChange={e => setTourForm({ ...tourForm, bookingPerson: e.target.value })} />
                <label><input type="checkbox" checked={tourForm.paid} onChange={e => setTourForm({ ...tourForm, paid: e.target.checked })} /> Đã thu tiền</label>
                <label><input type="checkbox" checked={tourForm.closed} onChange={e => setTourForm({ ...tourForm, closed: e.target.checked })} /> Chốt sổ</label>
                <button onClick={saveTour} className="w-full rounded-2xl bg-emerald-600 text-white font-semibold py-3">Lưu xe du lịch</button>
              </div>
            </div>
            {tourTrips.map(t => (
              <div className={card} key={t.id}>
                <div className="font-bold">{t.date} • {t.vehicleType} • {t.vehicleCount} xe</div>
                <div>{t.pickup} → {t.dropoff}</div>
                <div>Tài xế: {t.driver}</div>
                <div>Booking: {t.bookingPerson}</div>
                <div>Giá: {fmt(t.price)} đ</div>
                <div>{t.paid ? "✅ Đã thu" : "❌ Chưa thu"} • {t.closed ? "📒 Đã chốt" : "📝 Chưa chốt"}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "quote" && (
          <div className="mt-4 space-y-4">
            <div className={card}>
              <h2 className="text-lg font-bold mb-4">Báo giá xe du lịch</h2>
              <div className="space-y-3">
                <select className={input} value={quote.routeIndex} onChange={e => changeQuoteRoute(e.target.value)}>
                  {tollRoutes.map((r, i) => <option key={i} value={i}>{r.from} → {r.to}</option>)}
                </select>
                <select className={input} value={quote.vehicleType} onChange={e => changeQuoteVehicle(e.target.value)}>
                  <option>7 chỗ</option><option>16 chỗ</option><option>29 chỗ</option><option>45 chỗ</option>
                </select>
                <input className={input} inputMode="numeric" placeholder="KM" value={quote.km} onChange={e => setQuote({ ...quote, km: e.target.value })} />
                <input className={input} inputMode="numeric" placeholder="Phí cầu đường" value={quote.toll} onChange={e => setQuote({ ...quote, toll: e.target.value })} />
                <input className={input} inputMode="numeric" placeholder="Giá nhiên liệu hiện tại" value={quote.fuelPrice} onChange={e => setQuote({ ...quote, fuelPrice: e.target.value })} />
                <input className={input} inputMode="numeric" placeholder="Lợi nhuận mong muốn" value={quote.profit} onChange={e => setQuote({ ...quote, profit: e.target.value })} />
              </div>
            </div>

            <div className={card}>
              <div className="font-bold mb-3">Kết quả báo giá</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Đơn giá/km</span><b>{fmt(quoteCalc.rate)} đ</b></div>
                <div className="flex justify-between"><span>Tiêu hao</span><b>{fuelConsumption[quote.vehicleType].liters}L / 100km</b></div>
                <div className="flex justify-between"><span>Số lít</span><b>{quoteCalc.liters.toFixed(1)} lít</b></div>
                <div className="flex justify-between"><span>Nhiên liệu</span><b>{fmt(quoteCalc.fuelCost)} đ</b></div>
                <div className="flex justify-between"><span>Cầu đường</span><b>{fmt(quoteCalc.toll)} đ</b></div>
                <div className="flex justify-between"><span>Giá theo km</span><b>{fmt(quoteCalc.kmTotal)} đ</b></div>
                <div className="pt-2 border-t flex justify-between"><span className="font-bold">Giá báo tương đối</span><b className="text-blue-700 text-lg">{fmt(quoteCalc.finalPrice)} đ</b></div>
              </div>
            </div>
          </div>
        )}

        {tab === "report" && (
          <div className="mt-4">
            <div className={card}>
              <h2 className="font-bold mb-3">Báo cáo</h2>
              <div>Tổng chuyến: {trips.length}</div>
              <div>Doanh thu: {fmt(dashboard.revenue)} đ</div>
              <div>Lợi nhuận: {fmt(dashboard.profit)} đ</div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
          <div className="max-w-md mx-auto grid grid-cols-6 text-center py-3 text-xs text-slate-600">
            <button onClick={() => setTab("dashboard")}>Tổng quan</button>
            <button onClick={() => setTab("entry")}>Nhập liệu</button>
            <button onClick={() => setTab("trips")}>Chuyến xe</button>
            <button onClick={() => setTab("tour")}>Xe DL</button>
            <button onClick={() => setTab("quote")}>Báo giá</button>
            <button onClick={() => setTab("report")}>Báo cáo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
