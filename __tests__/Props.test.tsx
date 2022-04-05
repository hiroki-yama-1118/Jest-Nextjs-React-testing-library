/**
 * @jest-environment jsdom
 */
//document is not definedのエラー回避のため上記記載
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Post from '../components/Post'
import type { POST } from '../types/Types'
import 'setimmediate'

describe('Post coponent with given props', () => {
  let dummyProps: POST
  beforeEach(() => {
    dummyProps = {
      userId: 1,
      id: 1,
      title: 'dummy title 1',
      body: 'dummy body 1',
    }
  })
  it('Should render correctly with given props value', () => {
    render(<Post {...dummyProps} />)
    expect(screen.getByText(dummyProps.id)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.title)).toBeInTheDocument()
    // screen.debug()
  })
})
