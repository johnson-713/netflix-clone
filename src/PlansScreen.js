import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import firebase from './Configure';
import { firebaseConfig } from './Configure';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import {loadStripe} from '@stripe/stripe-js';

function PlansScreen() {

    const [products, setProducts] = useState([]);

    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
      firebase.initializeApp(firebaseConfig).firestore().collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (subscription) => {
            setSubscription({
              role: subscription.data().role,
              current_period_end: subscription.data().current_period_end.seconds,
              current_period_start: subscription.data().current_period_start.seconds,
            });
          });
        });
    }, [user.uid]);

    useEffect(() => {
      firebase.initializeApp(firebaseConfig).firestore().collection("products")
        .where("active", "==", true)
        .get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.forEach((price) => {
                  products[productDoc.id].prices = {
                    priceId: price.id,
                    priceData: price.data(),
                  };
                });
            });
            setProducts(products);
        });
    }, []);

    console.log(products);
    console.log(subscription);

    const loadCheckout = async (priceId) => {
      const docRef = await firebase.initializeApp(firebaseConfig).firestore().collection("customers")
                            .doc(user.uid).collection("checkout_sessions").add({
                              price: priceId,
                              success_url: window.location.origin,
                              cancel_url: window.location.origin,
                            });
                            
      docRef.onSnapshot(async (snap) => {
        const { error, sessionId} = snap.data();

        if(error){
          alert(`An error occured: ${error.message}`);
        }

        if(sessionId){
          const stripe = await loadStripe("pk_test_51NckyeSIjbhqIChLA5g13r1qhpw17yEgVWPGM9Y8XDEJFqm1fRxOLBXRMvkTS6O8s6bKqigaDsulrZEo2F4OjTkL00SYLZKu9L");
          stripe.redirectToCheckout({ sessionId });
        }
      });
    };

  return (
    <div className='plansScreen'>
      {Object.entries(products).map(([productId, productData]) => {
        return(
          <div className="plansScreen-plan">
            <div className="planScreen-info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
          </div>
        );
      })}
    </div>
  )
}

export default PlansScreen;
