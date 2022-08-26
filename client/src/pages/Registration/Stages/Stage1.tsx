import React from 'react';

type Props = {
  isConfirmationSent: boolean;
  changeStage: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
};

export default function Stage1({ isConfirmationSent, changeStage }: Props) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mx-auto w-full">
      <label
        htmlFor="registration__email"
        className="block font-light ml-2 text-sm mb-1"
      >
        Email
      </label>
      <input
        type="text"
        id="registration__email"
        placeholder="Email"
        className="w-full border-2 border-secondary-300 rounded-2xl px-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light mb-2"
      />

      <label
        htmlFor="registration__username"
        className="block font-light ml-2 text-sm mb-1"
      >
        Username
      </label>
      <input
        type="text"
        id="registration__username"
        placeholder="Username"
        className="w-full border-2 border-secondary-300 rounded-2xl px-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light mb-2"
      />

      <label
        htmlFor="registration__password"
        className="block font-light ml-2 text-sm mb-1"
      >
        Password
      </label>
      <input
        type="text"
        id="registration__password"
        placeholder="Password"
        className="w-full border-2 border-secondary-300 rounded-2xl px-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light mb-2"
      />

      <label
        htmlFor="registration__confirm-password"
        className="block font-light ml-2 text-sm mb-1"
      >
        Confirm password
      </label>
      <input
        type="text"
        id="registration__confirm-password"
        placeholder="Confirm password"
        className="w-full border-2 border-secondary-300 rounded-2xl px-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light mb-2"
      />

      <label htmlFor="registration__start-blog" className="flex gap-2 my-2">
        <input
          type="checkbox"
          id="registration__start-blog"
          onChange={changeStage}
          className="cool-checkbox"
        />
        Do you want to start a blog? (it's free)
      </label>

      <p className="text-sm text-secondary-600 mb-4">
        You will be able to change anything, or start a blog, later in the
        settings
      </p>

      {!isConfirmationSent ? null : (
        <>
          <label
            htmlFor="registration__confirm-email"
            className="block font-light ml-2 text-sm mb-1"
          >
            Confirmation email message
          </label>
          <input
            type="text"
            id="registration__confirm-email"
            placeholder="Confirmation message"
            className="w-full border-2 border-secondary-300 rounded-2xl px-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light mb-1"
          />
          <button className="ml-2 block text-secondary-600 mb-4 text-sm hover:underline">
            Send again
          </button>
        </>
      )}

      <button className="w-full py-2 bg-accent-800 text-main font-bold rounded-3xl transition-color hover:bg-accent-900">
        Sign up
      </button>
    </form>
  );
}
