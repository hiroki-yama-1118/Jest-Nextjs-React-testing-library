/**
 * @jest-environment jsdom
 */
//document is not definedのエラー回避のため上記記載
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'
import 'setimmediate'

it('Should render hello text', () => {
  render(<Home />)
  // screen.debug()
  expect(screen.getByText('Welcome to Nextjs')).toBeInTheDocument()
})
