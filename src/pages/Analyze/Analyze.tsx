import React, { useEffect, useState } from 'react'
import { getAnalyze } from '../../redux/actions/book/book'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import './Analyze.less'
import Chart, { IChartData } from './components/Piechart/Piechart'

// import { Container } from './styles';

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

  console.log(chartData)

  return (
    <div className="analyze-wrapper">
      <div className="graph">
        <div className="left"></div>
        <div className="right">
          <p className="title">Total Books in store</p>
          <div className="chart">
            <Chart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analyze
