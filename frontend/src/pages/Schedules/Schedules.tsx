import React, { useEffect, useState } from "react";
import {
  getSchedules,
  deleteSchedule,
  Schedule,
} from "../../services/scheduleService";
import { Link } from "react-router-dom";
import styles from "./Schedules.module.css";

const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSchedules();
        setSchedules(data);
      } catch (err) {
        setError("Failed to load schedules");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSchedule(id);
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    } catch (err) {
      setError("Failed to delete schedule");
    }
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.train_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.departure_time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Train Schedules</h1>
      <div className={styles.createButtonCont}>
        <Link to="/create">
          <button className={styles.createButton}>Create New Schedule</button>
        </Link>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Search your train..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.textItem}>
        <p className={styles.textDescr}>Train Route</p>
        <p className={styles.textDescr}>Depature Time</p>
      </div>
      <ul className={styles.listCont}>
        {filteredSchedules.map((schedule) => (
          <li key={schedule.id} className={styles.listItem}>
            <div className={styles.scheduleValue}>
              <p className={styles.textValue}>{schedule.train_name}</p>
              <p className={styles.textValue}>
                {formatTime(schedule.departure_time)}
              </p>
            </div>
            <div>
              <button
                onClick={() => handleDelete(schedule.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
              <Link to={`/edit-schedule/${schedule.id}`}>
                <button className={styles.editButton}>Edit</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedules;
