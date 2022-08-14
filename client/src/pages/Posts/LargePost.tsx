import React from 'react';

type Props = { mockImage: string };

export default function LargePost({ mockImage }: Props) {
  return (
    <li className="row-start-1 row-end-4 relative">
      <img src={mockImage} alt="Post" className="w-full h-full object-cover" />
      <div className="absolute top-1/2 w-5/6 bg-opacity-40 bg-black text-white px-8 py-4">
        <h4 className="font-bold text-3xl cursor-pointer mb-2 hover:underline">
          A mildly long title for the post
        </h4>
        <p className="font-extralight mb-3">
          A somewhat long description of the post, or rather the main content of
          the post that I will need to somehow edit based on the amount of free
          space I have...
        </p>
        <div className="mt-auto">
          {'By '}
          <span className="cursor-pointer text-orange-600 font-bold hover:underline">
            KissMyUSSR
          </span>
          {' | '}
          <span className="font-extralight">{new Date(0).toDateString()}</span>
        </div>
      </div>
    </li>
  );
}
