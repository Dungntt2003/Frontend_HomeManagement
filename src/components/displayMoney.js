const formatMoney = (number) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return VND.format(number);
};

export default formatMoney;
