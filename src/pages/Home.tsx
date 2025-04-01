import Layout from 'components/ui/Layout'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <Layout>
      <div
        className="p-2 mb-4"
      >
        <div className="container-fluid py-4">
          <p className="col-md-8 fs-3"></p>
          <span className="center">
            <img
              src="/images/fight.jpg"
              alt="Ufc fighter"
              width={1235}
              height={620}
            />
          </span>
        </div>
      </div>
    </Layout>
  )
}

export default Home
