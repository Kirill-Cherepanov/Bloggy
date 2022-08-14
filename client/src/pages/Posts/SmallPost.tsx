import React from 'react';

type Props = { mockImage: string };

export default function SmallPost({ mockImage }: Props) {
  return (
    <li className="flex transition-transform bg-orange-50 shadow-lg hover:scale-105">
      <img
        src={mockImage}
        alt="Post"
        className="w-40 h-40 object-cover cursor-pointer"
      />
      <div className="px-5 py-2 flex flex-col">
        <h4 className="font-bold text-xl cursor-pointer mb-1 hover:underline">
          A mildly long title for the post
        </h4>
        <p className="text-light-dark">
          A somewhat long description of the post, or rather the main content of
          the post that I will need to somehow edit based on the amount of free
          space I have...
        </p>
        <div className="mt-auto text-light-dark">
          {'By '}
          <span className="cursor-pointer text-orange-600 font-bold hover:underline">
            KissMyUSSR
          </span>
          {' | '}
          <span className="">{new Date(0).toDateString()}</span>
        </div>
      </div>
    </li>
  );
}
