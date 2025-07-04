// src/components/sections/BranchesSection.tsx

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const branches = [
  {
    name: "Co Operative Office",
    style: "top-[83%] left-[50%]",
    link: "https://www.google.com/maps/dir//5A+St+-+opp.+to+Al+Kabayel+Discount+Centre+-+Al+Khabaisi+-+Dubai/@25.2655695,55.2489807,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3e5f5deba3fd0249:0x3baedf3c4b7ac875!2m2!1d55.3313822!2d25.2655924?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
  },
   {
    name: "WareHouse khabeissi",
    style: "top-[67%] left-[45%]",
    link: "https://www.google.com/maps/dir//5A+St+-+opp.+to+Al+Kabayel+Discount+Centre+-+Al+Khabaisi+-+Dubai/@25.2655695,55.2489807,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3e5f5deba3fd0249:0x3baedf3c4b7ac875!2m2!1d55.3313822!2d25.2655924?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Deira",
    style: "top-[60%] left-[65%]",
    link: "https://www.google.com/maps/dir//Airbest+Express+Cargo+LLC.+sabka+branch+-+15+31c+St+-+Deira+-+Al+Sabkha+-+Dubai/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3e5f4300310f6cc9:0x951f136abacc25ed?sa=X&ved=1t:57443&ictx=111"
  },
  {
    name: "Sabkha",
    style: "top-[66%] left-[55%]",
    link: "https://www.google.com/maps/dir//Airbest+Express+Cargo+LLC.+sabka+branch+-+15+31c+St+-+Deira+-+Al+Sabkha+-+Dubai/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3e5f4300310f6cc9:0x951f136abacc25ed?sa=X&ved=1t:57443&ictx=111"
  },
  {
    name: "Burdubai",
    style: "top-[25%] left-[65%]",
    link: "https://www.google.com/maps?sca_esv=f6bc877b3d7fa12d&sxsrf=AE3TifN8zkTIa8kB64q8UCK2uZU2SfT_ZQ:1748866668863&gs_lp=Egxnd3Mtd2l6LXNlcnAiC2J1ciBhaXJiZXN0KgIIADIIEAAYBxgIGB4yCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogQyBRAAGO8FSNEfUABYvANwAHgAkAEAmAHHAqAB0waqAQUyLTIuMbgBA8gBAPgBAZgCAqACzwTCAgoQABgHGAgYChgewgIGEAAYCBgemAMAkgcFMi0xLjGgB7QMsgcFMi0xLjG4B88EwgcFMC4xLjHIBwk&um=1&ie=UTF-8&fb=1&gl=ae&sa=X&geocode=KaU5nmW3Q18-MYxCiOpbkwOA&daddr=opp.+main+entrance+of+Astoria+Hotel+BURDUBAI+-+Al+Fahidi+-+Dubai"
  },
  {
    name: "Sharjah",
    style: "top-[30%] left-[70%]",
    link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhAMggIAhAAGBYYHjIKCAMQABiABBiiBDIHCAQQABjvBTIKCAUQABiABBiiBDIKCAYQABiABBiiBDIKCAcQABiABBiiBNIBCTEwNDM3ajBqNKgCALACAA&um=1&ie=UTF-8&fb=1&gl=ae&sa=X&geocode=KWGSyDmpXV8-MTuUmBf5Y9K5&daddr=15+Abi+Al+Atahia+St+-+Al+Ghuwair+-+Hay+Al+Gharb+-+Sharjah"
  },
  {
    name: "Ras Al Khaimah",
    style: "top-[15%] left-[70%]",
    link: "https://www.google.com/maps/place/Ras+Al+Khaimah"
  },
  {
    name: "Al Ain",
    style: "top-[50%] left-[70%]",
    link: "https://www.google.com/maps?sca_esv=f6bc877b3d7fa12d&sxsrf=AE3TifP0M678mEFBZhRyHDVHBjy4dhuXVg:1748866786915&gs_lp=Egxnd3Mtd2l6LXNlcnAiDmFsIGFpbiBhaXJiZXN0KgIIADIFECEYoAFIgipQkQNY7RlwAXgBkAEAmAGzAqAB6g-qAQUyLTcuMbgBA8gBAPgBAZgCCaACzRDCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICDhAAGLADGOQCGNYE2AEBwgITEC4YgAQYsAMYQxjIAxiKBdgBAcICDRAuGIAEGLEDGEMYigXCAgoQABiABBhDGIoFwgINEAAYgAQYsQMYQxiKBcICDhAuGIAEGLEDGMcBGK8BwgIFEAAYgATCAhAQLhiABBjRAxgUGIcCGMcBwgIcEC4YgAQYsQMYQxiKBRiXBRjcBBjeBBjgBNgBAcICCxAuGIAEGMcBGK8BwgIFEC4YgATCAhoQLhiABBjHARivARiXBRjcBBjeBBjgBNgBAcICEBAAGIAEGJECGIoFGEYY-wHCAhEQLhiABBiRAhjHARiKBRivAcICHBAAGIAEGJECGIoFGEYY-wEYlwUYjAUY3QTYAQHCAgsQABiABBiRAhiKBcICBhAAGBYYHsICCxAAGIAEGIYDGIoFwgIFEAAY7wXCAgcQABiABBgNwgIGEAAYDRgewgIHECEYoAEYCpgDAIgGAZAGEboGBggBEAEYCZIHBzEuMC43LjGgB6ZGsgcFMi03LjG4B7gQwgcJMC4yLjIuNC4xyAdT&um=1&ie=UTF-8&fb=1&gl=ae&sa=X&geocode=KeGxTnWEtYo-MVe1VGSBGfoF&daddr=7Q78%2BCC+Al+waha+mall+-+Al+Qattarah+-+Al+Shuabah+-+Abu+Dhabi"
  },
  {
    name: "Abu Dhabi",
    style: "top-[65%] left-[35%]",
    link: "https://www.google.com/maps/dir//Sheikh+Zayed+Bin+Sultan+St+-+behind+KM+Trading+-+Al+Danah+-+Zone+1+-+Abu+Dhabi/@24.497042,54.2889371,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3e5e676274b13e81:0xc221ed25dc0a26d3!2m2!1d54.3713387!2d24.4970644?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
  },
];

export default function BranchesSection() {
  return (
    <section className="relative h-[500px] bg-white overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/Flag_map_of_the_United_Arab_Emirates.svg"
          alt="UAE Map"
          className="max-w-[900px] max-h-[500px] w-full h-full object-cover opacity-60 justify-center"
        />
      </div>
            <div className="container relative z-10 h-full flex flex-col items-center justify-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Our Branches Across the UAE
        </motion.h2>
        <p className="italic text-gray-600 mb-10">"Connecting Emirates, Delivering Trust."</p>

        <div className="absolute inset-0">
          {branches.map((branch, index) => (
            <motion.a
              key={index}
              href={branch.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute ${branch.style} flex flex-col items-center group`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="relative flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                <span className="absolute w-6 h-6 rounded-full bg-orange-300 opacity-50 animate-ping"></span>
                <MapPin className="text-red-600 w-10 h-10 drop-shadow-lg z-10" />
              </motion.span>
              <span className="mt-1 text-[10px] md:text-xs bg-white text-gray-800 px-2 py-[2px] rounded shadow-md group-hover:opacity-100 transition-opacity opacity-100 whitespace-nowrap">
                {branch.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
