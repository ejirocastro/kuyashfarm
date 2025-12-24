"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/lib/store/useCartStore";
import { formatPrice, getCurrentUser, calculatePrice } from "@/lib/utils";
import Image from "next/image";
import type { Order, OrderItem } from "@/lib/types";
import Link from "next/link";
import {
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Mail,
  User,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Wallet,
  Banknote
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { useRouter } from "next/navigation";
import { checkStockAvailability, deductInventory, createNotification } from "@/lib/inventory-manager";

type PaymentMethod = "card" | "paypal" | "cod";

interface FormData {
  // Shipping Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Payment Information
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;

  // Additional
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

/**
 * Checkout Page - Complete order processing
 */
export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = getTotalPrice();
  const shipping = subtotal > 80000 ? 0 : 15000; // Free shipping over ₦80,000, otherwise ₦15,000
  const tax = subtotal * 0.075; // 7.5% VAT (Nigerian tax rate)
  const total = subtotal + shipping + tax;

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Shipping validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    // Payment validation (only for card payments)
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Format: MM/YY";
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3-4 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Check stock availability for all items BEFORE processing
    const stockIssues: string[] = [];
    for (const item of items) {
      const stockCheck = checkStockAvailability(item.id, item.quantity);
      if (!stockCheck.available) {
        stockIssues.push(`${item.name}: Only ${stockCheck.currentStock} available (you have ${item.quantity} in cart)`);
      }
    }

    if (stockIssues.length > 0) {
      setIsProcessing(false);
      createNotification({
        type: 'error',
        title: 'Insufficient Stock',
        message: `Some items in your cart are out of stock: ${stockIssues.join(', ')}`,
      });
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number
    const newOrderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Get current user
    const currentUser = getCurrentUser();
    const userEmail = currentUser?.email || formData.email;
    const userId = currentUser?.id || `guest_${Date.now()}`;
    const userType = currentUser?.userType || 'retail';

    // Convert cart items to order items with actual prices paid
    const orderItems: OrderItem[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: calculatePrice(item, item.quantity, userType), // Actual price paid per unit
      quantity: item.quantity,
      image: item.image,
      unit: item.unit,
      category: item.category,
    }));

    // DEDUCT INVENTORY for all items
    for (const item of items) {
      const success = deductInventory(item.id, item.quantity);
      if (!success) {
        setIsProcessing(false);
        createNotification({
          type: 'error',
          title: 'Inventory Error',
          message: `Failed to process ${item.name}. Please try again.`,
        });
        return;
      }
    }

    // Create order object
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      orderNumber: newOrderNumber,
      date: new Date().toISOString(),
      status: 'pending',
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      items: orderItems,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      userEmail: userEmail,
      userId: userId,
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone,
      },
      paymentMethod: formData.paymentMethod === 'card' ? 'Credit Card' :
                     formData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery',
      timeline: [
        {
          status: 'Order Placed',
          date: new Date().toISOString(),
          completed: true,
        },
        {
          status: 'Processing',
          date: '',
          completed: false,
        },
        {
          status: 'Shipped',
          date: '',
          completed: false,
        },
        {
          status: 'Delivered',
          date: '',
          completed: false,
        },
      ],
    };

    // Save order to localStorage
    try {
      const existingOrdersStr = localStorage.getItem('kuyash-orders');
      const existingOrders: Order[] = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
      existingOrders.unshift(newOrder); // Add new order at the beginning
      localStorage.setItem('kuyash-orders', JSON.stringify(existingOrders));
    } catch (error) {
      console.error('Failed to save order:', error);
    }

    setOrderNumber(newOrderNumber);
    setOrderComplete(true);
    setIsProcessing(false);

    // Show success notification
    createNotification({
      type: 'success',
      title: 'Order Placed Successfully!',
      message: `Your order ${newOrderNumber} has been confirmed.`,
    });

    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Add some products before checking out</p>
              <Link href="/categories">
                <Button>Browse Products</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Order confirmation view
  if (orderComplete) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <div className="mb-6">
                <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Order Confirmed!
              </h1>
              <p className="text-gray-600 mb-2">
                Thank you for your order, {formData.firstName}!
              </p>
              <p className="text-sm text-gray-500 mb-8">
                We've sent a confirmation email to {formData.email}
              </p>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-gray-600 mb-2">Order Number</p>
                <p className="text-2xl font-bold text-green-600">{orderNumber}</p>
              </div>

              <div className="space-y-4 text-left mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (7.5% VAT)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold text-lg">Total Paid</span>
                  <span className="font-bold text-lg text-green-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/categories" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
                <Button className="flex-1" onClick={() => router.push("/")}>
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Checkout form view
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Information */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Truck className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Shipping Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                      placeholder="John"
                      icon={User}
                      required
                    />

                    <FormField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                      placeholder="Doe"
                      icon={User}
                      required
                    />

                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      placeholder="john@example.com"
                      icon={Mail}
                      required
                      autoComplete="email"
                    />

                    <FormField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      placeholder="+234 123 456 7890"
                      icon={Phone}
                      required
                      autoComplete="tel"
                    />

                    <FormField
                      label="Street Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      placeholder="123 Main Street, Apt 4B"
                      icon={MapPin}
                      required
                      className="md:col-span-2"
                      autoComplete="street-address"
                    />

                    <FormField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      placeholder="Lagos"
                      required
                      autoComplete="address-level2"
                    />

                    <FormField
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={errors.state}
                      placeholder="Lagos State"
                      required
                      autoComplete="address-level1"
                    />

                    <FormField
                      label="ZIP Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      error={errors.zipCode}
                      placeholder="100001"
                      required
                      autoComplete="postal-code"
                    />

                    <FormSelect
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      options={[
                        { value: "Nigeria", label: "Nigeria" },
                        { value: "Ghana", label: "Ghana" },
                        { value: "Kenya", label: "Kenya" },
                        { value: "South Africa", label: "South Africa" },
                      ]}
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Wallet className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Method
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Credit Card */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.paymentMethod === "card"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                        formData.paymentMethod === "card" ? "text-green-600" : "text-gray-400"
                      }`} />
                      <p className="text-sm font-semibold">Credit Card</p>
                    </button>

                    {/* PayPal */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "paypal" })}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.paymentMethod === "paypal"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Wallet className={`w-6 h-6 mx-auto mb-2 ${
                        formData.paymentMethod === "paypal" ? "text-green-600" : "text-gray-400"
                      }`} />
                      <p className="text-sm font-semibold">PayPal</p>
                    </button>

                    {/* Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.paymentMethod === "cod"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Banknote className={`w-6 h-6 mx-auto mb-2 ${
                        formData.paymentMethod === "cod" ? "text-green-600" : "text-gray-400"
                      }`} />
                      <p className="text-sm font-semibold">Cash on Delivery</p>
                    </button>
                  </div>

                  {/* Card Details (only show if card is selected) */}
                  {formData.paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        error={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        icon={CreditCard}
                        required
                        className="md:col-span-2"
                        autoComplete="cc-number"
                      />

                      <FormField
                        label="Cardholder Name"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        error={errors.cardName}
                        placeholder="John Doe"
                        icon={User}
                        required
                        className="md:col-span-2"
                        autoComplete="cc-name"
                      />

                      <FormField
                        label="Expiry Date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        error={errors.expiryDate}
                        placeholder="MM/YY"
                        required
                        autoComplete="cc-exp"
                      />

                      <FormField
                        label="CVV"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        error={errors.cvv}
                        placeholder="123"
                        icon={Lock}
                        required
                        autoComplete="cc-csc"
                      />
                    </div>
                  )}

                  {formData.paymentMethod === "paypal" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === "cod" && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800">
                        Pay with cash when your order is delivered. Please have exact change ready.
                      </p>
                    </div>
                  )}
                </div>

                {/* Order Notes */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <FormTextarea
                    label="Order Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for your order..."
                    rows={4}
                    maxLength={500}
                  />
                </div>

                {/* Submit Button - Mobile */}
                <div className="lg:hidden">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Place Order - ${formatPrice(total)}`}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-green-600">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {subtotal <= 80000 && (
                    <p className="text-xs text-amber-600">
                      Add {formatPrice(80000 - subtotal)} more for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (7.5% VAT)</span>
                    <span className="font-semibold">{formatPrice(tax)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Submit Button - Desktop */}
                <div className="hidden lg:block">
                  <Button
                    type="submit"
                    className="w-full"
                    size="md"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout powered by SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
