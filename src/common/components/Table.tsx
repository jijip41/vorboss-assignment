import { Order } from "../helper/getSectionDetails.js"
import { sortOrdersByDate } from "../helper/sort.jsx"

export function Table({ orders }: { orders: Order[] }) {
  return (
    <div>
      <table className="section-card-conteiner flex-row-center">
        <thead>
          <tr>
            <th>Order number</th>
            <th>Date</th>
            <th>Product Name</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {sortOrdersByDate(orders, 10).map(
            ({
              order_id,
              order_placed,
              product_name,
              order_status,
            }: Partial<Order>) => (
              <tr key={order_id}>
                <td>{order_id}</td>
                <td>{order_placed}</td>
                <td>{product_name}</td>
                <td>{order_status?.replaceAll("_", " ")}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
