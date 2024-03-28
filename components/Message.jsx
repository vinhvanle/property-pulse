'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useGlobalContext } from '@/context/GlobalContext';

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read) {
          toast.success('Marked as Read');
        } else {
          toast.success('Marked as New');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success('Message deleted');
      }
    } catch (error) {
      console.log(error);
      toast.error('Message was not deleted');
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      <h2 className='text-xl mb-4'>
        {!isRead && (
          <div className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md'>
            New
          </div>
        )}
        <span className='font-bold'>Property Inquiry:</span>{' '}
        {message.property.name}
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <Link href={`mailto:${message.email}`} className='text-blue-500'>
            {' '}
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <Link href={`tel:${message.phone}`} className='text-blue-500'>
            {' '}
            {message.phone}
          </Link>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? 'bg-gray-300 text-white' : 'bg-blue-500'
        }  py-1 px-3 rounded-md`}
      >
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
      >
        Delete
      </button>
    </div>
  );
};
export default Message;
