"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingCart,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useCartStore } from "@/lib/store/useCartStore";
import Link from "next/link";
import type { Order, OrderStatus } from "@/lib/types";

/**
 * Order History Page
 */
export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCartStore();

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 140000,
      itemCount: 5,
      items: [
        {
          id: 1,
          name: "Fresh Organic Eggs",
          price: 9500,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
          unit: "dozen",
        },
        {
          id: 2,
          name: "Grass-Fed Whole Milk",
          price: 6000,
          quantity: 3,
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
          unit: "liter",
        },
      ],
      shipping: {
        name: "John Doe",
        address: "123 Main Street, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
      tracking: {
        number: "1Z999AA10123456784",
        carrier: "UPS",
        url: "https://www.ups.com/track?tracknum=1Z999AA10123456784",
      },
      timeline: [
        { status: "Order Placed", date: "2024-01-15 10:30 AM", completed: true },
        { status: "Processing", date: "2024-01-15 11:00 AM", completed: true },
        { status: "Shipped", date: "2024-01-16 09:15 AM", completed: true },
        { status: "Out for Delivery", date: "2024-01-17 08:00 AM", completed: true },
        { status: "Delivered", date: "2024-01-17 02:30 PM", completed: true },
      ],
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-01-22",
      status: "shipped",
      total: 198000,
      itemCount: 8,
      items: [
        {
          id: 3,
          name: "Organic Free-Range Chicken",
          price: 20000,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400",
          unit: "kg",
        },
        {
          id: 4,
          name: "Farm Fresh Vegetables",
          price: 18000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
          unit: "basket",
        },
      ],
      shipping: {
        name: "John Doe",
        address: "123 Main Street, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
      tracking: {
        number: "1Z999AA10123456785",
        carrier: "UPS",
        url: "https://www.ups.com/track?tracknum=1Z999AA10123456785",
      },
      timeline: [
        { status: "Order Placed", date: "2024-01-22 03:45 PM", completed: true },
        { status: "Processing", date: "2024-01-22 04:00 PM", completed: true },
        { status: "Shipped", date: "2024-01-23 10:30 AM", completed: true },
        { status: "Out for Delivery", date: "Estimated 2024-01-24", completed: false },
        { status: "Delivered", date: "Pending", completed: false },
      ],
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "2024-02-01",
      status: "processing",
      total: 90000,
      itemCount: 3,
      items: [
        {
          id: 5,
          name: "Artisan Cheese Selection",
          price: 14000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400",
          unit: "pack",
        },
      ],
      shipping: {
        name: "John Doe",
        address: "456 Business Ave, Suite 100",
        city: "Brooklyn",
        state: "NY",
        zipCode: "11201",
      },
      timeline: [
        { status: "Order Placed", date: "2024-02-01 11:20 AM", completed: true },
        { status: "Processing", date: "In Progress", completed: false },
        { status: "Shipped", date: "Pending", completed: false },
        { status: "Out for Delivery", date: "Pending", completed: false },
        { status: "Delivered", date: "Pending", completed: false },
      ],
    },
  ]);

  const filteredOrders = orders
    .filter((order) => filterStatus === "all" || order.status === filterStatus)
    .filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addItem(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          unit: item.unit,
          image: item.image,
          description: "",
          inStock: true,
          rating: 4.5,
        },
        "dairy" // This would need to be dynamic in a real app
      );
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
            <p className="text-gray-600">
              View and manage your previous orders
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order number or item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "all")}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your filters"
                  : "Start shopping to see your orders here"}
              </p>
              <Link href="/categories">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {order.orderNumber}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                            <span>{order.itemCount} items</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-semibold border flex items-center gap-1 capitalize ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-6 bg-gray-50">
                    <div className="flex items-center gap-4 mb-4">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-sm"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setExpandedOrder(expandedOrder === order.id ? null : order.id)
                        }
                      >
                        {expandedOrder === order.id ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-2" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-2" />
                            View Details
                          </>
                        )}
                      </Button>

                      {order.tracking && (
                        <a
                          href={order.tracking.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            <Truck className="w-4 h-4 mr-2" />
                            Track Order
                          </Button>
                        </a>
                      )}

                      <Button size="sm" onClick={() => handleReorder(order)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="p-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Items List */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-semibold text-gray-900 text-sm truncate">
                                    {item.name}
                                  </h5>
                                  <p className="text-xs text-gray-500">
                                    Qty: {item.quantity} × {formatPrice(item.price)}
                                  </p>
                                  <p className="text-sm font-semibold text-green-600 mt-1">
                                    {formatPrice(item.price * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping & Tracking */}
                        <div className="space-y-6">
                          {/* Shipping Address */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-green-600" />
                              Shipping Address
                            </h4>
                            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                              <p className="font-semibold text-gray-900">
                                {order.shipping.name}
                              </p>
                              <p className="text-gray-600">{order.shipping.address}</p>
                              <p className="text-gray-600">
                                {order.shipping.city}, {order.shipping.state}{" "}
                                {order.shipping.zipCode}
                              </p>
                            </div>
                          </div>

                          {/* Order Timeline */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Order Timeline
                            </h4>
                            <div className="space-y-3">
                              {order.timeline.map((event, index) => (
                                <div key={index} className="flex gap-3">
                                  <div className="relative">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        event.completed
                                          ? "bg-green-100 text-green-600"
                                          : "bg-gray-100 text-gray-400"
                                      }`}
                                    >
                                      {event.completed ? (
                                        <CheckCircle className="w-4 h-4" />
                                      ) : (
                                        <Clock className="w-4 h-4" />
                                      )}
                                    </div>
                                    {index < order.timeline.length - 1 && (
                                      <div
                                        className={`absolute left-1/2 top-8 w-0.5 h-8 -translate-x-1/2 ${
                                          event.completed ? "bg-green-200" : "bg-gray-200"
                                        }`}
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1 pb-6">
                                    <p
                                      className={`font-semibold text-sm ${
                                        event.completed
                                          ? "text-gray-900"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {event.status}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {event.date}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tracking Info */}
                          {order.tracking && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-green-600" />
                                Tracking Information
                              </h4>
                              <div className="p-4 bg-gray-50 rounded-lg text-sm">
                                <p className="text-gray-600">
                                  Carrier: <span className="font-semibold">{order.tracking.carrier}</span>
                                </p>
                                <p className="text-gray-600 mt-1">
                                  Tracking #:{" "}
                                  <span className="font-mono font-semibold">
                                    {order.tracking.number}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
