import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer
      className="container-xxl d-flex justify-content-between align-items-center p-4"
      style={{
        backgroundColor: '#24242c',
      }}
    >
      <img
        src="/images/ufc-logo.png"
        alt="SkillUp Mentor"
        width={80}
        height={80}
      />
      <p className="mb-0">&copy; 2025</p>
    </footer>
  )
}

export default Footer
