"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };

  items: any[];

  total: number;

  status: string;

  paymentStatus: string;

  paymentMethod: string;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const user = auth.currentUser;

        if (!user) {
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "orders"),
          where("customer.email", "==", user.email)
        );

        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Order, "id">),
        }));

        setOrders(list);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white py-16">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 mb-10">
            📦 My Orders
          </h1>

          {loading ? (

            <div className="text-center text-2xl">
              Loading...
            </div>

          ) : orders.length === 0 ? (

            <div className="bg-gray-900 rounded-2xl p-10 text-center">

              <h2 className="text-3xl font-bold text-yellow-400">
                No Orders Yet
              </h2>

              <p className="text-gray-400 mt-4">
                Start shopping to see your orders here.
              </p>

            </div>

          ) : (

            <div className="space-y-8">

              {orders.map((order) => (

                <div
                  key={order.id}
                  className="bg-gray-900 rounded-2xl p-8 border border-yellow-500/20"
                >

                  <div className="flex justify-between flex-wrap gap-6">

                    <div>

                      <h2 className="text-2xl font-bold text-yellow-400">
                        Order #{order.id.slice(0,8)}
                      </h2>

                      <p className="text-gray-400 mt-2">
                        Payment: {order.paymentMethod}
                      </p>

                    </div>

                    <div className="text-right">

                      <p>
                        Status:
                        <span className="text-green-400 font-bold ml-2">
                          {order.status}
                        </span>
                      </p>

                      <p className="mt-2">
                        Payment:
                        <span className="text-yellow-400 font-bold ml-2">
                          {order.paymentStatus}
                        </span>
                      </p>

                      <p className="mt-4 text-3xl text-yellow-400 font-bold">
                        Rs. {order.total}
                      </p>

                    </div>

                  </div>

                  <hr className="my-6 border-gray-700"/>

                  <h3 className="text-xl font-bold mb-4">
                    Products
                  </h3>

                  <div className="space-y-3">

                    {order.items.map((item,index)=>(
                      <div
                        key={index}
                        className="flex justify-between border-b border-gray-800 pb-3"
                      >
                        <div>

                          {item.product.name}

                          <br/>

                          Qty: {item.quantity}

                        </div>

                        <div>
                          Rs. {item.product.price * item.quantity}
                        </div>

                      </div>
                    ))}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>
    </>
  );
}