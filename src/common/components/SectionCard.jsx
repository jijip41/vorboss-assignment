import { memo, useState } from "react"
import { CaretDown, CaretUp } from "phosphor-react"

import { useOrders } from "../hooks/useOrders.jsx"
import { getSectionDetails } from "../reducer/getSectionDetails.jsx"
import { monthlyRevenue } from "../constants/monthlyRevenue.js"

import { LineGraph } from "./LineGraph.jsx"

export const SectionCard = memo(({ typeName }) => {
  const [open, setOpen] = useState(false)
  const { orders } = useOrders()
  const { name, value, contentDetail, graph } = getSectionDetails(typeName)

  const handleOpen = () => {
    setOpen(!open)
  }
  const handleClose = () => {
    setOpen(!open)
  }

  return (
    <div className="flex-col">
      <div className="text-color-vorboss2 bg-color-vorboss1 card">
        <span className="card-name">{name}: </span>
        <span className="card-value">{value}</span>
        {name && !open ? (
          <CaretDown
            size={32}
            onClick={handleOpen}
            className="pointer"
          ></CaretDown>
        ) : (
          <CaretUp
            size={32}
            onClick={handleClose}
            className="pointer"
          ></CaretUp>
        )}
      </div>
      {open &&
        contentDetail &&
        contentDetail.map((content, index) => (
          <p key={index} className="card-detail">
            <span className="card-detail-name">{content.name}: </span>
            <span className="card-detail-value">{content.value}</span>
          </p>
        ))}
      {open && graph && <LineGraph orders={monthlyRevenue(orders)} />}
    </div>
  )
})