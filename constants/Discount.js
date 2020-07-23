export const  Discount = (mrpPrice, selllingPrice) => {
    let discount = mrpPrice - selllingPrice;
    return (discount).toFixed(1);
}