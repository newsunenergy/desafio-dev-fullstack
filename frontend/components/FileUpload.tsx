<input
  type="file"
  multiple
  accept=".pdf"
  onChange={(e) => handleFiles(Array.from(e.target.files || []))}
  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
/>

const response = await fetch('http://localhost:3001/leads/simular', {
  method: 'POST',
  body: formData 
});