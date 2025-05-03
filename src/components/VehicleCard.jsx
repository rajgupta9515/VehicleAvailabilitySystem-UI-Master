import { Link } from "react-router-dom"

const VehicleCard = ({ vehicle }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Sold":
        return "bg-red-100 text-red-800"
      case "Reserved":
        return "bg-yellow-100 text-yellow-800"
      case "Maintenance":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Link to={`/vehicles/${vehicle.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="relative">
          <img
            src={
              vehicle.imageUrl ||
              "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" ||
              "/placeholder.svg"
            }
            alt={vehicle.name}
            className="w-full h-48 object-cover"
          />
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}
          >
            {vehicle.status}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{vehicle.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{vehicle.model}</p>
          <p className="text-xl font-bold text-gray-900 mb-2">${vehicle.price}</p>
          <p className="text-gray-600 text-sm line-clamp-2">{vehicle.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default VehicleCard
