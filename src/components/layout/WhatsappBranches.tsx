import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const branches = [
  { name: 'Dubai Operation ', number: '9718002113' },
  { name: 'Deira Branch', number: '971504372113' },
  { name: 'Sharjah Branch', number: '971542468113' },
  { name: 'Sabhka Branch', number: '971582562113' },
  { name: 'Al ain Branch', number: '971542462114' },
  { name: 'Abudhabi Branch', number: '9715523412113' },
  { name: 'Burdubai Branch', number: '971543452113' },
  { name: 'Ras Al Khaimah Branch', number: '971553362113' },


];

const WhatsappBranches = () => {
  const [showList, setShowList] = useState(false);

  const toggleList = () => setShowList(!showList);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={toggleList}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaWhatsapp size={24} />
      </button>

      {showList && (
        <div className="mt-2 bg-white rounded-lg shadow-md p-4">
          <h4 className="font-semibold text-sm mb-2">Select Branch</h4>
          {branches.map((branch, idx) => (
            <a
              key={idx}
              href={`https://wa.me/${branch.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-gray-700 hover:text-green-600 py-1"
            >
              {branch.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhatsappBranches;
