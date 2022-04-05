import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import { getAllTasksData } from '../lib/fetch'
import useSWR from 'swr'
import axios from 'axios'
import type { TASK } from '../types/Types'

interface STATICPROPS {
  staticTasks: TASK[]
}
const axiosFetcher = async () => {
  const result = await axios.get<TASK[]>(
    `https://jsonplaceholder.typicode.com/todos/?_limit=10`
  )
  return result.data
}

const TaskPage: React.FC<STATICPROPS> = ({ staticTasks }) => {
  const { data: tasks, error } = useSWR('todosFetch', axiosFetcher, {
    fallbackData: staticTasks, //初期値
    revalidateOnMount: true, //初期値を設定した時はtureにする必要がある
  })
  if (error) return <span>Error!</span>
  return (
    <Layout title="Todos">
      <p className="text-4xl mb-10">todos page</p>
      <ul>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>
              {task.id}
              {': '}
              <span>{task.title}</span>
            </li>
          ))}
      </ul>
    </Layout>
  )
}
export default TaskPage


//useSWRとgetStaticPropsを併用した際の挙動はビルド時にgetStaticPropsが実行されてAPIからデータを取得（サーバー側で行われる）
//取得したデータがpropsの形でtaskpageにわたりuseSWRの初期値になる
//このデータを使って事前に静的なHTMLファイルが生成される
//このコンポーネントがマウントされた際はクライアントサイドでuseSWRが実行されて、最新のデータをサーバーから読んで、初期値に上書きされる
export const getStaticProps: GetStaticProps = async () => {
  const staticTasks = await getAllTasksData()
  return {
    props: { staticTasks },
  }
}
