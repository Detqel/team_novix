"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "./subscription.css";

export default function SubscriptionPage() {
  const [searchValue, setSearchValue] = useState("");
  const [subs, setSubs] = useState([]);

  const API_URL = "http://localhost:5000/api/subscription";

  // ─── FETCH SUBSCRIPTIONS ─────────────────────
  const fetchSubs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSubs(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  // ─── ADD SUBSCRIPTION ───────────────────────
  const addSub = async (e) => {
    e.preventDefault();

    const form = e.target;

    const payload = {
      user_id: 1,
      service_name: form.service_name.value,
      amount: Number(form.amount.value),
      billing_cycle: form.billing_cycle.value,
      next_billing_date: form.next_billing_date.value,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Subscription added successfully");
        form.reset();
        fetchSubs(); // refresh UI
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0E0E12" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar
          title="My Subscriptions"
          searchValue={searchValue}
          onSearch={setSearchValue}
        />

        {/* ─── PAGE CONTENT ───────────────────── */}
        <div style={{ padding: "20px", color: "#fff" }}>
          <h1>My Subscriptions</h1>

          {/* ─── ADD FORM ───────────────────── */}
          <form
            onSubmit={addSub}
            style={{
              display: "grid",
              gap: "10px",
              maxWidth: "400px",
              marginBottom: "20px",
            }}
          >
            <input
              name="service_name"
              placeholder="Service Name (Netflix)"
              required
            />

            <input
              name="amount"
              type="number"
              placeholder="Amount"
              required
            />

            <select name="billing_cycle">
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
              <option value="weekly">Weekly</option>
            </select>

            <input type="date" name="next_billing_date" required />

            <button type="submit">+ Add Subscription</button>
          </form>

          {/* ─── LIST ───────────────────── */}
          <div style={{ display: "grid", gap: "10px" }}>
            {subs.length === 0 ? (
              <p>No subscriptions found</p>
            ) : (
              subs.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: "#1a1a20",
                    padding: "12px",
                    borderRadius: "8px",
                  }}
                >
                  <h3>{s.service_name}</h3>
                  <p>₹{s.amount}</p>
                  <p>{s.billing_cycle}</p>
                  <p>
                    Next renewal:{" "}
                    {new Date(s.next_billing_date).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}