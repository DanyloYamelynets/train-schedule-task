import React, { useState, useEffect } from "react";
import {
  getScheduleById,
  updateSchedule,
  Schedule,
} from "../../services/scheduleService";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./EditSchedule.module.css";

const EditSchedule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [trainName, setTrainName] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      if (id) {
        const fetchedSchedule = await getScheduleById(parseInt(id));
        setSchedule(fetchedSchedule);
        setTrainName(fetchedSchedule.train_name);
        setDepartureTime(fetchedSchedule.departure_time);
      }
    };

    fetchSchedule();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (schedule) {
      await updateSchedule(schedule.id, {
        id: schedule.id,
        train_name: trainName,
        departure_time: departureTime,
      });
      navigate("/schedules");
    }
  };

  if (!schedule) return <div>Loading...</div>;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <div className={styles.container}>
      <h1>Edit Schedule</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Train Route</label>
          </div>
          <input
            type="text"
            value={trainName}
            onChange={(e) => setTrainName(e.target.value)}
            className={styles.input}
          />
          <div className={styles.labelContainer}>
            <label className={styles.label}>Depature Time</label>
          </div>
          <input
            type="text"
            value={formatTime(departureTime)}
            onChange={(e) => setDepartureTime(e.target.value)}
            className={styles.input}
          />
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.button}>
              Save Changes
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

export default EditSchedule;
