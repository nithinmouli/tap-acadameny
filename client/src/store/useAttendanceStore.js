import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const useAttendanceStore = create((set, get) => ({
    attendance: [],
    todayStatus: null,
    stats: null,
    isLoading: false,
    error: null,

    getHeaders: () => {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    },

    checkIn: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                `${API_URL}/attendance/checkin`,
                {},
                { headers: get().getHeaders() }
            );
            set({ todayStatus: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message });
            throw error;
        }
    },

    checkOut: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                `${API_URL}/attendance/checkout`,
                {},
                { headers: get().getHeaders() }
            );
            set({ todayStatus: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message });
            throw error;
        }
    },

    getTodayStatus: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/attendance/today`,
                { headers: get().getHeaders() }
            );
            set({ todayStatus: response.data });
        } catch (error) {
            console.error(error);
        }
    },

    getMyHistory: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(
                `${API_URL}/attendance/my-history`,
                { headers: get().getHeaders() }
            );
            set({ attendance: response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message });
        }
    },

    getEmployeeStats: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/dashboard/employee`,
                { headers: get().getHeaders() }
            );
            set({ stats: response.data });
        } catch (error) {
            console.error(error);
        }
    },

    // Manager actions
    getAllAttendance: async (filters = {}) => {
        set({ isLoading: true });
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await axios.get(
                `${API_URL}/attendance/all?${params}`,
                { headers: get().getHeaders() }
            );
            set({ attendance: response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message });
        }
    },

    getManagerStats: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/dashboard/manager`,
                { headers: get().getHeaders() }
            );
            set({ stats: response.data });
        } catch (error) {
            console.error(error);
        }
    }
}));

export default useAttendanceStore;
