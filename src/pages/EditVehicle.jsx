"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentVehicle,
    updateExistingVehicle,
} from "../store/vehicleSlice";
import Navbar from "../components/Navbar";
import axios from "axios";

const EditVehicle = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        price: "",
        description: "",
        status: "Available",
        imageUrl: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const { currentVehicle } = useSelector((state) => state.vehicles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch vehicle details
    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/vehicleById?id=${id}`,
                    { withCredentials: true }
                );
                dispatch(setCurrentVehicle(response.data));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching vehicle details:", err);
                setError(
                    "Failed to load vehicle details. Please try again later."
                );
                setLoading(false);
            }
        };

        fetchVehicleDetails();
    }, [dispatch, id]);

    // Update form when vehicle data is loaded
    useEffect(() => {
        if (currentVehicle) {
            setFormData({
                name: currentVehicle.name || "",
                model: currentVehicle.model || "",
                price: currentVehicle.price?.toString() || "",
                description: currentVehicle.description || "",
                status: currentVehicle.status || "Available",
                imageUrl: currentVehicle.imageUrl || "",
            });
        }
    }, [currentVehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        // try {
        //     // Convert price to number
        //     const vehicleData = {
        //         ...formData,
        //         price: Number.parseFloat(formData.price),
        //     };

        //     const response = await axios.post(
        //         `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/editVehicle?id=${id}`,
        //         vehicleData,
        //         { withCredentials: true }
        //     );

        //     dispatch(updateExistingVehicle(response.data));
        //     navigate(`/vehicles/${id}`);
        // } catch (err) {
        //     console.error("Error updating vehicle:", err);
        //     setError("Failed to update vehicle. Please try again.");
        // } finally {
        //     setSaving(false);
        // }
        try {
            const form = new FormData();
            form.append("name", formData.name);
            form.append("model", formData.model);
            form.append("price", formData.price);
            form.append("description", formData.description);
            form.append("status", formData.status);
            // form.append("imageUrl", formData.imageUrl);

            const response = await axios.post(
                `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/editVehicle?id=${id}`,
                new URLSearchParams(form),
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded", // or omit this, Axios sets it automatically for FormData
                    },
                }
            );

            dispatch(updateExistingVehicle(response.data));
            navigate(`/vehicles/${id}`);
        } catch (err) {
            console.error("Error updating vehicle:", err);
            setError("Failed to update vehicle. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <Link
                    to={`/vehicles/${id}`}
                    className="text-green-600 hover:text-green-700 font-medium inline-block mb-6"
                >
                    &larr; Back to Vehicle Details
                </Link>

                <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Edit Vehicle
                    </h1>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Vehicle Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="model"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Model
                                </label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Reserved">Reserved</option>
                                    <option value="Sold">Sold</option>
                                    <option value="Maintenance">
                                        Maintenance
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="imageUrl"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Image URL (optional)
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link
                                to={`/vehicles/${id}`}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditVehicle;
