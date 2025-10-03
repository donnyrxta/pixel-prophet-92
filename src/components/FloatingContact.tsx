import { MessageCircle, Phone } from "lucide-react";

const FloatingContact = () => {
  const whatsappNumber = "263777123456"; // Replace with actual number
  const phoneNumber = "+263777123456"; // Replace with actual number

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20SOHO%20CONNECT,%20I'd%20like%20to%20inquire%20about%20your%20services`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-2xl"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="fixed bottom-24 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-2xl"
        aria-label="Call us now"
      >
        <Phone className="w-7 h-7" />
      </a>
    </>
  );
};

export default FloatingContact;
