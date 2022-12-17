export async function getAllOrders() {
  const data = await fetch(`https://alice-server.onrender.com/orders/total`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch(console.error);

  return data;
}
