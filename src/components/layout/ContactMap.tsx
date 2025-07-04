import React, { useState } from "react";

const officeLocations = {
  burdubai: {
    name: "Bur Dubai Office",
    address: "Opp. main entrance of Astoria Hotel, BURDUBAI - Al Fahidi - Dubai",
    phone: "+91 54 345 2113",
    email: "burdubai@airbestcargo.com",
    time: "9:00 AM - 11:30 AM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.7557484929685!2d55.297946775286075!3d25.257651677667325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433c29f11ae7%3A0xd3ad6e25086b149!2sAstoria%20Hotel!5e0!3m2!1sen!2sae!4v1715856759622!5m2!1sen!2sae"
  },
  deira: {
    name: "Deira Office",
    address: "Sabkha Road, Next to London Hotel - Deira - Dubai",
    phone: "+91 50 437 2113",
    email: "deira@airbestcargo.com",
    time: "9:00 AM - 11:30 AM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.9285129850323!2d55.30824967528598!3d25.252880277681845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4347cfcf7b17%3A0x293b88b94ecb135f!2sLondon%20Hotel!5e0!3m2!1sen!2sae!4v1715856859414!5m2!1sen!2sae"
  },
  alain: {
    name: "Al Ain Office",
    address: "Sample Al Ain Office Address",
    phone: "+971 XX XXX XXXX",
    email: "alain@airbestcargo.com",
    time: "9:00 AM - 11:30 AM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.7232042058356!2d55.74839817528029!3d24.20758527839198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5e2f1b372a5fb%3A0x7285f88b4c5de9f4!2sAl%20Ain!5e0!3m2!1sen!2sae!4v1715856923409!5m2!1sen!2sae"
  }
};

const ContactMap = () => {
  const [activeOffice, setActiveOffice] = useState("burdubai");

  const office = officeLocations[activeOffice];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Our Offices</h2>

      <div className="flex justify-center mb-4 space-x-4">
        {Object.keys(officeLocations).map((key) => (
          <button
            key={key}
            onClick={() => setActiveOffice(key)}
            className={`px-4 py-2 rounded-full ${
              activeOffice === key
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {officeLocations[key].name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        <h3 className="text-xl font-semibold">{office.name}</h3>
        <p className="text-gray-600">{office.address}</p>
        <p className="text-gray-600">📞 {office.phone}</p>
        <p className="text-gray-600">📧 {office.email}</p>
        <p className="text-gray-600">🕒 {office.time}</p>

        <div className="mt-4 w-full h-[400px] rounded-lg overflow-hidden">
          <iframe
            src={office.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
