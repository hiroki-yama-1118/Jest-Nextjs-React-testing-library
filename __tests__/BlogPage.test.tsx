/**
 * @jest-environment jsdom
 */
//document is not definedのエラー回避のため上記記載
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import 'setimmediate'

initTestHelpers()

const handlers = [
  rest.get(
    `https://jsonplaceholder.typicode.com/posts/?_limit=10`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'dummy title 1',
            body: 'dummy body 1',
          },
          {
            userId: 2,
            id: 2,
            title: 'dummy title 2',
            body: 'dummy body 2',
          },
        ])
      )
    }
  ),
]
//ダミーのサーバーを返す
const server = setupServer(...handlers)
//テストを始める前に
beforeAll(() => {
  //モックサーバーを起動
  server.listen()
})
//テスト毎に
afterEach(() => {
  //サーバーのリセット
  server.restoreHandlers()
  //テスト間の副作用をなくす
  cleanup()
})
//テストが終了したら
afterAll(() => {
  //サーバーを閉じる
  server.close()
})

describe('Blog page', () => {
  //テストケースを作成
  it('Should render the list of blogs pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/blog-page',
    })
    //pageのHTML構造を取得
    render(page)
    expect(await screen.findByText('blog page')).toBeInTheDocument()
    expect(screen.getByText('dummy title 1')).toBeInTheDocument()
    expect(screen.getByText('dummy title 2')).toBeInTheDocument()
  })
})
