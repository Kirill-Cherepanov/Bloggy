// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from '../../components/Icon/Icon';
import Stage1 from './Stages/Stage1';
import Stage2 from './Stages/Stage2';

export default function Register() {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState(false);

  // const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError(false);
  //   try {
  //     const res = await axios.post('/auth/register', {
  //       username,
  //       email,
  //       password
  //     });
  //     res.data && window.location.replace('/login');
  //   } catch (err) {
  //     setError(true);
  //   }
  // };
  const [stage, setStage] = useState(2);
  const [isConfirmationSent, setIsConfirmationSent] = useState(true);

  return (
    <main className="px-page max-w-2xl py-8 relative">
      <div className="w-full px-page absolute left-0 top-8 flex items-center h-2">
        <button className="absolute">
          <Icon
            type="long-arrow"
            className="h-4 text-secondary-600 pointer-events-none"
          />
        </button>
        <div className="mx-auto flex">
          {!stage
            ? null
            : [0, 0].map((v, i) => (
                <span
                  key={i}
                  className={
                    'first:mr-2 inline-block w-2 h-2 rounded-full ' +
                    (stage === i + 1 ? 'bg-secondary-600' : 'bg-secondary-400')
                  }
                />
              ))}
        </div>
      </div>
      {stage === 2 ? (
        <Stage2 />
      ) : (
        <Stage1
          isConfirmationSent={isConfirmationSent}
          changeStage={(e) => setStage(Number(e.target.checked))}
        />
      )}
    </main>
  );
}