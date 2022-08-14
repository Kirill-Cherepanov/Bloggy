import React from 'react';

type Props = { mockImage: string };

export default function LargePost({ mockImage }: Props) {
  return (
    <li className="row-start-1 row-end-4">
      <img src={mockImage} alt="Post" />
      <div>A mildly long title for the post</div>
      <div>
        <span>
          By <span>KissMyUSSR </span>
        </span>
        <span>{new Date(0).toDateString()}</span>
      </div>
    </li>
  );
}
