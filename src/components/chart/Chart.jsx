import React from 'react'
import {Chart as Chartjs} from "chart.js/auto"
import { Bar } from "react-chartjs-2"
const Chart = () => {
  return (
    <div>
      <Bar
        data={{
            labels:["Candidate1", "Candidate2", "Candidate3", "Candidate4"],
            datasets:[
                {
                    label:"Count",
                    data:[5000,2000,3000,6000],
                    backgroundColor:[
                        "green","yellow","blue","red"
                    ]
                        
                }
            ]
        }}
      />
    </div>
  )
}

export default Chart
