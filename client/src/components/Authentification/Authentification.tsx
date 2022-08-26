import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import Icon from '../Icon/Icon';

type Props = {
  closeMenu: () => unknown;
  authType: 'login' | 'signup';
  toggleType: () => unknown;
};

export default function Authentification({
  closeMenu,
  authType,
  toggleType
}: Props) {
  // const userRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);
  // const { dispatch, isFetching } = useContext(Context);

  // const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch({ type: 'LOGIN_START' });
  //   try {
  //     const res = await axios.post('/auth/login', {
  //       username: userRef.current!.value,
  //       password: passwordRef.current!.value
  //     });
  //     dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  //   } catch (err) {
  //     console.error(err);
  //     dispatch({ type: 'LOGIN_FAILURE' });
  //   }
  // };
  const navigate = useNavigate();

  return createPortal(
    <div
      onMouseDown={(e) => {
        if (e.currentTarget !== e.target) return true;
        closeMenu();
      }}
      className="flex bg-opacity-60 bg-secondary-900 justify-center items-center fixed top-0 w-full h-full z-20"
    >
      <div className="text-secondary-800 flex flex-col min-w-[20rem] w-[480px] max-w-xl pb-20 bg-main p-4 shadow-lg rounded-[32px] relative">
        <button
          onClick={closeMenu}
          className="absolute right-4 top-4 ml-auto mb-4 rounded-full hover:bg-secondary-200 p-1"
        >
          <Icon type="close" className="w-8 h-8 select-none" />
        </button>
        <div className="my-2 mb-4 text-3xl font-sansita select-none flex justify-center text-center">
          Bloggy
        </div>
        <h3 className="font-display font-bold text-center text-3xl mt-4 mb-6">
          Welcome to Bloggy
        </h3>
        <form className="w-72 mx-auto" onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="authentification__input-1"
            className="block font-light ml-2 text-sm mb-1"
          >
            Email
          </label>
          <input
            type="text"
            id="authentification__input-1"
            placeholder="Email"
            className="w-full border-2 border-secondary-300 rounded-2xl px-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light mb-2"
          />
          <label
            htmlFor="authentification__input-2"
            className="block font-light ml-2 text-sm mb-1"
          >
            {authType === 'login' ? 'Password' : 'Username'}
          </label>
          <input
            type="text"
            id="authentification__input-2"
            placeholder={authType === 'login' ? 'Password' : 'Username'}
            className="w-full border-2 border-secondary-300 rounded-2xl px-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light mb-2"
          />
          {authType === 'signup' ? null : (
            <button className="block text-sm text-secodary-600 hover:underline">
              Forgot your password?
            </button>
          )}
          <div className="flex flex-col mt-5">
            <button
              className="w-full py-2 bg-secondary-800 text-main font-bold rounded-3xl transition-color hover:bg-secondary-900"
              style={{ order: authType === 'login' ? 1 : 3 }}
              onClick={authType === 'signup' ? toggleType : () => {}}
            >
              Log in
            </button>
            <div className="text-center my-1.5 font-semibold text-sm order-2">
              OR
            </div>
            <button
              className="w-full py-2 bg-accent-800 text-main font-bold rounded-3xl transition-color hover:bg-accent-900"
              style={{ order: authType === 'signup' ? 1 : 3 }}
              onClick={
                authType === 'login'
                  ? toggleType
                  : () => navigate('/registration')
              }
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('authentification')!
  );
}
