import { HotelType } from '../../backend/src/shared/types';
import { LoginFormData } from './pages/Login';
import { RegisterFormData } from './pages/Register';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerForm = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }
};

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const body = response.json();
  if (!response.ok) throw new Error('Token invalid');
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include'
  });

  if (!response.ok) throw new Error('Token invalid');

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST'
  });

  if (!response.ok) throw new Error('Error during log out');
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData
  });

  if (!res) throw new Error('Failed to add hotel');
  return res.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include'
  });

  if (!response.ok) throw new Error('Error fetching hotels');

  return response.json();
};
