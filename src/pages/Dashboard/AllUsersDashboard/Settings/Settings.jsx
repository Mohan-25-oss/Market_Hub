import React from 'react';

export default function Settings() {
    return (
        <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                    <p className="text-gray-600 mt-1">
                        Manage your account and application preferences
                    </p>
                </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden">
                <div className="p-8">
                    <div className="text-center">
                        <div className="text-6xl mb-4">⚙️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings Panel</h3>
                        <p className="text-gray-600 mb-6">
                            Application configuration and user management settings
                        </p>

                        <div className="max-w-md mx-auto space-y-4 text-left">
                            <div className="flex justify-between items-center p-4 bg-gray-50/50 rounded-xl">
                                <span className="text-gray-700">Email Notifications</span>
                                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-300">
                                    <input type="checkbox" className="sr-only" defaultChecked />
                                    <span className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-gray-50/50 rounded-xl">
                                <span className="text-gray-700">Two-Factor Authentication</span>
                                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-300">
                                    <input type="checkbox" className="sr-only" />
                                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-gray-50/50 rounded-xl">
                                <span className="text-gray-700">Auto-approve Users</span>
                                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-300">
                                    <input type="checkbox" className="sr-only" />
                                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}