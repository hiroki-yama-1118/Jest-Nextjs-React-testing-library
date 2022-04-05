import React, { useContext, useState, createContext } from 'react'

const StateContext = createContext(
  {} as {
    //データ型の型を定義
    toggle: boolean
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
  }
)

export const StateProvider: React.FC = ({ children }) => {
  const [toggle, setToggle] = useState(false)

  return (
    //valueでラップしたコンポーネントの中でグローバル化したい値を示す
    <StateContext.Provider value={{ toggle, setToggle }}>
      {children}
    </StateContext.Provider>
  )
}
//毎回行うのは大変だからプロバイダーの中で行う
export const useStateContext = () => useContext(StateContext)
