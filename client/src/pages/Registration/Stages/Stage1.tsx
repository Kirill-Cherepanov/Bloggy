import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  setStage: (stage: number) => void;
};

export default function Stage1({ setStage }: Props) {
  const [confirmationMessage, setConfirmationMessage] = useState<null | string>(
    null
  );
  const [incorrectElements, setIncorrectElements] = useState<{
    [field: string]: string;
  }>({});
  let navigate = useNavigate();

  return (
    <form
      className="mx-auto w-full mt-16"
      onSubmit={(e) => {
        e.preventDefault();

        const getFormElement = (id: string) => {
          return e.currentTarget.elements[
            id as keyof HTMLFormControlsCollection
          ] as HTMLInputElement;
        };

        if (confirmationMessage === null) {
          setConfirmationMessage('You are cool!');
        } else if (
          confirmationMessage !== getFormElement('confirm-email').value
        ) {
          setIncorrectElements((elements) => ({
            ...elements,
            ...{ 'confirm-email': 'This message is incorrect' }
          }));
        } else {
          setIncorrectElements({});
          if (getFormElement('start-blog').checked) setStage(2);
          else navigate('/', { replace: true });
        }
      }}
    >
      <h2 className="text-3xl text-center font-bold font-display uppercase mb-2">
        Sign up
      </h2>
      <label htmlFor="email" className="block font-light ml-2 text-sm mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        required={true}
        className="styled-input w-full mb-2"
      />

      <label htmlFor="username" className="block font-light ml-2 text-sm mb-1">
        Username
      </label>
      <input
        type="text"
        id="username"
        placeholder="Username"
        minLength={5}
        maxLength={20}
        required={true}
        pattern={'^[a-z0-9A-Z_-]+$'}
        className="styled-input w-full mb-2"
      />

      <label htmlFor="password" className="block font-light ml-2 text-sm mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        minLength={5}
        maxLength={30}
        required={true}
        className="styled-input w-full mb-2"
      />

      {confirmationMessage && (
        <>
          <label
            htmlFor="confirm-email"
            className="block font-light ml-2 text-sm mb-1"
          >
            Confirmation email message
          </label>
          <input
            type="text"
            id="confirm-email"
            placeholder="Confirmation message"
            required={true}
            className="styled-input w-full mb-1"
            style={{
              borderColor: incorrectElements['confirm-email'] && '#f00'
            }}
          />
          <button className="ml-2 block text-secondary-600 mb-4 text-sm hover:underline">
            Send again
          </button>
        </>
      )}

      <label htmlFor="start-blog" className="flex gap-2 mt-4 mb-4">
        <input
          type="checkbox"
          id="start-blog"
          onChange={(e) => setStage(Number(e.target.checked))}
          className="cool-checkbox"
        />
        <span className="relative bottom-[1px]">
          Do you want to start a blog? (it's free)
        </span>
      </label>

      <p className="text-sm text-secondary-600 mb-4">
        You will be able to change anything, or start a blog, later in the
        settings
      </p>

      <button
        type="submit"
        className="w-full py-2 bg-accent-800 text-main font-bold rounded-3xl transition-color hover:bg-accent-900"
      >
        Sign up
      </button>
    </form>
  );
}
