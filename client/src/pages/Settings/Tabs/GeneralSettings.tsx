type Props = User;

export default function General({ email, username, profilePic }: Props) {
  return (
    <div className="pl-2">
      <h3 className="text-3xl font-medium font-display mb-5">General</h3>

      <label htmlFor="email" className="block ml-2">
        Email
      </label>
      <input
        type="text"
        id="email"
        placeholder={email}
        className="styled-input mb-4 w-80 rounded-r-none border-r-0"
      />
      <button className="border-2 border-secondary-300 rounded-r-2xl px-3 py-2.5 focus:outline-accent-400 hover:border-accent-300 hover:bg-accent-300">
        Change
      </button>

      <label htmlFor="username" className="block ml-2">
        Username
      </label>
      <input
        type="text"
        id="username"
        placeholder={username}
        className="styled-input mb-4 w-80 rounded-r-none border-r-0"
      />
      <button className="border-2 border-secondary-300 rounded-r-2xl px-3 py-2.5 focus:outline-accent-400 hover:border-accent-300 hover:bg-accent-300">
        Change
      </button>

      <label htmlFor="password" className="block ml-2">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="styled-input mb-1 w-80 rounded-r-none border-r-0"
      />
      <button className="border-2 border-secondary-300 rounded-r-2xl px-3 py-2.5 focus:outline-accent-400 hover:border-accent-300 hover:bg-accent-300">
        Change
      </button>
      <button className="block text-sm text-secodary-600 hover:underline mb-8">
        Forgot your password?
      </button>

      <label htmlFor="profile-pic" className="block mb-2 ml-2">
        Profile picture
      </label>
      <div className="flex gap-5 mb-10">
        <img
          src={profilePic}
          alt="profile"
          className="aspect-square rounded-full object-cover w-36"
        />
        <div className="flex flex-col justify-evenly">
          <button className="border-2 border-accent-300 bg-accent-200 px-3 py-1 hover:bg-accent-300 rounded-sm">
            Upload
          </button>
          <button className="border-2 border-accent-300 bg-accent-200 px-3 py-1 hover:bg-accent-300 rounded-sm">
            Change
          </button>
        </div>
      </div>

      <div>
        <button className="py-1 px-3 rounded-md border-2 bg-accent-50 font-semibold text-accent-700 border-accent-300 hover:bg-accent-300 hover:text-accent-900 mr-6">
          Create blog
        </button>
        <button className="py-1 px-3 rounded-md border-2 bg-red-50 font-semibold text-red-600 border-red-300 hover:bg-red-300 hover:text-red-900">
          Delete account
        </button>
      </div>
    </div>
  );
}
