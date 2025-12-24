import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import toast from "react-hot-toast";
import DaySelector from "./day-selector";
import DayPlanningControls from "./day-planning-control";
import { Loader } from "../../components";
import { DayActions } from "../components/day-action";
import { ActivityGrid } from "../components/activity-grid";
import { ActivityTabs } from "../components/activity-tabs";
import { HotelSection } from "../components/hotel-section";
import { CitySelector } from "../components/city-selector";
import { DayHeader } from "../components/day-header";
import type { IActivity, ITripDayLocal } from "../trip.types";

const DayPlanning: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setCompleted } = useOutletContext<any>();
  const { tripId, startDate, endDate, countryId } = tripData || {};

  const [tripDays, setTripDays] = useState<ITripDayLocal[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allCities, setAllCities] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [hotels, setHotels] = useState<IActivity[]>([]);
  const [activities, setActivities] = useState<{
    day: IActivity[];
    night: IActivity[];
    cafe: IActivity[];
  }>({ day: [], night: [], cafe: [] });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hotelSearch, setHotelSearch] = useState("");
  const [minStars, setMinStars] = useState(0);
  const [activeTab, setActiveTab] = useState<"day" | "night" | "cafe">("day");

  const selectedDay = tripDays[selectedIndex];

  const selectedHotel = useMemo(() => {
    if (!selectedDay?.hotelId) return null;
    return hotels.find((h) => h.id === selectedDay.hotelId) || null;
  }, [hotels, selectedDay?.hotelId]);

  // === Օրերի ստեղծում ===
  useEffect(() => {
    if (!startDate || !endDate || !tripId) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days: ITripDayLocal[] = [];
    let current = new Date(start);
    while (current <= end) {
      days.push({
        day: days.length + 1,
        date: current.toISOString().slice(0, 10),
        cityId: null,
        hotelId: null,
        tripDayId: null,
        dayActivities: [],
        nightActivities: [],
        cafes: [],
      });
      current.setDate(current.getDate() + 1);
    }
    setTripDays(days);
  }, [startDate, endDate, tripId]);

  // === Քաղաքների բեռնում ===
  useEffect(() => {
    if (!countryId) return;
    Axios.get(`/city/all/${countryId}`)
      .then((res) => setAllCities(res.data.payload || []))
      .catch(() => toast.error("Չհաջողվեց բեռնել քաղաքները"));
  }, [countryId]);

  // === Մետատվյալների բեռնում ===
  useEffect(() => {
    if (!selectedDay?.cityId) {
      setHotels([]);
      setActivities({ day: [], night: [], cafe: [] });
      setHotelSearch("");
      setMinStars(0);
      return;
    }

    setLoading(true);
    const cityId = selectedDay.cityId;

    Promise.allSettled([
      Axios.get(`/metadata/hotels?id=${cityId}`),
      Axios.get(`/metadata/activities?id=${cityId}&type=day`),
      Axios.get(`/metadata/night-life?id=${cityId}`),
      Axios.get(`/metadata/activities?id=${cityId}&type=cafe`),
    ])
      .then((results) => {
        setHotels(
          results[0].status === "fulfilled"
            ? results[0].value.data.payload || []
            : []
        );
        setActivities({
          day:
            results[1].status === "fulfilled"
              ? results[1].value.data.payload || []
              : [],
          night:
            results[2].status === "fulfilled"
              ? results[2].value.data.payload || []
              : [],
          cafe:
            results[3].status === "fulfilled"
              ? results[3].value.data.payload || []
              : [],
        });
      })
      .catch(() => toast.error("Չհաջողվեց բեռնել տվյալները"))
      .finally(() => setLoading(false));
  }, [selectedDay?.cityId]);

  const filteredHotels = useMemo(() => {
    return hotels
      .filter(
        (h) =>
          h.name?.toLowerCase().includes(hotelSearch.toLowerCase()) &&
          (h.stars || 0) >= minStars
      )
      .sort((a, b) => (b.stars || 0) - (a.stars || 0));
  }, [hotels, hotelSearch, minStars]);

  const handleCityChange = (cityId: string) => {
    setTripDays((prev) =>
      prev.map((d, i) =>
        i === selectedIndex
          ? {
              ...d,
              cityId,
              hotelId: null,
              dayActivities: [],
              nightActivities: [],
              cafes: [],
            }
          : d
      )
    );
  };

  const handleHotelSelect = (hotelId: string | null) => {
    setTripDays((prev) =>
      prev.map((d, i) =>
        i === selectedIndex ? { ...d, hotelId: hotelId || null } : d
      )
    );
  };

  const toggleActivity = (
    activity: IActivity,
    type: "day" | "night" | "cafe"
  ) => {
    setTripDays((prev) =>
      prev.map((d, i) => {
        if (i !== selectedIndex) return d;
        const key =
          type === "day"
            ? "dayActivities"
            : type === "night"
            ? "nightActivities"
            : "cafes";
        const exists = d[key].some((a: IActivity) => a.id === activity.id);
        return {
          ...d,
          [key]: exists
            ? d[key].filter((a: IActivity) => a.id !== activity.id)
            : [...d[key], activity],
        };
      })
    );
  };

  const saveCurrentDay = async () => {
    if (!selectedDay?.cityId) return toast.error("Ընտրեք քաղաք");
    setSaving(true);
    toast.loading("Պահպանվում է օրը...", { id: "save" });

    try {
      const tripDayRes = await Axios.post("/trip-day", {
        tripId,
        order: selectedDay.day,
        cityId: selectedDay.cityId,
        hotelId: selectedDay.hotelId || null,
      });

      const tripDayId = tripDayRes.data.payload._id;
      setTripDays((prev) =>
        prev.map((d, i) => (i === selectedIndex ? { ...d, tripDayId } : d))
      );

      const promises = [];
      for (const act of [...selectedDay.dayActivities, ...selectedDay.cafes]) {
        promises.push(
          Axios.post("/activity", {
            tripDayId,
            cityId: selectedDay.cityId,
            activityId: act.id,
          }).catch(() => {})
        );
      }
      for (const act of selectedDay.nightActivities) {
        promises.push(
          Axios.post("/activity/night", {
            tripDayId,
            cityId: selectedDay.cityId,
            nightActivityId: act.id,
          }).catch(() => {})
        );
      }

      if (promises.length > 0) await Promise.all(promises);

      toast.success("Օրը հաջողությամբ պահպանվեց!", { id: "save" });

      if (selectedIndex < tripDays.length - 1) {
        setSelectedIndex((i) => i + 1);
      } else {
        setCompleted({ dayPlanning: true });
        navigate("/trips/new/finish");
        toast.success("Ամբողջ ճանապարհորդությունը պատրաստ է");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Չհաջողվեց պահպանել", {
        id: "save",
      });
    } finally {
      setSaving(false);
    }
  };

  const skipAll = () => {
    setCompleted({ dayPlanning: true });
    navigate("/trips/new/finish");
  };

  const currentActivities = activities[activeTab];
  const selectedActivities =
    activeTab === "day"
      ? selectedDay?.dayActivities || []
      : activeTab === "night"
      ? selectedDay?.nightActivities || []
      : selectedDay?.cafes || [];
  const counts = {
    day: selectedDay?.dayActivities.length || 0,
    night: selectedDay?.nightActivities.length || 0,
    cafe: selectedDay?.cafes.length || 0,
  };
  const toggleCurrentActivity = (activity: IActivity) =>
    toggleActivity(activity, activeTab);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 pb-32 sm:pb-12 space-y-8">
        {/* Desktop top controls */}
        <div className="hidden sm:block">
          <DayPlanningControls onSkip={skipAll} onFinish={skipAll} />
        </div>

        {/* Day selector */}
        <DaySelector
          tripDays={tripDays}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

        {selectedDay && (
          <div className="space-y-8">
            {/* Day header */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6">
              <DayHeader day={selectedDay.day} date={selectedDay.date} />
            </div>

            {/* City selector */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6">
              <CitySelector
                cities={allCities}
                selectedCityId={selectedDay.cityId}
                onChange={handleCityChange}
              />
            </div>

            {selectedDay.cityId && (
              <>
                {/* Hotel section */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6">
                  <HotelSection
                    hotels={hotels}
                    selectedHotel={selectedHotel}
                    hotelSearch={hotelSearch}
                    minStars={minStars}
                    onHotelSearch={setHotelSearch}
                    onMinStarsChange={setMinStars}
                    onHotelSelect={handleHotelSelect}
                    loading={loading}
                  />
                </div>

                {/* Activities */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 space-y-6">
                  <ActivityTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    counts={counts}
                  />
                  <ActivityGrid
                    activities={currentActivities}
                    selectedActivities={selectedActivities}
                    onToggle={toggleCurrentActivity}
                  />
                </div>

                {/* Desktop actions */}
                <div className="hidden sm:block">
                  <DayActions
                    canCopyFromPrevious={
                      selectedIndex > 0 && !!tripDays[selectedIndex - 1].cityId
                    }
                    onCopyFromPrevious={() => {
                      const prev = tripDays[selectedIndex - 1];
                      setTripDays((d) =>
                        d.map((x, i) =>
                          i === selectedIndex
                            ? {
                                ...x,
                                cityId: prev.cityId,
                                hotelId: prev.hotelId,
                              }
                            : x
                        )
                      );
                    }}
                    saving={saving}
                    hasCity={!!selectedDay.cityId}
                    onSave={saveCurrentDay}
                    onSkipAll={skipAll}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile bottom bar (Instagram-style) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3">
        <div className="flex gap-3">
          <button
            onClick={skipAll}
            className="flex-1 py-3 rounded-full bg-white/10 text-white text-sm font-medium"
          >
            Skip
          </button>
          <button
            onClick={saveCurrentDay}
            disabled={saving}
            className="flex-[1.5] py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold disabled:opacity-50"
          >
            {selectedIndex < tripDays.length - 1 ? "Save day" : "Finish trip"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayPlanning;
