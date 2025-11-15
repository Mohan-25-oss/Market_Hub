import React, { useState } from 'react';
import { X, Calendar, MapPin, Phone, User, Mail, Package } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const BookingModal = ({ isOpen, onClose, user, item }) => {
    const [formData, setFormData] = useState({
        phone: '',
        location: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success toast
            toast.success(
                <div>
                    <p className="font-semibold">Booking Confirmed! 🎉</p>
                    <p className="text-sm">Your {item?.name} has been booked successfully.</p>
                </div>,
                {
                    duration: 5000,
                    position: 'top-right',
                }
            );

            // Reset form and close modal
            setFormData({ phone: '', location: '' });
            onClose();
        } catch (error) {
            toast.error('Booking failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Toaster />

            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                {/* Modal */}
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Book Item</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Auto-filled User Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>

                            {/* User Name */}
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <User className="w-5 h-5 text-gray-400" />
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-500">Name</label>
                                    <p className="text-gray-900 font-medium">{user?.name || 'Not provided'}</p>
                                </div>
                            </div>

                            {/* User Email */}
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-500">Email</label>
                                    <p className="text-gray-900 font-medium">{user?.email || 'Not provided'}</p>
                                </div>
                            </div>

                            {/* Item Information */}
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Package className="w-5 h-5 text-gray-400" />
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-500">Item</label>
                                    <p className="text-gray-900 font-medium">{item?.name || 'No item selected'}</p>
                                </div>
                                <div className="text-right">
                                    <label className="block text-sm font-medium text-gray-500">Price</label>
                                    <p className="text-green-600 font-bold">{item?.price || '$0.00'}</p>
                                </div>
                            </div>
                        </div>

                        {/* User Input Fields */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="w-4 h-4" />
                                    <span>Phone Number *</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                />
                            </div>

                            {/* Meeting Location */}
                            <div>
                                <label htmlFor="location" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Meeting Location *</span>
                                </label>
                                <textarea
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    placeholder="Enter the meeting address or location details"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.phone || !formData.location}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Booking...</span>
                                    </>
                                ) : (
                                    <>
                                        <Calendar className="w-5 h-5" />
                                        <span>Confirm Booking</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Note */}
                    <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center">
                            You'll receive a confirmation email with meeting details shortly.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingModal;