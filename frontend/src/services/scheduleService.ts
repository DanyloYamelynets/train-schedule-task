import axios from "axios";

export interface Schedule {
  id: number;
  train_name: string;
  departure_time: string;
}

const api = axios.create({
  baseURL: "http://localhost:3000",
});

/////////////////////////////AUTHENTICATION/////////////////////////////////////

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

//////////////////////////SCHEDULES//////////////////////

export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await api.get("/schedules");
  return response.data;
};

export const getScheduleById = async (id: number): Promise<Schedule> => {
  const response = await api.get(`/schedules/${id}`);
  return response.data;
};

export const createSchedule = async (schedule: Schedule): Promise<Schedule> => {
  const response = await api.post("/schedules", schedule);
  return response.data;
};

export const updateSchedule = async (
  id: number,
  schedule: Schedule
): Promise<Schedule> => {
  const response = await api.put(`/schedules/${id}`, schedule);
  return response.data;
};

export const deleteSchedule = async (id: number): Promise<void> => {
  await api.delete(`/schedules/${id}`);
};
