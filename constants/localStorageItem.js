const _ = require('lodash');


// let id_arr = [];
// let cart = [];
// export const localStorageItem = (id, quantity = 1) => {

//     id_arr.push(id)

//     if (cart[id]) {
//         cart[id].quantity += quantity;
//     } else {
//         cart[id] = {
//             product_instance_id: id,
//             quantity: quantity,
//         };
//     }

//     // if(localStorage.getItem("Cart_Details")){
//     //         cart[id] = {
//     //           product_instance_id: id,
//     //           quantity: quantity,
//     //         };
//     // }

//     const sendCart = { "mycart": Object.values(cart) }
//     return localStorage.setItem("Cart_Details", JSON.stringify(sendCart));
// }


// // import React from 'react';


// // let id_arr = [];
// // let cart = [];

// // export const localStorageItem = (id, quantity = 1) => {

// //   id_arr.push(id)

// //   console.log(id_arr);

// //   if (cart[id]) {
// //     cart[id].quantity += quantity;
// //   } else {
// //     cart[id] = {
// //       product_instance_id: id,
// //       quantity: quantity,
// //     };
// //   }


// //   const sendCart = { "mycart": Object.values(cart) };

// //   return (
// //     <>
// //     {console.log(sendCart)}
// //       {localStorage.setItem("Cart_Details", JSON.stringify(sendCart))}
// //     </>
// //   )
// // // }


let cart = [];

export const localStorageItem = (id, quantity = 1) => {

    // console.log(localStorage.getItem("Cart_Details"));


    if (localStorage.getItem("Cart_Details")) {
        let storageData = JSON.parse(localStorage.getItem('Cart_Details')).mycart;

        if (storageData.length > 0) {
            let cartDetail=  _.find(storageData, function (o) { return o.product_instance_id === id; });
            if(typeof cartDetail!=="undefined"){
                cartDetail.quantity += quantity
            }else{
                storageData.push({
                    product_instance_id: id,
                    quantity: quantity,
                });

            }
        }
          





            //     console.log(cartProduct.product_instance_id);
            //     console.log(id)
            //     if (cartProduct.product_instance_id == id) {
            //         console.log("Existing stage")

            //         cartProduct.quantity += quantity
            //     }
            //     else {
            //         console.log("Adding new stage")

            //         a[cartProduct.product_instance_id] = {
            //             product_instance_id: id,
            //             quantity: quantity,
            //         };
            //     }




            const sendCart = { "mycart": Object.values(storageData) };
            return localStorage.setItem("Cart_Details", JSON.stringify(sendCart));


    } else {
        const productToPush = {
            product_instance_id: id,
            quantity: quantity,
        };
        cart.push(productToPush);
        const sendCart = { "mycart": cart };
        return localStorage.setItem("Cart_Details", JSON.stringify(sendCart));
    }
}
