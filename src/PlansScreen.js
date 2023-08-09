import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import { db } from './Configure';

function PlansScreen() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection("products")
        .where('active', '==', 'true')
        .get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.forEach(price => {
                  products[productDoc.id].prices = {
                    priceId: price.id,
                    priceData: price.data(),
                  };
                });
            });
            setProducts(products);
        })
    }, []);

    console.log(products);

  return (
    <div className='plansScreen'>
      {Object.entries(products).map(([productId, productData]) => {
        return(
          <div className="plansScreen-plan">
            <div className="planScreen-info">
              
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default PlansScreen;
