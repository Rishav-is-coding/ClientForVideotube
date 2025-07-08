import React, { useState } from 'react';
import { register } from '../../api/user';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleCoverChange = e => {
    const file = e.target.files[0];
    setCoverImage(file);
    setPreviewCover(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('userName', form.userName);
    formData.append('email', form.email);
    formData.append('password', form.password);
    if (avatar) formData.append('avatar', avatar);
    if (coverImage) formData.append('coverImage', coverImage);

    await register(formData);
    navigate('/login');
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-lg shadow border border-primary-light">
      <h2 className="text-2xl font-bold text-primary-dark mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full border border-primary-light rounded px-3 py-2"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="userName"
          placeholder="Username"
          className="w-full border border-primary-light rounded px-3 py-2"
          value={form.userName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          className="w-full border border-primary-light rounded px-3 py-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border border-primary-light rounded px-3 py-2"
          value={form.password}
          onChange={handleChange}
          required
        />
        <div>
          <label className="block mb-1 text-primary-dark font-semibold">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full"
            required
          />
          {/* {previewAvatar && (
            <img src={previewAvatar} alt="Avatar Preview" className="mt-2 w-20 h-20 object-cover rounded-full border-2 border-primary" />
          )} */}
        </div>
        <div>
          <label className="block mb-1 text-primary-dark font-semibold">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="w-full"
          />
          {/* {previewCover && (
            <img src={previewCover} alt="Cover Preview" className="mt-2 w-full h-24 object-cover rounded border-2 border-primary" />
          )} */}
        </div>
        <button className="w-full bg-primary text-white py-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
