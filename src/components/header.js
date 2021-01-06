import '../style.css';

import { Typography } from 'antd';
const { Title, Link } = Typography;

export default function Header() {
  return (
    <div className="header">
      <header>
        <Title>
          Todo-app
        </Title>
        <Link href="https://github.com/mkauha/todo-react" target="_blank">
          Source code
        </Link>
      </header>
    </div>
  );
}