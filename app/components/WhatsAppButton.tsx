"use client";

export default function WhatsAppButton() {
  // Replace this with your WhatsApp number
  const phoneNumber = "923001234567";

  const message = encodeURIComponent(
    "Hello SmartCart! I need help with my order."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
      title="Chat with us on WhatsApp"
    >
      <span className="text-3xl">💬</span>
    </a>
  );
}