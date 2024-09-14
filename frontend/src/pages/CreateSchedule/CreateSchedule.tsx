// src/components/CreateSchedule.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createSchedule } from "../../services/scheduleService";
import styles from "./CreateSchedule.module.css";

const CreateSchedule: React.FC = () => {
  const [trainName, setTrainName] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createSchedule({
        id: 0,
        train_name: trainName,
        departure_time: departureTime,
      });
      navigate("/schedules");
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("Failed to create schedule.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Schedule</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Train Route</label>
          </div>
          <input
            type="text"
            value={trainName}
            onChange={(e) => setTrainName(e.target.value)}
            required={true}
            className={styles.input}
          />
          <div className={styles.labelContainer}>
            <label className={styles.label}>Depature Time</label>
          </div>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className={styles.input}
            required={true}
          />
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.button}>
              Create Schedule
            </button>
          </div>
        </form>
        <Link to={"/schedules"}>
          <button className={styles.button}>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateSchedule;
