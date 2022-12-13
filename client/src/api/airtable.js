export async function getAllOrders() {
  const data = await fetch(`https://alice-2b5z.onrender.com/getAll`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(console.error);

  return data;
}
