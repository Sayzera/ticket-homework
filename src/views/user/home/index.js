import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../hooks/auth';

export default function UserHome() {
  const { user } = useAuth();

  const [ticketName, setTicketName] = React.useState('');
  const [ticketType, setTicketType] = React.useState('');
  const [ticketDescription, setTicketDescription] = React.useState('');
  const [tickets, setTickets] = React.useState([]);

  const registerTicket = async (ticket) => {
    const docRef = await addDoc(collection(db, 'tickets'), {
      ticketName: ticket.ticketName,
      ticketType: ticket.ticketType,
      ticketDescription: ticket.ticketDescription,
      userId: ticket.uid,
      case: 'open',
    });
    return docRef;
  };

  const deleteTicket = async (ticketId) => {
    await deleteDoc(doc(db, 'tickets', ticketId));
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'tickets'),
        where('userId', '==', user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tickets = [];
        querySnapshot.forEach((doc) => {
          tickets.push({ ...doc.data(), id: doc.id });
        });
        setTickets(tickets);
      });

      return unsubscribe;
    }

    console.log('wokr');
  }, [user]);

  const handleTicket = () => {
    // Ticketı kaydet
    registerTicket({
      ticketName,
      ticketType,
      ticketDescription,
      uid: user.uid,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <div className="border-r border-black p-3">
          <h1 className="text-xl mb-2">Open a ticket</h1>
          <div>
            <div className="mb-2">
              <input
                placeholder="Title"
                onChange={(e) => setTicketName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-2">
              <select
                onChange={(e) => setTicketType(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name=""
                id=""
              >
                <option value="">Choose something</option>
                <option value="Defected Product">Defected Product</option>
                <option value="Late Order">Late Order</option>
                <option value="Lost Product">Lost Product</option>
                <option value="Suggestion">Suggestion</option>
              </select>
            </div>

            <textarea
              onChange={(e) => setTicketDescription(e.target.value)}
              placeholder="Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>

            <div className="w-full mt-2">
              <button
                onClick={handleTicket}
                type="button"
                className="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="border-r border-black p-3 h-[97%] overflow-y-auto">
          <h1 className="text-xl mb-2">My tickets</h1>

          <div>
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex justify-between items-center border-b pb-2 border-black mb-2"
              >
                <div>
                  <div>{ticket.ticketName}</div>
                  <div className="text-xs">{ticket.ticketType}</div>
                </div>
                <div className="flex space-x-3 items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    {ticket.case.toUpperCase()}
                  </span>

                  <div
                    onClick={() => {
                      deleteTicket(ticket.id);
                    }}
                    className="text-xs underline cursor-pointer text-red-500"
                  >
                    Delete
                  </div>
                  <div className="text-sm underline cursor-pointer ">
                    Detail
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3">
          <h1 className="text-xl mb-2">Ticket detail</h1>
        </div>
      </div>
    </div>
  );
}
