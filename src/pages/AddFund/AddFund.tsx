import { Button, Radio, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { getUserIdLocal } from '../../utils/localStorageService'
import './AddFund.less'
import { Switch } from 'antd'
import { addFundAction } from '../../redux/actions/user/user'

// import { Container } from './styles';

const AddFund: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setCurrentPage('Add Fund'))
  }, [dispatch])
  const userId = getUserIdLocal()

  const [balance, setBalance] = useState(10)
  const [isConfirm, setIsConfirm] = useState(false)
  const handleAddFund = () => {
    dispatch(addFundAction({ balance, userId }))
  }

  return (
    <div className="add-fund-wrapper">
      <Typography className="h1">Choose the fund you need to add</Typography>
      <Radio.Group
        className="radio"
        onChange={(e) => setBalance(e.target.value)}
        defaultValue={balance}
        buttonStyle="solid"
      >
        <Radio.Button value={10}>10$</Radio.Button>
        <Radio.Button value={20}>20$</Radio.Button>
        <Radio.Button value={50}>50$</Radio.Button>
        <Radio.Button value={100}>100$</Radio.Button>
        <Radio.Button value={200}>200$</Radio.Button>
        <Radio.Button value={500}>500$</Radio.Button>
        <Radio.Button value={1000}>1.000$</Radio.Button>
      </Radio.Group>

      <div className="confirm-box ">
        <Switch onChange={setIsConfirm} />
        <p>Confirm your choice</p>
      </div>
      <Button type="primary" onClick={handleAddFund} disabled={isConfirm === false}>
        Confirm
      </Button>
    </div>
  )
}

export default AddFund
