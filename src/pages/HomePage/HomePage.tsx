import React, { useEffect } from 'react'
import { useAppDispatch } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setCurrentPage('Home Page'))
  }, [dispatch])
  return <div>Homepage</div>
}

export default HomePage
