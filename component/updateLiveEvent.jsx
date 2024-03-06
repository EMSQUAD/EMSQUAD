// updateLiveEvent.jsx
export const updateAllLiveEvents = async () => {
  try {
    const response = await fetch('https://server-ems-rzdd.onrender.com/api/users/updateAllLiveEvents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
