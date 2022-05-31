import React, { useEffect, useState } from 'react'
import { getAnalyze } from '../../redux/actions/book/book'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import './Analyze.less'
import BarChartContainer from './components/Barchart/Barchar'
import Chart, { IChartData } from './components/Piechart/Piechart'

const Analyze: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setCurrentPage('Analyze'))
    dispatch(getAnalyze())
  }, [dispatch])

  const analyzeData = useAppSelector(bookSelectors.analyzeSelector)

  const [chartData, setChartData] = useState<IChartData[]>([])

  useEffect(() => {
    if (analyzeData) {
      const objectArray = Object.entries(analyzeData)
      let array: IChartData[] = []
      objectArray.forEach(([key, value]) => {
        if (key === 'sellingBook' || key === 'soldBook') {
          array.push({ name: key, value: value })
        }
      })
      setChartData(array)
    }
  }, [analyzeData])

  return (
    <div className="analyze-wrapper">
      <div className="graph">
        <div className="left">
          <p className="title">Books in day</p>
          <div className="chart">
            <BarChartContainer data={analyzeData.bookCreateByDay} />
          </div>
        </div>
        <div className="right">
          <p className="title">Total Books in store</p>
          <div className="chart">
            <Chart data={chartData} />
          </div>
        </div>
      </div>
      <div className="detail-container">
        <h1> Detail </h1>
        <table>
          <tr>
            <td>Total books available on stock:</td>
            <td className="right">{analyzeData.sellingBook}</td>
          </tr>
          <tr>
            <td>Total book receipts:</td>
            <td className="right">{analyzeData.soldBook}</td>
          </tr>
          <tr>
            <td>Total amount transfer:</td>
            <td className="right">{analyzeData.totalAmount} $</td>
          </tr>
          <tr>
            <td>Total books:</td>
            <td className="right">{analyzeData.allBook}</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Analyze
