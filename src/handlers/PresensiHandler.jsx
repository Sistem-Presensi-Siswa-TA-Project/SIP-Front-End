// Filename: PresensiHandler.jsx
export const handlePresensiChange = (index, value, prevPresensiData, setPresensiData) => {
  const updated = [...prevPresensiData];
  updated[index] = value;
  setPresensiData(updated);
};