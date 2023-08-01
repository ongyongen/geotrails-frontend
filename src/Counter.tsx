import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount, saveCaches, updateAmount } from './counterSlice'
import { useEffect } from 'react'
import axios from 'axios'
import { GET_ALL_GEOCACHES_URL } from './routes'
import { AppDispatch } from './store/storeInterface'


export function Counter() {
  
  const count = useSelector((state: any) => state.counter.value)
  const geocaches = useSelector((state: any) => state.counter.geocaches)
  const dispatch = useDispatch<AppDispatch>();

  const fetchProducts = () => {
      axios
      .get(GET_ALL_GEOCACHES_URL)
      .then((res) => {
        dispatch(saveCaches(res.data));
    })
  }

  useEffect(() => {
    fetchProducts() 
  }, []);

  return (
    <div>
      <div>
        <button
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <input value={count} onChange={(e) => dispatch(updateAmount(e.target.value))}></input>
        <button
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Increment By Amount
        </button>
      </div>
    </div>
  )
}