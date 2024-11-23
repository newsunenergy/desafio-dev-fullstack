"use client";
import { useState, useEffect } from "react";

type ModalProps = {
  isSuccess: boolean;
  message: string;
  onClose: () => void;
};

export default function FeedbackModal({
  isSuccess = true,
  message,
  onClose,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-start justify-center transition-opacity duration-300 z-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center">
          {isSuccess ? (
            <svg
              className="w-6 h-6 text-green-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-red-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <p
            className={`text-lg font-semibold ${
              isSuccess ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
