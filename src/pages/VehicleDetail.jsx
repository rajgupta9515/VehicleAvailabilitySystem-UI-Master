"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentVehicle, removeVehicle } from "../store/vehicleSlice";
import Navbar from "../components/Navbar";
import axios from "axios";

const VehicleDetail = () => {
    const { id } = useParams();
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { currentVehicle: vehicle } = useSelector((state) => state.vehicles);
    const { isDealer } = useSelector((state) => state.auth);
    console.log("Is Dealer or not :-> ", isDealer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleDelete = async () => {
        try {
            await axios.post(
                `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/deleteVehicle?id=${id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeVehicle(id));
            navigate("/vehicles");
        } catch (err) {
            console.error("Error deleting vehicle:", err);
            setError("Failed to delete vehicle. Please try again later.");
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

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                    <Link
                        to="/vehicles"
                        className="text-green-600 hover:text-green-700 font-medium"
                    >
                        &larr; Back to Vehicles
                    </Link>
                </div>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <h3 className="text-xl font-medium text-gray-600">
                            Vehicle not found.
                        </h3>
                        <Link
                            to="/vehicles"
                            className="mt-4 inline-block text-green-600 hover:text-green-700 font-medium"
                        >
                            &larr; Back to Vehicles
                        </Link>
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
                    to="/vehicles"
                    className="text-green-600 hover:text-green-700 font-medium inline-block mb-6"
                >
                    &larr; Back to Vehicles
                </Link>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img
                                src={
                                    vehicle.imageUrl ||
                                    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" ||
                                    "/placeholder.svg"
                                }
                                alt={vehicle.name}
                                className="w-full h-64 md:h-full object-cover"
                            />
                        </div>
                        <div className="p-6 md:w-1/2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                        {vehicle.name}
                                    </h1>
                                    <p className="text-gray-600 mb-4">
                                        {vehicle.model}
                                    </p>
                                </div>
                                <div
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        vehicle.status === "Available"
                                            ? "bg-green-100 text-green-800"
                                            : vehicle.status === "Sold"
                                            ? "bg-red-100 text-red-800"
                                            : vehicle.status === "Reserved"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {vehicle.status}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    ${vehicle.price}
                                </h2>
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        {vehicle.description}
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Specifications
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">
                                                Model
                                            </p>
                                            <p className="font-medium">
                                                {vehicle.model}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Year
                                            </p>
                                            <p className="font-medium">
                                                {vehicle.year || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Color
                                            </p>
                                            <p className="font-medium">
                                                {vehicle.color || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Mileage
                                            </p>
                                            <p className="font-medium">
                                                {vehicle.mileage
                                                    ? `${vehicle.mileage} km`
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {isDealer && (
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex space-x-4">
                                            <Link
                                                to={`/edit-vehicle/${vehicle.id}`}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
                                            >
                                                Edit Vehicle
                                            </Link>
                                            {!deleteConfirm ? (
                                                <button
                                                    onClick={() =>
                                                        setDeleteConfirm(true)
                                                    }
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                                                >
                                                    Delete Vehicle
                                                </button>
                                            ) : (
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={handleDelete}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                                                    >
                                                        Confirm Delete
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setDeleteConfirm(
                                                                false
                                                            )
                                                        }
                                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetail;
