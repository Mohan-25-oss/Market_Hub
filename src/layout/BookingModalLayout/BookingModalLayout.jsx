import React, { useState } from 'react';
import {
    X,
    Calendar,
    MapPin,
    Phone,
    User,
    Mail,
    Package,
    Clock,
    CreditCard,
    Shield,
    CheckCircle2
} from 'lucide-react';

const BookingModalLayout = ({
    isOpen,
    onClose,
    user = {},
    item = {},
    onBookingSubmit
}) => {
    const [formData, setFormData] = useState({
        phone: '',
        location: '',
        date: '',
        time: '',
        paymentMethod: 'cash'
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    // Steps for the booking process
    const steps = [
        { number: 1, title: 'Details', icon: User },
        { number: 2, title: 'Time', icon: Clock },
        { number: 3, title: 'Confirm', icon: CheckCircle2 }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
            return;
        }

        setIsSubmitting(true);
        try {
            // Call the provided onSubmit function or use default
            if (onBookingSubmit) {
                await onBookingSubmit(formData);
            } else {
                // Default success behavior
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log('Booking submitted:', { user, item, ...formData });
            }

            // Reset and close
            setFormData({ phone: '', location: '', date: '', time: '', paymentMethod: 'cash' });
            setCurrentStep(1);
            onClose();
        } catch (error) {
            console.error('Booking failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        {/* Auto-filled Information */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Your Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                    <User className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Name</p>
                                        <p className="font-semibold text-gray-900">{user.name || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-semibold text-gray-900">{user.email || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Item Information */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Item Details
                            </h3>

                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-900">{item.name || 'No item selected'}</p>
                                    <p className="text-sm text-gray-600">Product</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600 text-lg">{item.price || '$0.00'}</p>
                                    <p className="text-sm text-gray-600">Price</p>
                                </div>
                            </div>
                        </div>

                        {/* User Input Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <Phone className="w-4 h-4" />
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    Meeting Location *
                                </label>
                                <textarea
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    placeholder="Enter meeting address or preferred location..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                            <Clock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                            <h3 className="font-semibold text-purple-900 text-lg">Schedule Meeting</h3>
                            <p className="text-purple-700">Choose a convenient time for your meeting</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Preferred Date *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Preferred Time *
                                </label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                >
                                    <option value="">Select time</option>
                                    <option value="09:00">09:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="15:00">03:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <p className="text-sm text-yellow-800 text-center">
                                ⏰ Meeting duration: 30 minutes
                            </p>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                            <h3 className="font-semibold text-green-900 text-lg">Confirm Booking</h3>
                            <p className="text-green-700">Review your booking details</p>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Item</span>
                                <span className="font-bold text-gray-900">{item.name}</span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Price</span>
                                <span className="font-bold text-green-600 text-lg">{item.price}</span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Phone</span>
                                <span className="font-medium text-gray-900">{formData.phone}</span>
                            </div>

                            <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Location</span>
                                <span className="font-medium text-gray-900 text-right max-w-[200px]">{formData.location}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Schedule</span>
                                <span className="font-medium text-gray-900">{formData.date} at {formData.time}</span>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                <CreditCard className="w-4 h-4" />
                                Payment Method
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {['cash', 'card', 'bkash', 'nagad'].map((method) => (
                                    <label key={method} className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={formData.paymentMethod === method}
                                            onChange={handleInputChange}
                                            className="mr-2 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="capitalize font-medium text-gray-700">{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.phone.trim() && formData.location.trim();
            case 2:
                return formData.date && formData.time;
            case 3:
                return true;
            default:
                return false;
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Book Item</h2>
                                    <p className="text-sm text-gray-600">Complete your booking in 3 simple steps</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex justify-between items-center mt-6">
                            {steps.map((step, index) => {
                                const StepIcon = step.icon;
                                const isCompleted = step.number < currentStep;
                                const isCurrent = step.number === currentStep;

                                return (
                                    <div key={step.number} className="flex items-center flex-1">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${isCompleted
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : isCurrent
                                                    ? 'border-blue-500 bg-blue-500 text-white'
                                                    : 'border-gray-300 text-gray-500'
                                            }`}>
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-5 h-5" />
                                            ) : (
                                                <StepIcon className="w-5 h-5" />
                                            )}
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`flex-1 h-1 mx-2 ${step.number < currentStep ? 'bg-green-500' : 'bg-gray-300'
                                                }`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto">
                        <form onSubmit={handleSubmit}>
                            {renderStepContent()}

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={!isStepValid() || isSubmitting}
                                    className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-200 ${!isStepValid() || isSubmitting
                                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </div>
                                    ) : currentStep === 3 ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" />
                                            Confirm Booking
                                        </div>
                                    ) : (
                                        `Next Step`
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <Shield className="w-4 h-4" />
                            Your information is secure and encrypted
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModalLayout;